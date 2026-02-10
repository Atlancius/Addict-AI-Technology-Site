import type { Location } from "./types";
import type { FaqItem } from "./content";

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
