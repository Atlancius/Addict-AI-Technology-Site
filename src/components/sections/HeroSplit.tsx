import Image from "next/image";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MouseTilt from "@/components/animations/MouseTilt";

const PATH_CARDS = [
  {
    label: "Pour particuliers",
    title: "Réparer, équiper, profiter",
    points: [
      "Diagnostic offert au comptoir",
      "Réparation express avec garantie 6 mois",
      "Boutique tech et espace café manga sur place",
    ],
    href: "/addict-2-0",
    cta: "Accéder au pôle B2C",
    tone: "flame",
  },
  {
    label: "Pour entreprises",
    title: "Structurer, automatiser, scaler",
    points: [
      "Audit process et plan d'actions 90 jours",
      "Automatisations IA orientées ROI",
      "Formation équipe + suivi opérationnel",
    ],
    href: "/pro",
    cta: "Accéder au pôle B2B",
    tone: "metal",
  },
];

export default function HeroSplit() {
  return (
    <section className="min-h-[92vh] md:min-h-screen flex items-center relative overflow-hidden pt-[5.5rem] md:pt-24 pb-12 md:pb-14 surface-grid">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-0 to-surface-1" />
        <div className="ambient-orb -left-44 top-[-14%] w-[40rem] h-[40rem] bg-metal/70 aurora" />
        <div className="ambient-orb -right-44 top-[2%] w-[43rem] h-[43rem] bg-flame/65 aurora" />
        <div className="ambient-orb left-[20%] -bottom-[28%] w-[50rem] h-[50rem] bg-ember/55 aurora" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full py-10 md:py-14 relative space-y-10 md:space-y-14">
        <ScrollReveal className="text-center" variant="soft" distance={18}>
          <div className="hero-pill">
            <span className="h-1.5 w-1.5 rounded-full bg-flame animate-pulse" />
            <span className="text-[0.62rem] font-heading uppercase tracking-[0.18em] text-text-secondary">
              Folelli, Corse · Boutique physique + studio digital
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-10 items-center">
          <ScrollReveal className="space-y-7" variant="left">
            <h1 className="font-heading text-[2.15rem] md:text-6xl font-bold text-text-primary leading-[0.98]">
              Le QG local qui
              <span className="block ember-text">répare et accélère.</span>
            </h1>

            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl">
              Addict connecte deux expertises dans un même lieu: un atelier
              tech premium pour les particuliers et un pôle transformation
              digitale pour les entreprises.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button variant="flame" size="lg" href="/addict-2-0#contact-b2c">
                Réparer mon appareil
              </Button>
              <Button variant="metal" size="lg" href="/pro#contact-pro">
                Lancer mon projet pro
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Délai atelier", value: "Express" },
                { label: "Garantie", value: "6 mois" },
                { label: "Roadmap pro", value: "90 jours" },
              ].map((item) => (
                <div key={item.label} className="panel-soft px-4 py-3">
                  <p className="text-[0.62rem] uppercase tracking-[0.16em] text-text-muted font-heading">
                    {item.label}
                  </p>
                  <p className="text-sm font-heading text-text-primary mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} variant="right">
            <MouseTilt className="panel rounded-3xl p-5 md:p-6 space-y-5" maxTilt={6} scale={1.008}>
              <div className="relative h-60 rounded-2xl overflow-hidden border border-stroke-subtle">
                <Image
                  src="/images/stock/repair-workbench.jpg"
                  alt="Réparation smartphone en atelier"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-0/75 via-surface-0/15 to-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="relative h-36 rounded-2xl overflow-hidden border border-stroke-subtle">
                  <Image
                    src="/images/stock/cafe-cozy.jpg"
                    alt="Ambiance café manga cosy"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 22vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-0/70 via-surface-0/10 to-transparent" />
                </div>
                <div className="relative h-36 rounded-2xl overflow-hidden border border-stroke-subtle">
                  <Image
                    src="/images/stock/team-meeting.jpg"
                    alt="Réunion stratégie digitale"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 22vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-0/70 via-surface-0/10 to-transparent" />
                </div>
              </div>
            </MouseTilt>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PATH_CARDS.map((card, index) => (
            <ScrollReveal
              key={card.title}
              delay={index * 90}
              variant={index % 2 === 0 ? "left" : "right"}
              distance={22}
            >
              <MouseTilt className="panel rounded-2xl p-8 md:p-9 h-full" maxTilt={5} scale={1.006}>
                <p
                  className={`text-[0.64rem] font-heading uppercase tracking-[0.18em] ${
                    card.tone === "flame" ? "text-flame" : "text-metal"
                  }`}
                >
                  {card.label}
                </p>
                <h2 className="font-heading text-3xl text-text-primary mt-3 mb-4">
                  {card.title}
                </h2>
                <ul className="space-y-2.5 text-sm text-text-secondary">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className={card.tone === "flame" ? "text-flame" : "text-metal"}>
                        ✓
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button
                    variant={card.tone === "flame" ? "flame" : "metal"}
                    size="md"
                    href={card.href}
                  >
                    {card.cta}
                  </Button>
                </div>
              </MouseTilt>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
