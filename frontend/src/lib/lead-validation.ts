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

  if (!data.name) errors.name = "Nom requis";
  if (!data.phone || data.phone.length < 6)
    errors.phone = "Numéro de téléphone requis";
  if (data.email && !isEmail(data.email)) errors.email = "Email invalide";
  if (!data.device_brand) errors.device_brand = "Marque requise";
  if (!data.device_model) errors.device_model = "Modèle requis";
  if (!data.issue) errors.issue = "Décrivez le problème";
  if (data.urgency && !["today", "this_week", "no_rush"].includes(data.urgency))
    errors.urgency = "Urgence invalide";
  if (!data.consent) errors.consent = "Consentement requis";

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

  if (!data.name) errors.name = "Nom requis";
  if (!data.company) errors.company = "Entreprise requise";
  if (!data.email) errors.email = "Email requis";
  if (data.email && !isEmail(data.email)) errors.email = "Email invalide";
  if (!data.problem) errors.problem = "Décrivez votre problème";
  if (data.company_size && !["1-10", "11-50", "51-200", "200+"].includes(data.company_size))
    errors.company_size = "Taille invalide";
  if (data.goal && !["automation", "web", "training", "audit", "other"].includes(data.goal))
    errors.goal = "Objectif invalide";
  if (data.budget && !["unknown", "<2k", "2k-5k", "5k-10k", "10k+"].includes(data.budget))
    errors.budget = "Budget invalide";
  if (!data.consent) errors.consent = "Consentement requis";

  if (Object.keys(errors).length > 0) {
    return { ok: false as const, errors };
  }

  return { ok: true as const, data };
}
