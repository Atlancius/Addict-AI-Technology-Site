import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { getLocationWithFallback } from "@/lib/content";
import { SERVICE_MENU_ITEMS, buildAuditHref } from "@/lib/hub-data";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Services Pro", href: "/services" },
  { label: "Formations", href: "/formations" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Boutique", href: "/boutique" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/politique-confidentialite" },
];

export default async function Footer() {
  const location = await getLocationWithFallback();
  const phone = location.phone || "+33 4 95 31 12 90";
  const email = location.email || "contact@addictai.tech";
  const mapQuery =
    location.geo_lat && location.geo_lng
      ? `${location.geo_lat},${location.geo_lng}`
      : "42.4474697,9.5067658";
  const mapHref = location.google_maps_url || `https://www.google.com/maps?q=${mapQuery}`;

  return (
    <footer className="relative border-t border-border-default bg-bg-secondary/30 pt-16 pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto px-6 space-y-14">
        {/* CTA Banner */}
        <section className="relative rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/8 via-bg-secondary to-accent/5 p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between">
            <div className="space-y-3 max-w-2xl">
              <p className="eyebrow">Prochaine étape</p>
              <h2 className="font-heading text-3xl md:text-4xl text-text-primary leading-tight">
                Prêt à cadrer votre prochaine
                <span className="block gradient-text">décision digitale ?</span>
              </h2>
              <p className="text-text-secondary text-sm md:text-base">
                Audit contextuel, plan d&apos;action concret, et un seul point d&apos;entrée pour le pôle pro comme particuliers.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Button variant="primary" href={buildAuditHref("general")}>
                Demander un audit <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="secondary" href="/boutique">Pôle boutique</Button>
            </div>
          </div>
        </section>

        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="font-heading text-lg text-text-primary">Addict AI Technology</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Hub premium: services pro, formations, réalisations et boutique locale à Folelli.
            </p>
            <div className="text-sm text-text-muted leading-relaxed">
              <p>{location.address_line1}</p>
              <p>{location.postal_code} {location.city}, {location.region || "Corse"}</p>
            </div>
            <div className="space-y-1">
              <a className="block text-sm text-brand-light hover:text-brand transition-colors" href={`tel:${phone.replace(/\s+/g, "")}`}>
                {phone}
              </a>
              <a className="block text-sm text-brand-light hover:text-brand transition-colors" href={`mailto:${email}`}>
                {email}
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-text-primary mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-brand-light transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-text-primary mb-4">Services Pro</h4>
            <ul className="space-y-2.5">
              {SERVICE_MENU_ITEMS.map((item) => (
                <li key={item.slug}>
                  <Link href={`/services/${item.slug}`} className="text-sm text-text-secondary hover:text-brand-light transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-text-primary mb-4">Infos pratiques</h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>Lun - Ven: 09h00 - 18h00</li>
              <li>Sam: 10h00 - 16h00</li>
              <li>Dim: Fermé</li>
              <li>
                <a href={mapHref} target="_blank" rel="noopener noreferrer" className="text-brand-light hover:text-brand transition-colors">
                  Ouvrir l&apos;itinéraire
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border-default flex flex-col md:flex-row gap-3 justify-between items-center">
          <p className="text-xs text-text-muted">&copy; {new Date().getFullYear()} Addict AI Technology. Tous droits réservés.</p>
          <div className="flex gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-text-muted hover:text-brand-light transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
