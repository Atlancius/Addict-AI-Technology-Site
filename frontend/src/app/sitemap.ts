import type { MetadataRoute } from "next";
import {
  getCaseStudiesWithFallback,
  getServicesWithFallback,
  getTrainingsWithFallback,
} from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://addictai.tech";

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

  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const caseRoutes = caseStudies.map((item) => `/realisations/${item.slug}`);
  const trainingRoutes = trainings.map((training) => `/formations/${training.slug}`);

  const routes = [...staticRoutes, ...serviceRoutes, ...caseRoutes, ...trainingRoutes];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
