import type { Location } from "./types";
import type { FaqItem } from "./content";
import type { CaseStudy, Service, Training } from "./types";
import { stripHtml } from "./text";
import { canonicalFor } from "./seo";

export function buildLocalBusinessJsonLd(location: Location) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://addictai.tech";
  const addressLines = [location.address_line1].filter(Boolean);
  const opening = location.opening_hours || {};
  const dayMap: Record<string, string> = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };
  const openingHoursSpecification = Object.entries(opening)
    .flatMap(([day, slots]) =>
      (slots || []).map((slot) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayMap[day] || day,
        opens: slot.open,
        closes: slot.close,
      }))
    )
    .filter((item) => item.opens && item.closes);
  const geo =
    location.geo_lat && location.geo_lng
      ? {
          "@type": "GeoCoordinates",
          latitude: location.geo_lat,
          longitude: location.geo_lng,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: location.name,
    url: siteUrl,
    telephone: location.phone,
    email: location.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: addressLines.join(", "),
      postalCode: location.postal_code,
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.country,
    },
    geo,
    openingHoursSpecification:
      openingHoursSpecification.length > 0 ? openingHoursSpecification : undefined,
  };
}

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalFor(item.path),
    })),
  };
}

export function buildServiceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: stripHtml(service.summary || service.description || ""),
    url: canonicalFor(`/services/${service.slug}`),
    areaServed: "FR",
    provider: {
      "@type": "LocalBusiness",
      name: "Addict AI Technology",
      url: canonicalFor("/"),
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        description: service.starting_price_text || "Sur devis",
      },
      availability: "https://schema.org/InStock",
      url: canonicalFor(`/services/${service.slug}`),
    },
  };
}

export function buildCourseJsonLd(training: Training) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: training.title,
    description: stripHtml(training.summary || training.description || ""),
    provider: {
      "@type": "Organization",
      name: "Addict AI Technology",
      sameAs: canonicalFor("/"),
    },
    url: canonicalFor(`/formations/${training.slug}`),
  };
}

export function buildCaseStudyJsonLd(caseStudy: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy.title,
    description: stripHtml(caseStudy.problem || caseStudy.solution || ""),
    abstract: stripHtml(caseStudy.results || ""),
    creator: {
      "@type": "Organization",
      name: "Addict AI Technology",
    },
    url: canonicalFor(`/realisations/${caseStudy.slug}`),
    keywords: (caseStudy.tools || []).join(", "),
  };
}
