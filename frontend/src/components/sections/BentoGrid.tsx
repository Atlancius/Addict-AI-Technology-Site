import Image from "next/image";
import Link from "next/link";
import Card, { CardIcon, CardTitle, CardDescription } from "@/components/ui/Card";
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
    image: "/images/stock/repair-phone.jpg",
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
    image: "/images/stock/cafe-cozy.jpg",
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
    image: "/images/stock/data-center.jpg",
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
    image: "/images/stock/team-meeting.jpg",
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
    image: "/images/stock/pro-workspace.jpg",
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
    image: "/images/stock/repair-workbench.jpg",
  },
];

export default function BentoGrid() {
  return (
    <section className="py-24 bg-surface-1 section-shell surface-grid">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12 space-y-3">
            <p className="eyebrow">Expertises & services</p>
            <h2 className="section-title">
              Des offres concrètes,
              <span className="block metal-text">structurées pour agir vite.</span>
            </h2>
            <p className="section-lead">
              Côté particulier comme côté entreprise, chaque service est pensé
              pour un résultat clair, mesurable et durable.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {BENTO_ITEMS.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 70} className={item.span}>
              <Card variant="bento" className="h-full flex flex-col p-4 md:p-5">
                <div className="relative h-36 rounded-xl overflow-hidden border border-stroke-subtle mb-5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-0/70 via-surface-0/10 to-transparent" />
                </div>
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
          ].map((item, index) => (
            <ScrollReveal key={item.label} delay={index * 60}>
              <div className="metric-chip h-full text-center">
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-text-muted font-heading">
                  {item.label}
                </p>
                <p className="text-sm md:text-base font-heading text-text-primary mt-1">{item.value}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
