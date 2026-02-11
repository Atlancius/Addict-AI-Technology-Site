import { NextRequest, NextResponse } from "next/server";
import { submitLead } from "@/lib/strapi";
import { validateB2C } from "@/lib/lead-validation";
import { checkRateLimit } from "@/lib/rate-limit";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60_000;
const SPAM_LINK_REGEX = /(https?:\/\/|www\.)/i;

function getClientIp(request: NextRequest) {
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return "unknown";
}

function getClientFingerprint(request: NextRequest) {
  const ip = getClientIp(request);
  const ua = request.headers.get("user-agent") || "unknown";
  const stableId = ip !== "unknown" ? ip : ua.slice(0, 120);
  return { stableId, ua };
}

function withRateHeaders(
  response: NextResponse,
  rate: { remaining: number; resetAt: number }
) {
  response.headers.set("X-RateLimit-Limit", String(RATE_LIMIT_MAX));
  response.headers.set("X-RateLimit-Remaining", String(rate.remaining));
  response.headers.set("X-RateLimit-Reset", String(rate.resetAt));
  return response;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Payload invalide." },
      { status: 400 }
    );
  }

  const validation = validateB2C(body as Record<string, unknown>);
  if (!validation.ok || !validation.data) {
    return withRateHeaders(NextResponse.json(
      { ok: false, message: "Validation échouée.", errors: validation.errors },
      { status: 400 }
    ), { remaining: RATE_LIMIT_MAX, resetAt: Date.now() + RATE_LIMIT_WINDOW });
  }

  const data = validation.data;
  const fingerprint = getClientFingerprint(request);
  const rateKey = `b2c:${fingerprint.stableId}:${fingerprint.ua.slice(0, 40)}`;
  const rate = checkRateLimit(rateKey, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);

  if (!rate.allowed) {
    return withRateHeaders(NextResponse.json(
      { ok: false, message: "Trop de requêtes. Réessayez plus tard." },
      { status: 429 }
    ), rate);
  }

  const honeypotTriggered = data.website && data.website.trim().length > 0;
  const containsLink = SPAM_LINK_REGEX.test(data.issue || "");

  if (honeypotTriggered || containsLink) {
    return withRateHeaders(NextResponse.json({
      ok: true,
      message: "Merci, nous vous recontactons rapidement.",
    }), rate);
  }

  try {
    await submitLead("b2c", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      payload: {
        device_brand: data.device_brand,
        device_model: data.device_model,
        issue: data.issue,
        urgency: data.urgency,
        consent: data.consent,
      },
      source_page: data.source_page,
    });

    return withRateHeaders(NextResponse.json({
      ok: true,
      message: "Merci, nous vous recontactons rapidement.",
    }), rate);
  } catch {
    return withRateHeaders(NextResponse.json(
      { ok: false, message: "Erreur serveur. Réessayez." },
      { status: 502 }
    ), rate);
  }
}
