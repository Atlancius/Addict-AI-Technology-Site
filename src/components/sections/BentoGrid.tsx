import Card, { CardIcon, CardTitle, CardDescription } from "@/components/ui/Card";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";

const BENTO_ITEMS = [
  {
    accent: "flame",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M5 12h14M12 5v14" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
    title: "Réparation Express",
    description:
      "Écran, batterie, connecteur — diagnostic gratuit, réparation rapide avec pièces testées.",
    href: "/addict-2-0",
    span: "lg:col-span-2",
  },
  {
    accent: "flame",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M4 8h12a4 4 0 0 1 0 8H6a4 4 0 0 1-2-8Z" />
        <path d="M16 8h2a3 3 0 0 1 0 6h-2" />
      </svg>
    ),
    title: "Café Manga",
    description:
      "Espace détente avec boissons et mangas. Attendez sur place ou faites un stop plaisir.",
    href: "/addict-2-0",
    span: "",
  },
  {
    accent: "metal",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M7 7h10v10H7z" />
        <path d="M4 12h3M17 12h3M12 4v3M12 17v3" />
      </svg>
    ),
    title: "Automatisation IA",
    description:
      "Workflows connectés et agents IA pour réduire les tâches manuelles et accélérer l’exécution.",
    href: "/pro",
    span: "",
  },
  {
    accent: "metal",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M4 19h16" />
        <path d="M6 7h12l-6 8z" />
      </svg>
    ),
    title: "Formations",
    description:
      "Parcours no-code, IA et automatisation. Objectifs clairs, exercices pratiques, support.",
    href: "/formations",
    span: "lg:col-span-2",
  },
  {
    accent: "metal",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M6 6h12v12H6z" />
        <path d="M9 9h6v6H9z" />
      </svg>
    ),
    title: "Cas clients",
    description:
      "KPIs concrets, gains de temps mesurés, documentation claire et transfert de compétences.",
    href: "/realisations",
    span: "",
  },
  {
    accent: "flame",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M4 7h16" />
        <path d="M6 7v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
        <path d="M9 11h6" />
      </svg>
    ),
    title: "Tarifs transparents",
    description:
      "Grille claire “à partir de”, délais annoncés, garantie et conseil avant toute décision.",
    href: "/reparations",
    span: "",
  },
];

export default function BentoGrid() {
  return (
    <section className="py-24 bg-surface-1 section-shell surface-grid">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12">
            <p className="text-[0.65rem] font-heading uppercase tracking-[0.24em] text-text-muted mb-3">
              Deux univers
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-primary mb-2 leading-tight">
              Ce qu&apos;on fait, avec obsession du détail.
            </h2>
            <p className="text-text-muted">
              Un aperçu de nos services B2C et B2B.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {BENTO_ITEMS.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 80} className={item.span}>
              <Card variant="bento" className="h-full flex flex-col">
                <CardIcon>
                  <span className={`text-2xl ${item.accent === "metal" ? "text-metal" : "text-flame"}`}>
                    {item.icon}
                  </span>
                </CardIcon>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
                <div className="mt-6">
                  <Link
                    href={item.href}
                    className="text-[0.68rem] font-heading uppercase tracking-[0.16em] text-flame hover:text-ember transition-colors"
                  >
                    Découvrir →
                  </Link>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Diagnostic initial", value: "Offert en boutique" },
            { label: "Garantie atelier", value: "6 mois pièces & main d'œuvre" },
            { label: "Tarification", value: "Devis validé avant intervention" },
          ].map((item) => (
            <div
              key={item.label}
              className="panel-soft px-5 py-4 text-center"
            >
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-text-muted font-heading">
                {item.label}
              </p>
              <p className="text-sm md:text-base font-heading text-text-primary mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
