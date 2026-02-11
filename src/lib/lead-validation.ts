import type { LeadB2CPayload, LeadB2BPayload } from "./types";

export type LeadB2CInput = LeadB2CPayload & {
  email?: string;
  website?: string;
  source_page?: string;
};

export type LeadB2BInput = LeadB2BPayload & {
  website?: string;
  source_page?: string;
};

type FieldErrors<T> = Partial<Record<keyof T, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+0-9().\s-]{6,24}$/;
const SOURCE_PAGE_REGEX = /^\/[A-Za-z0-9\-/_#?=&]*$/;

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeOptionalString(value: unknown) {
  const str = normalizeString(value);
  return str.length > 0 ? str : undefined;
}

function normalizeBoolean(value: unknown) {
  if (value === true || value === "true" || value === 1 || value === "1") return true;
  if (value === false || value === "false" || value === 0 || value === "0") return false;
  return undefined;
}

function isEmail(value: string) {
  return EMAIL_REGEX.test(value);
}

function isPhone(value: string) {
  return PHONE_REGEX.test(value);
}

function isSourcePage(value: string) {
  return SOURCE_PAGE_REGEX.test(value) && value.length <= 200;
}

export function validateB2C(input: Partial<LeadB2CInput>) {
  const data: LeadB2CInput = {
    name: normalizeString(input.name),
    phone: normalizeString(input.phone),
    email: normalizeOptionalString(input.email),
    device_brand: normalizeString(input.device_brand),
    device_model: normalizeString(input.device_model),
    issue: normalizeString(input.issue),
    urgency: input.urgency,
    consent: Boolean(normalizeBoolean(input.consent)),
    website: normalizeOptionalString(input.website),
    source_page: normalizeOptionalString(input.source_page),
  };

  const errors: FieldErrors<LeadB2CInput> = {};

  if (!data.name || data.name.length < 2 || data.name.length > 80)
    errors.name = "Nom invalide";
  if (!data.phone || !isPhone(data.phone))
    errors.phone = "Numéro de téléphone invalide";
  if (data.email && !isEmail(data.email)) errors.email = "Email invalide";
  if (!data.device_brand || data.device_brand.length < 2 || data.device_brand.length > 80)
    errors.device_brand = "Marque requise";
  if (!data.device_model || data.device_model.length < 2 || data.device_model.length > 80)
    errors.device_model = "Modèle requis";
  if (!data.issue || data.issue.length < 10 || data.issue.length > 1200)
    errors.issue = "Décrivez le problème (10 caractères minimum)";
  if (data.urgency && !["today", "this_week", "no_rush"].includes(data.urgency))
    errors.urgency = "Urgence invalide";
  if (!data.consent) errors.consent = "Consentement requis";
  if (data.source_page && !isSourcePage(data.source_page))
    errors.source_page = "Page source invalide";

  if (Object.keys(errors).length > 0) {
    return { ok: false as const, errors };
  }

  return { ok: true as const, data };
}

export function validateB2B(input: Partial<LeadB2BInput>) {
  const data: LeadB2BInput = {
    name: normalizeString(input.name),
    company: normalizeString(input.company),
    email: normalizeString(input.email),
    phone: normalizeOptionalString(input.phone),
    company_size: input.company_size,
    goal: input.goal,
    problem: normalizeString(input.problem),
    budget: input.budget,
    consent: Boolean(normalizeBoolean(input.consent)),
    website: normalizeOptionalString(input.website),
    source_page: normalizeOptionalString(input.source_page),
  };

  const errors: FieldErrors<LeadB2BInput> = {};

  if (!data.name || data.name.length < 2 || data.name.length > 80)
    errors.name = "Nom invalide";
  if (!data.company || data.company.length < 2 || data.company.length > 120)
    errors.company = "Entreprise requise";
  if (!data.email) errors.email = "Email requis";
  if (data.email && !isEmail(data.email)) errors.email = "Email invalide";
  if (data.phone && !isPhone(data.phone)) errors.phone = "Téléphone invalide";
  if (!data.problem || data.problem.length < 20 || data.problem.length > 2000)
    errors.problem = "Décrivez votre problème (20 caractères minimum)";
  if (data.company_size && !["1-10", "11-50", "51-200", "200+"].includes(data.company_size))
    errors.company_size = "Taille invalide";
  if (
    data.goal &&
    ![
      "marketing",
      "ia",
      "crm",
      "transition",
      "formation-pro",
      "formation-particulier",
      "automation",
      "web",
      "training",
      "audit",
      "other",
    ].includes(data.goal)
  )
    errors.goal = "Objectif invalide";
  if (data.budget && !["unknown", "<2k", "2k-5k", "5k-10k", "10k+"].includes(data.budget))
    errors.budget = "Budget invalide";
  if (!data.consent) errors.consent = "Consentement requis";
  if (data.source_page && !isSourcePage(data.source_page))
    errors.source_page = "Page source invalide";

  if (Object.keys(errors).length > 0) {
    return { ok: false as const, errors };
  }

  return { ok: true as const, data };
}
