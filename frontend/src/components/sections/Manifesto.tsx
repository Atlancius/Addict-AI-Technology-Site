import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Manifesto() {
  return (
    <section className="py-16 bg-surface-0 border-t border-stroke-subtle">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="text-text-secondary text-lg leading-relaxed">
            Addict, c'est le point de rencontre entre l'exigence tech et l'humain.
            On repare vite, on conseille juste, et on automatise pour faire gagner du temps.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
