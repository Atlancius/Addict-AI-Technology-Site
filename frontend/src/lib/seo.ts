export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://addictai.tech";

export function canonicalFor(path: string) {
  return new URL(path, SITE_URL).toString();
}
