import type { MetadataRoute } from "next";
import {
  getCaseStudiesWithFallback,
  getServicesWithFallback,
  getTrainingsWithFallback,
} from "@/lib/content";

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
    "/addict-2-0",
    "/pro",
    "/contact",
    "/mentions-legales",
    "/confidentialite",
    "/reparations",
    "/services",
    "/realisations",
    "/formations",
    "/evenements",
  ];

  const services = await getServicesWithFallback();
  const caseStudies = await getCaseStudiesWithFallback();
  const trainings = await getTrainingsWithFallback();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: staticLastModified,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: parseDate(service.updatedAt) || staticLastModified,
  }));
  const caseRoutes = caseStudies.map((item) => ({
    url: `${baseUrl}/realisations/${item.slug}`,
    lastModified: parseDate(item.updatedAt) || staticLastModified,
  }));
  const trainingRoutes = trainings.map((training) => ({
    url: `${baseUrl}/formations/${training.slug}`,
    lastModified: parseDate(training.updatedAt) || staticLastModified,
  }));

  return [...staticEntries, ...serviceRoutes, ...caseRoutes, ...trainingRoutes];
}
