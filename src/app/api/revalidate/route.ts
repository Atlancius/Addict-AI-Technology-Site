import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const provided =
    request.headers.get("x-revalidate-secret") ||
    new URL(request.url).searchParams.get("secret");

  if (secret && provided !== secret) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  let body: { paths?: string[] } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const paths = body.paths && body.paths.length > 0
    ? body.paths
    : [
        "/",
        "/addict-2-0",
        "/pro",
        "/contact",
        "/reparations",
        "/services",
        "/realisations",
      ];

  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({ ok: true, revalidated: paths });
}
