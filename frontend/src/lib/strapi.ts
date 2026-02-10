/**
 * Strapi API client
 * Handles all communication with the Strapi headless CMS.
 */

import type { CaseStudy, Faq, Location, Repair, Service } from "./types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";
const DEFAULT_TIMEOUT_MS = 8000;
const STRAPI_TIMEOUT_MS = (() => {
  const raw = process.env.STRAPI_TIMEOUT_MS;
  const parsed = raw ? Number(raw) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_TIMEOUT_MS;
})();

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

export interface StrapiCollection<T> {
  data: StrapiEntity<T>[];
  meta: StrapiMeta;
}

export function unwrapCollection<T>(res: StrapiCollection<T>) {
  return res.data.map((item) => ({ id: item.id, ...item.attributes }));
}

interface FetchOptions {
  filters?: Record<string, unknown>;
  sort?: string | string[];
  populate?: string | string[] | Record<string, unknown>;
  pagination?: { page?: number; pageSize?: number };
  fields?: string[];
}

function buildQueryString(options: FetchOptions): string {
  const params = new URLSearchParams();

  if (options.filters) {
    flattenObject(options.filters, "filters", params);
  }

  if (options.sort) {
    const sorts = Array.isArray(options.sort) ? options.sort : [options.sort];
    sorts.forEach((s, i) => params.append(`sort[${i}]`, s));
  }

  if (options.populate) {
    if (typeof options.populate === "string") {
      params.append("populate", options.populate);
    } else if (Array.isArray(options.populate)) {
      options.populate.forEach((p, i) => params.append(`populate[${i}]`, p));
    } else {
      flattenObject(options.populate, "populate", params);
    }
  }

  if (options.pagination) {
    if (options.pagination.page)
      params.append("pagination[page]", String(options.pagination.page));
    if (options.pagination.pageSize)
      params.append(
        "pagination[pageSize]",
        String(options.pagination.pageSize)
      );
  }

  if (options.fields) {
    options.fields.forEach((f, i) => params.append(`fields[${i}]`, f));
  }

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

function flattenObject(
  obj: Record<string, unknown>,
  prefix: string,
  params: URLSearchParams
) {
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = `${prefix}[${key}]`;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      flattenObject(value as Record<string, unknown>, fullKey, params);
    } else {
      params.append(fullKey, String(value));
    }
  }
}

async function fetchStrapi<T>(
  endpoint: string,
  options: FetchOptions = {},
  revalidate: number = 60
): Promise<T> {
  const qs = buildQueryString(options);
  const url = `${STRAPI_URL}/api/${endpoint}${qs}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), STRAPI_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, {
      headers,
      next: { revalidate },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    throw new Error(`Strapi fetch error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

async function postStrapi<T>(
  endpoint: string,
  body: Record<string, unknown>
): Promise<T> {
  const url = `${STRAPI_URL}/api/${endpoint}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), STRAPI_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ data: body }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    throw new Error(`Strapi post error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// ─── Public API ───────────────────────────────────────

export async function getLocation(): Promise<StrapiCollection<Location>> {
  return fetchStrapi("locations", {
    pagination: { pageSize: 1 },
  });
}

export async function getRepairs(filters?: {
  brand?: string;
  model?: string;
  type?: string;
  featured?: boolean;
}): Promise<StrapiCollection<Repair>> {
  const strapiFilters: Record<string, unknown> = {};

  if (filters?.brand)
    strapiFilters["device_brand"] = { $eqi: filters.brand };
  if (filters?.model)
    strapiFilters["device_model"] = { $containsi: filters.model };
  if (filters?.type)
    strapiFilters["repair_type"] = { $eqi: filters.type };
  if (filters?.featured !== undefined)
    strapiFilters["is_featured"] = { $eq: filters.featured };

  return fetchStrapi("b2c-repairs", {
    filters: strapiFilters,
    sort: "sort_order:asc",
    pagination: { pageSize: 100 },
  });
}

export async function getServices(
  category?: string
): Promise<StrapiCollection<Service>> {
  const filters: Record<string, unknown> = {};
  if (category) filters["category"] = { $eqi: category };

  return fetchStrapi("b2b-services", {
    filters,
    sort: "sort_order:asc",
    pagination: { pageSize: 200 },
  });
}

export async function getServiceBySlug(
  slug: string
): Promise<StrapiCollection<Service>> {
  return fetchStrapi("b2b-services", {
    filters: { slug: { $eq: slug } },
    populate: ["faqs"],
  });
}

export async function getFaqs(
  scope?: "b2c" | "b2b" | "global"
): Promise<StrapiCollection<Faq>> {
  const filters: Record<string, unknown> = {};
  if (scope) filters["scope"] = { $eq: scope };

  return fetchStrapi("faqs", {
    filters,
    sort: "sort_order:asc",
    pagination: { pageSize: 200 },
  });
}

export async function getCaseStudies(): Promise<StrapiCollection<CaseStudy>> {
  return fetchStrapi("case-studies", {
    sort: "sort_order:asc",
    populate: ["cover_image"],
    pagination: { pageSize: 200 },
  });
}

export async function getCaseStudyBySlug(
  slug: string
): Promise<StrapiCollection<CaseStudy>> {
  return fetchStrapi("case-studies", {
    filters: { slug: { $eq: slug } },
    populate: ["cover_image"],
  });
}

export async function submitLead(
  type: "b2c" | "b2b",
  payload: Record<string, unknown>
) {
  return postStrapi("leads", {
    lead_type: type,
    ...payload,
  });
}
