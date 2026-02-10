import { NextRequest, NextResponse } from "next/server";
import { submitLead } from "@/lib/strapi";
import { validateB2C } from "@/lib/lead-validation";
import { checkRateLimit } from "@/lib/rate-limit";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60_000;

function getClientIp(request: NextRequest) {
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return "unknown";
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
    return NextResponse.json(
      { ok: false, message: "Validation echouee.", errors: validation.errors },
      { status: 400 }
    );
  }

  const data = validation.data;
  const ip = getClientIp(request);
  const rateKey = `b2c:${ip}`;
  const rate = checkRateLimit(rateKey, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);

  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, message: "Trop de requetes. Reessayez plus tard." },
      { status: 429 }
    );
  }

  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({
      ok: true,
      message: "Merci, on te recontacte rapidement.",
    });
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

    return NextResponse.json({
      ok: true,
      message: "Merci, on te recontacte rapidement.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Erreur serveur. Reessayez." },
      { status: 502 }
    );
  }
}
