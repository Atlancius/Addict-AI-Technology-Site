"use client";

import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import type { Location } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";

const defaultLocation: Location = {
  id: 0,
  name: "Addict AI Technology",
  address_line1: "Immeuble les Mimosas",
  postal_code: "20213",
  city: "Folelli",
  region: "Corse",
  country: "FR",
  phone: "+33 4 95 31 12 90",
  email: "contact@addictai.tech",
  geo_lat: 42.4474697,
  geo_lng: 9.5067658,
  google_maps_url: "https://www.google.com/maps?q=42.4474697,9.5067658",
  opening_hours: {
    mon: [{ open: "09:00", close: "18:00" }],
    tue: [{ open: "09:00", close: "18:00" }],
    wed: [{ open: "09:00", close: "18:00" }],
    thu: [{ open: "09:00", close: "18:00" }],
    fri: [{ open: "09:00", close: "18:00" }],
    sat: [{ open: "10:00", close: "16:00" }],
    sun: [],
  },
  createdAt: "",
  updatedAt: "",
};

const DAY_LABELS: Record<string, string> = {
  mon: "Lun",
  tue: "Mar",
  wed: "Mer",
  thu: "Jeu",
  fri: "Ven",
  sat: "Sam",
  sun: "Dim",
};

const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function formatHours(location: Location) {
  const opening = location.opening_hours;
  if (!opening || Object.keys(opening).length === 0) {
    return ["Lun – Ven : 09h – 18h", "Sam : 10h – 16h", "Dim : Fermé"];
  }

  return DAY_ORDER.filter((day) => opening[day]).map((day) => {
    const slots = opening[day];
    const label = DAY_LABELS[day] || day;
    if (!slots || slots.length === 0) return `${label} : Fermé`;
    const ranges = slots.map((slot) => `${slot.open} – ${slot.close}`).join(", ");
    return `${label} : ${ranges}`;
  });
}

export default function LocationMap({ location }: { location?: Location }) {
  const data = location ?? defaultLocation;
  const mapQuery =
    data.geo_lat && data.geo_lng
      ? `${data.geo_lat},${data.geo_lng}`
      : "42.4474697,9.5067658";
  const mapHref =
    data.google_maps_url || `https://www.google.com/maps?q=${mapQuery}`;
  const mapEmbed = `https://www.google.com/maps?q=${mapQuery}&z=17&output=embed`;
  const hours = formatHours(data);

  return (
    <section className="py-24 bg-surface-0 section-shell surface-grid">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12 space-y-3">
            <p className="eyebrow">Visite & contact</p>
            <h2 className="section-title">
              Passez nous voir à
              <span className="block metal-text">Folelli, Corse.</span>
            </h2>
            <p className="section-lead">
              Atelier, boutique et accompagnement pro sur un seul site.
              Nous vous recevons sur rendez-vous ou en passage direct selon vos besoins.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10">
          <div className="space-y-6">
            <ScrollReveal>
              <div className="panel rounded-2xl p-7 space-y-5">
                <h3 className="font-heading font-semibold text-[0.7rem] text-text-primary uppercase tracking-[0.16em]">
                  Adresse
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {data.address_line1}
                  <br />
                  {data.postal_code} {data.city}
                  <br />
                  {data.region || "Corse"}
                </p>
                <div className="split-divider" />
                <div className="flex gap-4">
                  <Button
                    variant="flame"
                    size="sm"
                    href={mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("click_directions_location", { placement: "location_map" })}
                  >
                    Itinéraire
                  </Button>
                  {data.phone && (
                    <Button
                      variant="outline"
                      size="sm"
                      href={`tel:${data.phone.replace(/\s+/g, "")}`}
                      onClick={() => trackEvent("click_call_location", { placement: "location_map" })}
                    >
                      Appeler
                    </Button>
                  )}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <div className="panel-soft rounded-2xl p-6 space-y-4">
                <h3 className="font-heading font-semibold text-[0.7rem] text-text-primary uppercase tracking-[0.16em]">
                  Horaires
                </h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-text-muted">
                  {hours.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <div className="relative h-40 rounded-2xl overflow-hidden border border-stroke-subtle">
                <Image
                  src="/images/stock/repair-workbench.jpg"
                  alt="Atelier Addict à Folelli"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-0/75 via-surface-0/15 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-[0.64rem] uppercase tracking-[0.14em] text-white/85 font-heading">
                    Accueil atelier + conseil sur place
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-1">
            <ScrollReveal>
              <div className="w-full h-96 lg:h-full min-h-96 rounded-2xl border border-stroke-subtle overflow-hidden shadow-[0_1.25rem_3.75rem_rgba(0,0,0,0.35)]">
                <iframe
                  src={mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Addict AI Technology – Folelli"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
