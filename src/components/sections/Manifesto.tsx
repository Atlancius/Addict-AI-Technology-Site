import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Manifesto() {
  return (
    <section className="py-20 bg-surface-0 border-t border-stroke-subtle">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs font-heading uppercase tracking-[0.3em] text-text-muted mb-4">
              Pourquoi Addict
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Janus : deux univers, une seule exigence.
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-3xl mx-auto">
              Un hub local pour les particuliers et une cellule digitale pour les pros.
              Même promesse : précision, transparence, résultats mesurables.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Local concret",
              description:
                "Boutique, atelier et café manga à Folelli. Diagnostic immédiat, pièces testées, garantie claire.",
            },
            {
              title: "Digital pro",
              description:
                "Audit, automatisation, IA et formation. Roadmap priorisée, ROI mesuré, support continu.",
            },
            {
              title: "Centralisation",
              description:
                "Un seul partenaire pour réparer, vendre et automatiser. Gain de temps, cohérence, fiabilité.",
            },
          ].map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 90}>
              <div className="card-sheen rounded-sm border border-stroke-subtle bg-surface-2/80 p-6 shadow-[0_1.125rem_3.125rem_rgba(0,0,0,0.45)] hover:border-stroke-2 transition-all duration-300">
                <h3 className="font-heading text-lg text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
