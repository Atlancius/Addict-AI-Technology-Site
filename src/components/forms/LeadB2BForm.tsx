"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { validateB2B } from "@/lib/lead-validation";
import { trackEvent } from "@/lib/analytics";

type FieldErrors = Partial<Record<string, string>>;

type CompanySizeValue = "" | "1-10" | "11-50" | "51-200" | "200+";
type GoalValue =
  | ""
  | "marketing"
  | "ia"
  | "crm"
  | "transition"
  | "formation"
  | "formation-pro"
  | "formation-particulier"
  | "audit"
  | "other";
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
  { value: "marketing", label: "Audit marketing" },
  { value: "ia", label: "Audit automatisation & IA" },
  { value: "crm", label: "Audit CRM / SaaS" },
  { value: "transition", label: "Audit transition digitale" },
  { value: "formation", label: "Audit formation" },
  { value: "formation-particulier", label: "Formation particulier" },
  { value: "audit", label: "Audit global" },
  { value: "other", label: "Autre besoin" },
];

const BUDGETS: Array<{ value: BudgetValue; label: string }> = [
  { value: "", label: "Choisir" },
  { value: "unknown", label: "A définir" },
  { value: "<2k", label: "< 2k" },
  { value: "2k-5k", label: "2k - 5k" },
  { value: "5k-10k", label: "5k - 10k" },
  { value: "10k+", label: "10k+" },
];

const selectStyles =
  "w-full min-h-[3rem] rounded-lg border border-border-default bg-bg-tertiary/60 text-text-primary px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/30 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat pr-10";

interface LeadB2BFormProps {
  defaultGoal?: GoalValue;
}

export default function LeadB2BForm({ defaultGoal = "" }: LeadB2BFormProps) {
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
    goal: defaultGoal,
    problem: "",
    budget: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const goalLabel = useMemo(
    () => GOALS.find((option) => option.value === form.goal)?.label,
    [form.goal]
  );

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const urlParams = new URLSearchParams(window.location.search);
    const payload = {
      ...form,
      company_size: form.company_size || undefined,
      goal: form.goal || undefined,
      budget: form.budget || undefined,
      source_page: `${window.location.pathname}${window.location.search}`,
      audit_type: urlParams.get("audit") || undefined,
      utm_source: urlParams.get("utm_source") || undefined,
      utm_medium: urlParams.get("utm_medium") || undefined,
      utm_campaign: urlParams.get("utm_campaign") || undefined,
      utm_term: urlParams.get("utm_term") || undefined,
      utm_content: urlParams.get("utm_content") || undefined,
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
        goal: validation.data.goal,
      });
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        company_size: "",
        goal: defaultGoal,
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
      <p className="text-xs text-text-muted">
        Décris ton contexte et tes objectifs: on revient avec un cadrage clair et une proposition adaptée.
      </p>
      {goalLabel && (
        <div className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1">
          <span className="text-xs font-medium text-brand-light">Contexte: {goalLabel}</span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nom"
          id="b2b-name"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          error={errors.name}
          autoComplete="name"
          required
        />
        <Input
          label="Entreprise"
          id="b2b-company"
          value={form.company}
          onChange={(event) => update("company", event.target.value)}
          error={errors.company}
          autoComplete="organization"
          required
        />
        <Input
          label="Email"
          id="b2b-email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          error={errors.email}
          type="email"
          autoComplete="email"
          required
        />
        <Input
          label="Téléphone (optionnel)"
          id="b2b-phone"
          value={form.phone}
          onChange={(event) => update("phone", event.target.value)}
          error={errors.phone}
          autoComplete="tel"
          inputMode="tel"
        />
        <div className="space-y-1.5">
          <label htmlFor="b2b-company-size" className="block text-sm text-text-secondary">
            Taille d&apos;entreprise
          </label>
          <select id="b2b-company-size" value={form.company_size} onChange={(event) => update("company_size", event.target.value)} className={selectStyles}>
            {COMPANY_SIZES.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.company_size && <p className="text-xs text-red-400">{errors.company_size}</p>}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="b2b-goal" className="block text-sm text-text-secondary">
            Type d&apos;audit
          </label>
          <select id="b2b-goal" value={form.goal} onChange={(event) => update("goal", event.target.value)} className={selectStyles}>
            {GOALS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.goal && <p className="text-xs text-red-400">{errors.goal}</p>}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="b2b-budget" className="block text-sm text-text-secondary">
            Budget indicatif
          </label>
          <select id="b2b-budget" value={form.budget} onChange={(event) => update("budget", event.target.value)} className={selectStyles}>
            {BUDGETS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.budget && <p className="text-xs text-red-400">{errors.budget}</p>}
        </div>
      </div>

      <Textarea
        label="Contexte, blocages et objectif"
        id="b2b-problem"
        value={form.problem}
        onChange={(event) => update("problem", event.target.value)}
        error={errors.problem}
        required
      />

      <div className="hidden">
        <label>
          Website
          <input type="text" value={form.website} onChange={(event) => update("website", event.target.value)} />
        </label>
      </div>

      <label htmlFor="b2b-consent" className="flex items-start gap-3 text-sm text-text-secondary">
        <input
          id="b2b-consent"
          type="checkbox"
          checked={form.consent}
          onChange={(event) => update("consent", event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-border-default accent-brand"
        />
        <span>J&apos;accepte d&apos;être recontacté et que mes données soient traitées.</span>
      </label>
      {errors.consent && <p className="text-xs text-red-400">{errors.consent}</p>}

      <div className="flex flex-wrap items-center gap-4">
        <Button variant="primary" size="md" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Envoi..." : "Envoyer la demande"}
        </Button>
        {message && (
          <p aria-live="polite" className={`text-sm ${status === "success" ? "text-emerald-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
