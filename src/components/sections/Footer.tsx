import Link from "next/link";
import Button from "@/components/ui/Button";
import MouseTilt from "@/components/animations/MouseTilt";
import { getLocationWithFallback } from "@/lib/content";
import type { Location } from "@/lib/types";

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

const FOOTER_LINKS = {
  services: [
    { label: "Réparation", href: "/addict-2-0" },
    { label: "Tarifs réparation", href: "/reparations" },
    { label: "Boutique Tech", href: "/addict-2-0" },
    { label: "Café Manga", href: "/addict-2-0" },
    { label: "Solutions Pro", href: "/pro" },
  ],
  pro: [
    { label: "Services Pro", href: "/services" },
    { label: "Automatisation", href: "/pro" },
    { label: "Formation", href: "/formations" },
    { label: "Audit Digital", href: "/pro" },
    { label: "Réalisations", href: "/realisations" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Confidentialité", href: "/confidentialite" },
  ],
};

function formatHours(location: Location) {
  const opening = location.opening_hours;
  if (!opening || Object.keys(opening).length === 0) {
    return ["Lun - Ven : 09h - 18h", "Sam : 10h - 16h", "Dim : Fermé"];
  }

  return DAY_ORDER.map((day) => {
    const slots = opening[day];
    const label = DAY_LABELS[day] || day;
    if (!slots || slots.length === 0) return `${label} : Fermé`;
    const ranges = slots.map((slot) => `${slot.open} - ${slot.close}`).join(", ");
    return `${label} : ${ranges}`;
  });
}

export default async function Footer() {
  const location = await getLocationWithFallback();
  const hours = formatHours(location);
  const email = location.email || "contact@addictai.tech";

  return (
    <footer className="bg-surface-1/85 section-shell pt-12 pb-8 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <MouseTilt
          className="panel rounded-2xl p-8 md:p-9 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
          maxTilt={4}
          scale={1.003}
        >
          <div className="space-y-3">
            <p className="eyebrow">Dernière étape</p>
            <h3 className="font-heading text-2xl md:text-3xl text-text-primary">
              Besoin d&apos;un diagnostic ou d&apos;un cadrage projet ?
            </h3>
            <p className="text-sm text-text-secondary max-w-2xl">
              On vous répond rapidement avec un plan d&apos;action concret, côté
              réparation ou transformation digitale.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="flame" href="/contact#contact-b2c">
              Réparation B2C
            </Button>
            <Button variant="metal" href="/contact#contact-b2b">
              Projet B2B
            </Button>
          </div>
        </MouseTilt>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-ember/20 blur-2xl opacity-70" />
                <div className="relative w-10 h-10 rounded-xl border border-ember/40 bg-surface-2/75 shadow-[0_0_1.125rem_rgba(230,57,70,0.35)] flex items-center justify-center">
                  <span className="font-heading font-bold text-white text-lg leading-none">
                    A
                  </span>
                </div>
              </div>
              <div>
                <div className="font-heading font-bold text-sm uppercase tracking-tight metal-text">
                  ADDICT
                </div>
                <div className="font-heading text-[0.5625rem] tracking-[0.2em] text-text-muted uppercase">
                  AI TECHNOLOGY
                </div>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Réparation, boutique tech, café manga et solutions digitales
              orientées résultats. Folelli, Corse.
            </p>
            <div className="text-text-muted text-sm space-y-1">
              <p>{location.address_line1}</p>
              <p>
                {location.postal_code} {location.city}, {location.region || "Corse"}
              </p>
              {location.phone && <p>{location.phone}</p>}
              <p>
                <a href={`mailto:${email}`} className="hover:text-flame transition-colors">
                  {email}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-[0.68rem] uppercase tracking-[0.16em] text-text-primary mb-4">
              Services B2C
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-text-muted hover:text-flame transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-[0.68rem] uppercase tracking-[0.16em] text-text-primary mb-4">
              Services B2B
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.pro.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-text-muted hover:text-flame transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-[0.68rem] uppercase tracking-[0.16em] text-text-primary mb-4">
              Horaires
            </h4>
            <div className="text-sm text-text-muted space-y-1">
              {hours.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stroke-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-3/80">
            &copy; {new Date().getFullYear()} Addict AI Technology. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-text-3/80 hover:text-text-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
