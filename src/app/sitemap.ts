import type { MetadataRoute } from "next";
import { CASE_STUDIES, PRO_SERVICES } from "@/lib/hub-data";

function parseDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://addictai.tech";
  const staticLastModified = parseDate(process.env.SITE_BUILD_DATE) || new Date();

  const staticRoutes = [
    "",
    "/services",
    "/formations",
    "/realisations",
    "/boutique",
    "/a-propos",
    "/contact",
    "/mentions-legales",
    "/politique-confidentialite",
    "/pro",
    "/addict-2-0",
    "/reparations",
    "/evenements",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: staticLastModified,
  }));

  const serviceEntries = PRO_SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: staticLastModified,
  }));

  const caseEntries = CASE_STUDIES.map((item) => ({
    url: `${baseUrl}/realisations/${item.slug}`,
    lastModified: staticLastModified,
  }));

  return [...staticEntries, ...serviceEntries, ...caseEntries];
}
