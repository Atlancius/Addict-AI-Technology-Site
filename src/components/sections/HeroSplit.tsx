import Button from "@/components/ui/Button";

export default function HeroSplit() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-24 surface-grid">
      {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-0 to-surface-1" />
          <div className="absolute -top-32 -left-40 w-[720px] h-[720px] bg-ember/20 rounded-full blur-[140px] aurora" />
          <div className="absolute top-0 -right-40 w-[720px] h-[720px] bg-flame/20 rounded-full blur-[160px] aurora" />
          <div className="absolute bottom-[-20%] left-[20%] w-[800px] h-[800px] bg-metal/20 rounded-full blur-[200px] aurora" />
        </div>

      <div className="max-w-7xl mx-auto px-6 w-full py-16 relative">
        {/* Central pivot logo */}
        <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
          <div className="hero-center-mark w-24 h-24 rounded-md border border-stroke-medium bg-surface-2/70 backdrop-blur flex items-center justify-center shadow-[0_0_40px_rgba(217,35,35,0.2)]">
            <span className="font-heading font-bold text-3xl metal-text">A</span>
          </div>
        </div>

        <div className="hidden lg:block absolute -top-10 right-10 pointer-events-none">
          <div className="sigil flex items-center justify-center">
            <span className="relative z-10 font-heading font-bold text-4xl metal-text">A</span>
            <span className="pulse-glow" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          {/* B2C — Left panel */}
          <div className="hero-panel-left space-y-6 lg:pr-6 relief-panel rounded-md p-8 lg:p-10 backdrop-blur">
            <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-flame bg-surface-3/60">
              <span className="text-[10px] font-heading font-medium tracking-[0.2em] text-flame uppercase">
                Réparation &bull; Boutique &bull; Café Manga
              </span>
            </div>

            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
              Votre QG Tech
              <br />
              <span className="ember-text">à Folelli</span>
            </h2>

            <p className="text-text-secondary text-base leading-relaxed max-w-md">
              Réparation rapide, boutique high-tech et espace café manga.
              Le spot local pour les passionnés.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="flame" size="lg" href="/addict-2-0">
                Entrer au QG
              </Button>
              <Button variant="outline" size="lg" href="/addict-2-0#tarifs">
                Demander une réparation
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 text-center">
              {[
                { label: "Diagnostic", value: "Gratuit" },
                { label: "Garantie", value: "6 mois" },
                { label: "Délai", value: "Express" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-sm border border-stroke-subtle bg-surface-3/60 px-3 py-2"
                >
                  <p className="text-[10px] uppercase tracking-wider text-text-muted font-heading">
                    {item.label}
                  </p>
                  <p className="text-sm font-heading text-text-primary">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* B2B — Right panel */}
          <div className="hero-panel-right space-y-6 lg:pl-6 relief-panel rounded-md p-8 lg:p-10 backdrop-blur">
            <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-metal bg-surface-3/60">
              <span className="text-[10px] font-heading font-medium tracking-[0.2em] text-metal uppercase">
                Automatisation &bull; IA &bull; Formation
              </span>
            </div>

            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
              Solutions Pros
              <br />
              <span className="metal-text">sur-mesure</span>
            </h2>

            <p className="text-text-secondary text-base leading-relaxed max-w-md">
              Accompagnement digital, automatisation IA et formation pour
              transformer vos process métier.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="metal" size="lg" href="/pro">
                Solutions pros
              </Button>
              <Button variant="outline" size="lg" href="/pro#audit">
                Demander un audit
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 text-center">
              {[
                { label: "Roadmap", value: "90 jours" },
                { label: "ROI", value: "Mesuré" },
                { label: "Support", value: "Continu" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-sm border border-stroke-subtle bg-surface-3/60 px-3 py-2"
                >
                  <p className="text-[10px] uppercase tracking-wider text-text-muted font-heading">
                    {item.label}
                  </p>
                  <p className="text-sm font-heading text-text-primary">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Central info */}
        <div className="text-center mt-14 space-y-3 hero-center-copy">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
            Deux univers.{" "}
            <span className="ember-text">Une seule adresse.</span>
          </h1>
          <p className="text-text-muted text-sm font-heading tracking-wider uppercase">
            20213 Folelli – Corse
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-heading uppercase tracking-wider text-text-muted">
            <span className="px-3 py-1 rounded-sm border border-stroke-subtle bg-surface-2/60">
              Diagnostic gratuit
            </span>
            <span className="px-3 py-1 rounded-sm border border-stroke-subtle bg-surface-2/60">
              Garantie 6 mois
            </span>
            <span className="px-3 py-1 rounded-sm border border-stroke-subtle bg-surface-2/60">
              Local &amp; humain
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
