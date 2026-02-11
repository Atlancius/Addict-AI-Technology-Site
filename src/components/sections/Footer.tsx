import Link from "next/link";
import Button from "@/components/ui/Button";
import { getLocationWithFallback } from "@/lib/content";
import { SERVICE_MENU_ITEMS, buildAuditHref } from "@/lib/hub-data";

const HUB_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Services Pro", href: "/services" },
  { label: "Formations", href: "/formations" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Boutique / Particuliers", href: "/boutique" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
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
    <footer className="section-shell bg-bg-main/86 pt-14 pb-24 md:pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <section className="panel wow-glow rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="eyebrow">Dernière étape</p>
            <h2 className="font-heading text-3xl md:text-4xl text-text-primary leading-tight">
              Prêt à cadrer la prochaine
              <span className="block copper-text">décision digitale ?</span>
            </h2>
            <p className="text-text-secondary max-w-2xl text-sm md:text-base">
              Audit contextuel, plan d&apos;action concret, et un seul point d&apos;entrée pour le pôle pro comme particuliers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" href={buildAuditHref("general")}>Demander un audit</Button>
            <Button variant="secondary" href="/boutique">Parler boutique</Button>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="font-heading text-xl text-text-primary">Addict Hub</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Hub premium: services pro, formations, réalisations et boutique locale à Folelli.
            </p>
            <p className="text-sm text-text-muted leading-relaxed">
              {location.address_line1}
              <br />
              {location.postal_code} {location.city}, {location.region || "Corse"}
            </p>
            <a className="text-sm text-copper hover:text-copper-400" href={`tel:${phone.replace(/\s+/g, "")}`}>
              {phone}
            </a>
            <br />
            <a className="text-sm text-copper hover:text-copper-400" href={`mailto:${email}`}>
              {email}
            </a>
          </div>

          <div>
            <h4 className="font-accent text-[0.67rem] uppercase tracking-[0.17em] text-text-primary mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {HUB_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-copper transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-accent text-[0.67rem] uppercase tracking-[0.17em] text-text-primary mb-4">Services Pro</h4>
            <ul className="space-y-2.5">
              {SERVICE_MENU_ITEMS.map((item) => (
                <li key={item.slug}>
                  <Link href={`/services/${item.slug}`} className="text-sm text-text-secondary hover:text-copper transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-accent text-[0.67rem] uppercase tracking-[0.17em] text-text-primary mb-4">Infos pratiques</h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>Lun - Ven: 09h00 - 18h00</li>
              <li>Sam: 10h00 - 16h00</li>
              <li>Dim: Fermé</li>
              <li>
                <a href={mapHref} target="_blank" rel="noopener noreferrer" className="text-copper hover:text-copper-400">
                  Ouvrir l&apos;itinéraire
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-7 border-t border-border-soft flex flex-col md:flex-row gap-3 justify-between items-center">
          <p className="text-xs text-text-muted">© {new Date().getFullYear()} Addict Hub. Tous droits réservés.</p>
          <div className="flex gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-text-muted hover:text-copper transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
