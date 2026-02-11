"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { validateB2C } from "@/lib/lead-validation";
import { trackEvent } from "@/lib/analytics";

type FieldErrors = Partial<Record<string, string>>;

type UrgencyValue = "" | "today" | "this_week" | "no_rush";

const URGENCY_OPTIONS: Array<{ value: UrgencyValue; label: string }> = [
  { value: "", label: "Choisir" },
  { value: "today", label: "Aujourd'hui" },
  { value: "this_week", label: "Cette semaine" },
  { value: "no_rush", label: "Pas d'urgence" },
];

export default function LeadB2CForm() {
  const [form, setForm] = useState<{
    name: string;
    phone: string;
    email: string;
    device_brand: string;
    device_model: string;
    issue: string;
    urgency: UrgencyValue;
    consent: boolean;
    website: string;
  }>({
    name: "",
    phone: "",
    email: "",
    device_brand: "",
    device_model: "",
    issue: "",
    urgency: "",
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
      urgency: form.urgency || undefined,
      source_page: window.location.pathname,
    };

    const validation = validateB2C(payload);
    if (!validation.ok) {
      setErrors(validation.errors as FieldErrors);
      setStatus("idle");
      trackEvent("lead_validation_error", { lead_type: "b2c" });
      return;
    }

    try {
      const res = await fetch("/api/leads/b2c", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.message || "Une erreur est survenue.");
        trackEvent("lead_submit_failed", { lead_type: "b2c", status_code: res.status });
        return;
      }

      setStatus("success");
      setMessage(data?.message || "Merci, on revient vers vous rapidement.");
      trackEvent("lead_submit_success", {
        lead_type: "b2c",
        source_page: window.location.pathname,
      });
      setForm({
        name: "",
        phone: "",
        email: "",
        device_brand: "",
        device_model: "",
        issue: "",
        urgency: "",
        consent: false,
        website: "",
      });
    } catch {
      setStatus("error");
      setMessage("Impossible d'envoyer la demande. Réessayez.");
      trackEvent("lead_submit_failed", { lead_type: "b2c", status_code: 0 });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nom"
          id="b2c-name"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          error={errors.name}
          tone="flame"
          required
        />
        <Input
          label="Téléphone"
          id="b2c-phone"
          value={form.phone}
          onChange={(event) => update("phone", event.target.value)}
          error={errors.phone}
          tone="flame"
          required
        />
        <Input
          label="Email (optionnel)"
          id="b2c-email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          error={errors.email}
          type="email"
          tone="flame"
        />
        <Input
          label="Marque"
          id="b2c-brand"
          value={form.device_brand}
          onChange={(event) => update("device_brand", event.target.value)}
          error={errors.device_brand}
          tone="flame"
          required
        />
        <Input
          label="Modèle"
          id="b2c-model"
          value={form.device_model}
          onChange={(event) => update("device_model", event.target.value)}
          error={errors.device_model}
          tone="flame"
          required
        />
        <div>
          <label
            htmlFor="b2c-urgency"
            className="block text-xs font-heading font-medium uppercase tracking-wider text-text-secondary mb-1"
          >
            Urgence
          </label>
          <select
            id="b2c-urgency"
            value={form.urgency}
            onChange={(event) => update("urgency", event.target.value)}
            className="w-full bg-surface-2/80 border border-stroke-subtle text-text-primary rounded-sm px-4 py-3 text-sm font-body focus:border-flame focus:ring-1 focus:ring-flame/30 focus:outline-none"
          >
            {URGENCY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.urgency && (
            <p className="text-xs text-ember mt-1">{errors.urgency}</p>
          )}
        </div>
      </div>

      <Textarea
        label="Problème"
        id="b2c-issue"
        value={form.issue}
        onChange={(event) => update("issue", event.target.value)}
        error={errors.issue}
        tone="flame"
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

      <label htmlFor="b2c-consent" className="flex items-start gap-3 text-sm text-text-secondary">
        <input
          id="b2c-consent"
          type="checkbox"
          checked={form.consent}
          onChange={(event) => update("consent", event.target.checked)}
          className="mt-1 accent-flame"
        />
        <span>
          J&apos;accepte d&apos;être recontacté et que mes données soient traitées.
        </span>
      </label>
      {errors.consent && (
        <p className="text-xs text-ember">{errors.consent}</p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button variant="flame" size="md" type="submit" disabled={status === "loading"}>
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
