"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { validateB2B } from "@/lib/lead-validation";
import { trackEvent } from "@/lib/analytics";

type FieldErrors = Partial<Record<string, string>>;

type CompanySizeValue = "" | "1-10" | "11-50" | "51-200" | "200+";
type GoalValue = "" | "automation" | "web" | "training" | "audit" | "other";
type BudgetValue = "" | "unknown" | "<2k" | "2k-5k" | "5k-10k" | "10k+";

const COMPANY_SIZES: Array<{ value: CompanySizeValue; label: string }> = [
  { value: "", label: "Choisir" },
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "200+", label: "200+" },
];

const GOALS: Array<{ value: GoalValue; label: string }> = [
  { value: "", label: "Choisir" },
  { value: "automation", label: "Automatisation" },
  { value: "web", label: "Site web" },
  { value: "training", label: "Formation" },
  { value: "audit", label: "Audit" },
  { value: "other", label: "Autre" },
];

const BUDGETS: Array<{ value: BudgetValue; label: string }> = [
  { value: "", label: "Choisir" },
  { value: "unknown", label: "À définir" },
  { value: "<2k", label: "< 2k" },
  { value: "2k-5k", label: "2k - 5k" },
  { value: "5k-10k", label: "5k - 10k" },
  { value: "10k+", label: "10k+" },
];

export default function LeadB2BForm() {
  const [form, setForm] = useState<{
    name: string;
    company: string;
    email: string;
    phone: string;
    company_size: CompanySizeValue;
    goal: GoalValue;
    problem: string;
    budget: BudgetValue;
    consent: boolean;
    website: string;
  }>({
    name: "",
    company: "",
    email: "",
    phone: "",
    company_size: "",
    goal: "",
    problem: "",
    budget: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const payload = {
      ...form,
      company_size: form.company_size || undefined,
      goal: form.goal || undefined,
      budget: form.budget || undefined,
      source_page: window.location.pathname,
    };

    const validation = validateB2B(payload);
    if (!validation.ok) {
      setErrors(validation.errors as FieldErrors);
      setStatus("idle");
      trackEvent("lead_validation_error", { lead_type: "b2b" });
      return;
    }

    try {
      const res = await fetch("/api/leads/b2b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.message || "Une erreur est survenue.");
        trackEvent("lead_submit_failed", { lead_type: "b2b", status_code: res.status });
        return;
      }

      setStatus("success");
      setMessage(data?.message || "Merci, on revient vers vous rapidement.");
      trackEvent("lead_submit_success", {
        lead_type: "b2b",
        source_page: window.location.pathname,
      });
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        company_size: "",
        goal: "",
        problem: "",
        budget: "",
        consent: false,
        website: "",
      });
    } catch {
      setStatus("error");
      setMessage("Impossible d'envoyer la demande. Réessayez.");
      trackEvent("lead_submit_failed", { lead_type: "b2b", status_code: 0 });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nom"
          id="b2b-name"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          error={errors.name}
          tone="metal"
          required
        />
        <Input
          label="Entreprise"
          id="b2b-company"
          value={form.company}
          onChange={(event) => update("company", event.target.value)}
          error={errors.company}
          tone="metal"
          required
        />
        <Input
          label="Email"
          id="b2b-email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          error={errors.email}
          type="email"
          tone="metal"
          required
        />
        <Input
          label="Téléphone (optionnel)"
          id="b2b-phone"
          value={form.phone}
          onChange={(event) => update("phone", event.target.value)}
          error={errors.phone}
          tone="metal"
        />
        <div>
          <label
            htmlFor="b2b-company-size"
            className="block text-xs font-heading font-medium uppercase tracking-wider text-text-secondary mb-1"
          >
            Taille d&apos;entreprise
          </label>
          <select
            id="b2b-company-size"
            value={form.company_size}
            onChange={(event) => update("company_size", event.target.value)}
            className="w-full bg-surface-2/80 border border-stroke-subtle text-text-primary rounded-sm px-4 py-3 text-sm font-body focus:border-metal focus:ring-1 focus:ring-metal/30 focus:outline-none"
          >
            {COMPANY_SIZES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.company_size && (
            <p className="text-xs text-ember mt-1">{errors.company_size}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="b2b-goal"
            className="block text-xs font-heading font-medium uppercase tracking-wider text-text-secondary mb-1"
          >
            Objectif
          </label>
          <select
            id="b2b-goal"
            value={form.goal}
            onChange={(event) => update("goal", event.target.value)}
            className="w-full bg-surface-2/80 border border-stroke-subtle text-text-primary rounded-sm px-4 py-3 text-sm font-body focus:border-metal focus:ring-1 focus:ring-metal/30 focus:outline-none"
          >
            {GOALS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.goal && (
            <p className="text-xs text-ember mt-1">{errors.goal}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="b2b-budget"
            className="block text-xs font-heading font-medium uppercase tracking-wider text-text-secondary mb-1"
          >
            Budget
          </label>
          <select
            id="b2b-budget"
            value={form.budget}
            onChange={(event) => update("budget", event.target.value)}
            className="w-full bg-surface-2/80 border border-stroke-subtle text-text-primary rounded-sm px-4 py-3 text-sm font-body focus:border-metal focus:ring-1 focus:ring-metal/30 focus:outline-none"
          >
            {BUDGETS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.budget && (
            <p className="text-xs text-ember mt-1">{errors.budget}</p>
          )}
        </div>
      </div>

      <Textarea
        label="Problème à résoudre"
        id="b2b-problem"
        value={form.problem}
        onChange={(event) => update("problem", event.target.value)}
        error={errors.problem}
        tone="metal"
        required
      />

      {/* Honeypot */}
      <div className="hidden">
        <label>
          Website
          <input
            type="text"
            value={form.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </label>
      </div>

      <label htmlFor="b2b-consent" className="flex items-start gap-3 text-sm text-text-secondary">
        <input
          id="b2b-consent"
          type="checkbox"
          checked={form.consent}
          onChange={(event) => update("consent", event.target.checked)}
          className="mt-1 accent-metal"
        />
        <span>
          J&apos;accepte d&apos;être recontacté et que mes données soient traitées.
        </span>
      </label>
      {errors.consent && (
        <p className="text-xs text-ember">{errors.consent}</p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button variant="metal" size="md" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Envoi..." : "Envoyer la demande"}
        </Button>
        {message && (
          <p
            aria-live="polite"
            className={`text-sm ${
              status === "success" ? "text-emerald-300" : "text-ember"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
