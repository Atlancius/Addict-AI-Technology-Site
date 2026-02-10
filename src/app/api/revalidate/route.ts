import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const DEFAULT_PATHS = [
  "/",
  "/addict-2-0",
  "/pro",
  "/contact",
  "/reparations",
  "/services",
  "/realisations",
  "/formations",
];

const MAX_PATHS = 25;
const MAX_PATH_LENGTH = 200;

function isValidPath(path: string) {
  return (
    path.startsWith("/") &&
    path.length <= MAX_PATH_LENGTH &&
    !path.includes("..")
  );
}

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, message: "Server misconfigured" },
      { status: 500 }
    );
  }
  const provided =
    request.headers.get("x-revalidate-secret") ||
    new URL(request.url).searchParams.get("secret");

  if (provided !== secret) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  let body: { paths?: string[] } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  let paths = DEFAULT_PATHS;

  if (Array.isArray(body.paths) && body.paths.length > 0) {
    if (body.paths.length > MAX_PATHS) {
      return NextResponse.json(
        { ok: false, message: "Too many paths" },
        { status: 400 }
      );
    }

    const sanitized: string[] = [];
    for (const item of body.paths) {
      if (typeof item !== "string") {
        return NextResponse.json(
          { ok: false, message: "Invalid path type" },
          { status: 400 }
        );
      }

      const path = item.trim();
      if (!isValidPath(path)) {
        return NextResponse.json(
          { ok: false, message: "Invalid path" },
          { status: 400 }
        );
      }

      sanitized.push(path);
    }

    paths = Array.from(new Set(sanitized));
  }

  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({ ok: true, revalidated: paths });
}
