import Link from "next/link";

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

export default function Footer() {
  return (
    <footer className="bg-surface-1/80 border-t border-stroke-subtle pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-ember/20 blur-2xl opacity-70" />
                <div className="relative w-9 h-9 rounded-sm border border-ember/40 bg-surface-2/70 shadow-[0_0_18px_rgba(230,57,70,0.35)] flex items-center justify-center">
                  <span className="font-heading font-bold text-white text-lg leading-none">
                    A
                  </span>
                </div>
              </div>
              <div>
                <div className="font-heading font-bold text-sm uppercase tracking-tight metal-text">
                  ADDICT
                </div>
                <div className="font-heading text-[9px] tracking-[0.2em] text-text-muted uppercase">
                  AI TECHNOLOGY
                </div>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Réparation, boutique tech, café manga &amp; solutions digitales
              pour les pros. Folelli, Corse.
            </p>
            {/* NAP */}
            <div className="text-text-muted text-sm space-y-1">
              <p>Immeuble les Mimosas</p>
              <p>20213 Folelli, Corse</p>
              <p>
                <a
                  href="mailto:contact@addictai.tech"
                  className="hover:text-flame transition-colors"
                >
                  contact@addictai.tech
                </a>
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-text-primary mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-flame transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-text-primary mb-4">
              Pro
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.pro.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-flame transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-text-primary mb-4">
              Horaires
            </h4>
            <div className="text-sm text-text-muted space-y-1">
              <p>Lun – Ven : 09h – 18h</p>
              <p>Sam : 10h – 16h</p>
              <p>Dim : Fermé</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-stroke-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted/50">
            &copy; {new Date().getFullYear()} Addict AI Technology. Tous droits
            réservés.
          </p>
          <div className="flex gap-6">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-text-muted/50 hover:text-text-muted transition-colors"
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
