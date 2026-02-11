import ScrollReveal from "@/components/animations/ScrollReveal";
import MouseTilt from "@/components/animations/MouseTilt";

const PRINCIPLES = [
  {
    id: "01",
    title: "Précision terrain",
    description:
      "Chaque intervention est cadrée par un diagnostic clair, un devis lisible et un protocole de test.",
  },
  {
    id: "02",
    title: "Execution mesurable",
    description:
      "Chaque projet pro suit une roadmap priorisée, des objectifs concrets et des indicateurs de progression.",
  },
  {
    id: "03",
    title: "Relation durable",
    description:
      "Nous privilégions la pédagogie, la transparence et l'accompagnement dans le temps plutôt que la vente ponctuelle.",
  },
];

export default function Manifesto() {
  return (
    <section className="py-24 bg-surface-0 section-shell">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
          <ScrollReveal variant="left">
            <MouseTilt className="panel rounded-2xl p-8 md:p-9 space-y-6" maxTilt={4.5} scale={1.004}>
              <p className="eyebrow">Manifeste Addict</p>
              <h2 className="section-title">
                Un atelier local,
                <span className="block ember-text">une exigence opérationnelle.</span>
              </h2>
              <p className="section-lead">
                Addict relie deux mondes souvent séparés: la réparation concrète
                du quotidien et la transformation digitale des entreprises.
                Le même standard s&apos;applique aux deux.
              </p>
              <div className="split-divider" />
              <p className="text-xs uppercase tracking-[0.16em] text-text-muted font-heading">
                &quot;Simple à comprendre. Solide à l&apos;usage.&quot;
              </p>
            </MouseTilt>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {PRINCIPLES.map((item, index) => (
              <ScrollReveal
                key={item.id}
                delay={index * 100}
                variant="zoom"
                distance={20}
              >
                <MouseTilt className="panel-soft h-full p-7" maxTilt={4} scale={1.004}>
                  <p className="font-heading text-[0.64rem] tracking-[0.18em] uppercase text-text-muted">
                    Axe {item.id}
                  </p>
                  <h3 className="font-heading text-xl text-text-primary mt-3 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </MouseTilt>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Diagnostic", value: "Offert" },
            { label: "Garantie", value: "6 mois" },
            { label: "Roadmap pro", value: "90 jours" },
            { label: "Support", value: "Continu" },
          ].map((item, index) => (
            <ScrollReveal key={item.label} delay={index * 70} variant="soft" distance={16}>
              <div className="metric-chip h-full">
                <p className="text-[0.62rem] uppercase tracking-[0.14em] text-text-muted font-heading">
                  {item.label}
                </p>
                <p className="font-heading text-xl text-text-primary mt-2">
                  {item.value}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
