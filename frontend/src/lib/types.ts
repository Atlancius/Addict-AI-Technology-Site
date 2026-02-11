/**
 * TypeScript types matching the Strapi content-types / DB schema.
 */

// ─── Location ─────────────────────────────────────────

export interface OpeningHoursSlot {
  open: string;
  close: string;
}

export interface Location {
  id: number;
  name: string;
  address_line1: string;
  postal_code: string;
  city: string;
  region?: string;
  country: string;
  phone?: string;
  email?: string;
  geo_lat?: number;
  geo_lng?: number;
  google_maps_url?: string;
  opening_hours?: Record<string, OpeningHoursSlot[]>;
  createdAt: string;
  updatedAt: string;
}

// ─── B2C Repairs ──────────────────────────────────────

export interface Repair {
  id: number;
  device_brand: string;
  device_model: string;
  repair_type: string;
  price_from: number | string;
  duration_text?: string;
  warranty_text?: string;
  notes?: string;
  is_featured: boolean;
  sort_order: number;
  createdAt: string;
  updatedAt: string;
}

// ─── B2B Services ─────────────────────────────────────

export type ServiceCategory =
  | "Audit"
  | "Automation"
  | "Training"
  | "Support"
  | "Web"
  | "Branding";

export interface Service {
  id: number;
  title: string;
  slug: string;
  category: ServiceCategory;
  summary?: string;
  description?: string;
  deliverables?: string[];
  duration_estimate?: string;
  starting_price_text?: string;
  cta_label?: string;
  cta_link?: string;
  sort_order: number;
  seo_title?: string;
  seo_description?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Trainings ───────────────────────────────────────

export interface Training {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  description?: string;
  audience?: string;
  format?: string;
  duration?: string;
  objectives?: string[];
  prerequisites?: string[];
  program_outline?: string;
  cta_label?: string;
  cta_link?: string;
  sort_order: number;
  seo_title?: string;
  seo_description?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── FAQ ──────────────────────────────────────────────

export type FaqScope = "b2c" | "b2b" | "global";

export interface Faq {
  id: number;
  scope: FaqScope;
  question: string;
  answer: string;
  sort_order: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Case Studies ─────────────────────────────────────

export interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  client_type?: string;
  problem?: string;
  solution?: string;
  results?: string;
  tools?: string[];
  cover_image?: StrapiMedia;
  sort_order: number;
  seo_title?: string;
  seo_description?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Leads ────────────────────────────────────────────

export type LeadType = "b2c" | "b2b";
export type LeadStatus = "new" | "contacted" | "closed" | "spam";

export interface Lead {
  id: number;
  lead_type: LeadType;
  name: string;
  email?: string;
  phone?: string;
  payload: Record<string, unknown>;
  source_page?: string;
  status: LeadStatus;
  spam_score: number;
  createdAt: string;
}

// ─── Lead form payloads ───────────────────────────────

export interface LeadB2CPayload {
  name: string;
  phone: string;
  email?: string;
  device_brand: string;
  device_model: string;
  issue: string;
  urgency?: "today" | "this_week" | "no_rush";
  consent: boolean;
}

export interface LeadB2BPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  company_size?: "1-10" | "11-50" | "51-200" | "200+";
  goal?:
    | "marketing"
    | "ia"
    | "crm"
    | "transition"
    | "formation-pro"
    | "formation-particulier"
    | "automation"
    | "web"
    | "training"
    | "audit"
    | "other";
  problem: string;
  budget?: "unknown" | "<2k" | "2k-5k" | "5k-10k" | "10k+";
  consent: boolean;
}

// ─── Strapi media ─────────────────────────────────────

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}
