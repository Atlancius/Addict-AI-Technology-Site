import Button from "@/components/ui/Button";

export default function HeroSplit() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-0 to-surface-1" />
        {/* Flame glow left */}
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-flame/5 rounded-full blur-3xl" />
        {/* Metal glow right */}
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-metal/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full py-16 relative">
        {/* Central pivot logo */}
        <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
          <div className="hero-center-mark w-16 h-16 rounded-sm border border-stroke-medium bg-surface-1/60 backdrop-blur flex items-center justify-center shadow-[0_0_30px_rgba(255,90,31,0.15)]">
            <span className="font-heading font-bold text-xl text-text-primary">A</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          {/* B2C — Left panel */}
          <div className="hero-panel-left space-y-6 lg:pr-12 lg:border-r border-stroke-subtle">
            <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-flame bg-surface-1/60">
              <span className="text-[10px] font-heading font-medium tracking-[0.2em] text-flame uppercase">
                Réparation &bull; Boutique &bull; Café Manga
              </span>
            </div>

            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-text-primary leading-tight">
              Votre QG Tech
              <br />
              <span className="text-flame">à Folelli</span>
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
          </div>

          {/* B2B — Right panel */}
          <div className="hero-panel-right space-y-6 lg:pl-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-metal bg-surface-1/60">
              <span className="text-[10px] font-heading font-medium tracking-[0.2em] text-metal uppercase">
                Automatisation &bull; IA &bull; Formation
              </span>
            </div>

            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-text-primary leading-tight">
              Solutions Pros
              <br />
              <span className="text-metal">sur-mesure</span>
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
          </div>
        </div>

        {/* Central info */}
        <div className="text-center mt-16 space-y-3 hero-center-copy">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
            Deux univers.{" "}
            <span className="bg-gradient-to-r from-flame to-ember bg-clip-text text-transparent">
              Une seule adresse.
            </span>
          </h1>
          <p className="text-text-muted text-sm font-heading tracking-wider uppercase">
            20213 Folelli – Corse
          </p>
        </div>
      </div>
    </section>
  );
}
