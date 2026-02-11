function toAbsoluteUrl(url: string) {
  if (/^https?:\/\//i.test(url)) return url;
  const base =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://addictai.tech";

  try {
    return new URL(url, base).toString();
  } catch {
    return url;
  }
}

export function extractMediaUrl(media: unknown) {
  if (!media || typeof media !== "object") return null;

  const asRecord = media as Record<string, unknown>;
  const direct = asRecord.url;
  if (typeof direct === "string" && direct.length > 0) {
    return toAbsoluteUrl(direct);
  }

  const attributes = asRecord.attributes as Record<string, unknown> | undefined;
  if (attributes && typeof attributes.url === "string" && attributes.url.length > 0) {
    return toAbsoluteUrl(attributes.url);
  }

  const data = asRecord.data as Record<string, unknown> | undefined;
  if (!data) return null;

  const dataUrl = data.url;
  if (typeof dataUrl === "string" && dataUrl.length > 0) {
    return toAbsoluteUrl(dataUrl);
  }

  const dataAttrs = data.attributes as Record<string, unknown> | undefined;
  if (dataAttrs && typeof dataAttrs.url === "string" && dataAttrs.url.length > 0) {
    return toAbsoluteUrl(dataAttrs.url);
  }

  return null;
}
