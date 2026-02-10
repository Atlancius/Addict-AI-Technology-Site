import {
  getCaseStudies,
  getCaseStudyBySlug,
  getFaqs,
  getLocation,
  getRepairs,
  getServiceBySlug,
  getServices,
  getTrainingBySlug,
  getTrainings,
  unwrapCollection,
} from "./strapi";
import type { CaseStudy, Faq, Location, Repair, Service, Training } from "./types";
import {
  fallbackCaseStudies,
  fallbackFaqsB2B,
  fallbackFaqsB2C,
  fallbackLocation,
  fallbackRepairs,
  fallbackServices,
  fallbackTrainings,
} from "./fallback-data";

export type FaqItem = { question: string; answer: string };

export async function getLocationWithFallback(): Promise<Location> {
  try {
    const res = await getLocation();
    const locations = unwrapCollection<Location>(res);
    return locations[0] ?? fallbackLocation;
  } catch {
    return fallbackLocation;
  }
}

export async function getRepairsWithFallback(): Promise<Repair[]> {
  try {
    const res = await getRepairs();
    return unwrapCollection<Repair>(res);
  } catch {
    return fallbackRepairs;
  }
}

export async function getServicesWithFallback(): Promise<Service[]> {
  try {
    const res = await getServices();
    const services = unwrapCollection<Service>(res);
    return services.length > 0 ? services : fallbackServices;
  } catch {
    return fallbackServices;
  }
}

export async function getServiceBySlugWithFallback(
  slug: string,
  options?: { skipRemote?: boolean }
) {
  if (!options?.skipRemote) {
    try {
      const res = await getServiceBySlug(slug);
      const services = unwrapCollection<Service>(res);
      return services[0] ?? null;
    } catch {
      // fall through to fallback
    }
  }

  const fallback = fallbackServices.find((service) => service.slug === slug);
  return fallback ?? null;
}

export async function getCaseStudiesWithFallback(): Promise<CaseStudy[]> {
  try {
    const res = await getCaseStudies();
    const cases = unwrapCollection<CaseStudy>(res);
    return cases.length > 0 ? cases : fallbackCaseStudies;
  } catch {
    return fallbackCaseStudies;
  }
}

export async function getCaseStudyBySlugWithFallback(slug: string) {
  try {
    const res = await getCaseStudyBySlug(slug);
    const cases = unwrapCollection<CaseStudy>(res);
    return cases[0] ?? null;
  } catch {
    const fallback = fallbackCaseStudies.find((caseStudy) => caseStudy.slug === slug);
    return fallback ?? null;
  }
}

export async function getTrainingsWithFallback(): Promise<Training[]> {
  try {
    const res = await getTrainings();
    const trainings = unwrapCollection<Training>(res);
    return trainings.length > 0 ? trainings : fallbackTrainings;
  } catch {
    return fallbackTrainings;
  }
}

export async function getTrainingBySlugWithFallback(slug: string) {
  try {
    const res = await getTrainingBySlug(slug);
    const trainings = unwrapCollection<Training>(res);
    return trainings[0] ?? null;
  } catch {
    const fallback = fallbackTrainings.find((training) => training.slug === slug);
    return fallback ?? null;
  }
}

export async function getFaqsWithFallback(scope: "b2c" | "b2b" | "global") {
  try {
    const res = await getFaqs(scope);
    const faqs = unwrapCollection<Faq>(res);
    if (faqs.length > 0) return faqs;
  } catch {
    // ignore
  }

  if (scope === "b2b") return fallbackFaqsB2B;
  if (scope === "b2c") return fallbackFaqsB2C;
  return [...fallbackFaqsB2C, ...fallbackFaqsB2B];
}
