import Card, { CardIcon, CardTitle, CardDescription } from "@/components/ui/Card";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";

const BENTO_ITEMS = [
  {
    icon: "🔧",
    title: "Réparation Express",
    description:
      "Écran, batterie, carte mère — diagnostic gratuit, réparation rapide avec pièces de qualité.",
    href: "/addict-2-0",
    span: "lg:col-span-2",
  },
  {
    icon: "☕",
    title: "Café Manga",
    description:
      "Espace détente avec boissons et manga. Attendez votre réparation ou venez juste passer un bon moment.",
    href: "/addict-2-0",
    span: "",
  },
  {
    icon: "🤖",
    title: "Automatisation IA",
    description:
      "On connecte vos outils, automatise vos process et vous fait gagner des heures chaque semaine.",
    href: "/pro",
    span: "",
  },
  {
    icon: "🎓",
    title: "Formation",
    description:
      "Formations pratiques sur le no-code, l'IA et l'automatisation pour monter en compétence.",
    href: "/pro",
    span: "lg:col-span-2",
  },
];

export default function BentoGrid() {
  return (
    <section className="py-24 bg-surface-1 border-y border-stroke-subtle surface-grid">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12">
            <p className="text-xs font-heading uppercase tracking-[0.3em] text-text-muted mb-3">
              Deux univers
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-2">
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
                  <span className="text-3xl">{item.icon}</span>
                </CardIcon>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
                <div className="mt-6">
                  <Link
                    href={item.href}
                    className="text-xs font-heading uppercase tracking-wider text-flame hover:text-ember transition-colors"
                  >
                    Découvrir →
                  </Link>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
