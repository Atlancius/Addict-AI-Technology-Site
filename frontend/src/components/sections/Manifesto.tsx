import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Manifesto() {
  return (
    <section className="py-20 bg-surface-0 border-t border-stroke-subtle">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="text-xs font-heading uppercase tracking-[0.3em] text-text-muted mb-4">
            Manifeste
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            L’exigence tech, l’humain au centre.
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Addict, c&apos;est le point de rencontre entre l&apos;exigence tech et l&apos;humain.
            On répare vite, on conseille juste, et on automatise pour faire gagner du temps.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
