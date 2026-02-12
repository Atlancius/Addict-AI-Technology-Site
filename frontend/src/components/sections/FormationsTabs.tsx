"use client";

import Tabs from "@/components/ui/Tabs";
import Button from "@/components/ui/Button";
import Card, { CardDescription, CardTitle } from "@/components/ui/Card";
import {
  FORMATIONS_PARTICULIERS,
  FORMATIONS_PRO,
} from "@/lib/hub-data";

function ProContent() {
  return (
    <Card variant="pricing" className="h-full">
      <p className="eyebrow mb-2">Bloc Pro</p>
      <CardTitle>{FORMATIONS_PRO.title}</CardTitle>
      <CardDescription className="mb-6">{FORMATIONS_PRO.summary}</CardDescription>
      <ul className="space-y-3 text-sm text-text-secondary mb-6">
        {FORMATIONS_PRO.packs.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="text-copper mt-0.5">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3">
        <Button variant="primary" href={FORMATIONS_PRO.ctaHref}>{FORMATIONS_PRO.ctaLabel}</Button>
        <Button variant="secondary" href="/services/transition-digitale">Voir transition digitale</Button>
      </div>
    </Card>
  );
}

function ParticuliersContent() {
  return (
    <Card variant="service" className="h-full">
      <p className="eyebrow mb-2">Bloc Particuliers</p>
      <CardTitle>{FORMATIONS_PARTICULIERS.title}</CardTitle>
      <CardDescription className="mb-6">{FORMATIONS_PARTICULIERS.summary}</CardDescription>
      <ul className="space-y-3 text-sm text-text-secondary mb-6">
        {FORMATIONS_PARTICULIERS.packs.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="text-copper mt-0.5">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" href="/boutique">Voir le pôle particuliers</Button>
        <Button variant="ghost" href={FORMATIONS_PARTICULIERS.ctaHref}>Parler de mon besoin</Button>
      </div>
    </Card>
  );
}

export default function FormationsTabs() {
  return (
    <Tabs
      items={[
        { id: "pro", label: "Pro", content: <ProContent /> },
        { id: "particulier", label: "Particulier", content: <ParticuliersContent /> },
      ]}
    />
  );
}
