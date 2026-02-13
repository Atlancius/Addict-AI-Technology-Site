import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Diamond } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card, { CardDescription, CardTitle } from "@/components/ui/Card";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { canonicalFor } from "@/lib/seo";
import { STACK_ITEMS, TRUST_ITEMS, buildAuditHref } from "@/lib/hub-data";

export const metadata: Metadata = {
  title: "À propos",
  description: "Vision, méthode et parcours Addict Hub. Positionnement premium, exécution terrain, accompagnement humain.",
  alternates: {
    canonical: canonicalFor("/a-propos"),
  },
  openGraph: {
    title: "À propos",
    description: "Vision, méthode et parcours Addict Hub. Positionnement premium, exécution terrain, accompagnement humain.",
    url: canonicalFor("/a-propos"),
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/5 via-bg-primary to-bg-secondary/30" />
          <div className="absolute top-20 left-1/3 w-96 h-96 bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-brand/6 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.98fr_1.02fr] gap-10 items-center">
            <ScrollReveal variant="left" distance={24}>
              <div className="space-y-6">
                <p className="eyebrow">À propos</p>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight">
                  Exigence premium,
                  <span className="block gradient-text">ancrage terrain.</span>
                </h1>
                <p className="text-text-secondary text-base md:text-lg max-w-xl">
                  Addict Hub combine stratégie, design et exécution opérationnelle pour transformer des intentions digitales en résultats concrets.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" href={buildAuditHref("general")}>
                    Demander un audit <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" href="/contact">Nous contacter</Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right" delay={90}>
              <div className="rounded-2xl border border-border-default bg-bg-secondary/50 p-4">
                <div className="relative h-80 rounded-xl overflow-hidden">
                  <Image
                    src="/images/stock/pro-workspace.jpg"
                    alt="Portrait professionnel Addict"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-bg-primary/12 to-transparent" />
                  <div className="absolute left-4 bottom-4 inline-flex items-center rounded-full border border-brand/30 bg-bg-primary/80 backdrop-blur-sm px-3 py-1.5">
                    <span className="text-xs font-medium text-brand-light">Fondateur & opérateur</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Vision / Method / Positioning */}
        <section className="py-20 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Vision",
                text: "Construire des systèmes simples, beaux et rentables plutôt qu'empiler des outils.",
              },
              {
                title: "Méthode",
                text: "Audit, priorisation, déploiement, transmission. Chaque phase a des critères de validation.",
              },
              {
                title: "Positionnement",
                text: "Entre stratégie et exécution, avec une relation directe et un niveau de finition premium.",
              },
            ].map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 70}>
                <Card variant="service" className="h-full">
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.text}</CardDescription>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Trust + Stack */}
        <section className="py-20 bg-bg-secondary/30 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.96fr_1.04fr] gap-8 items-start">
            <ScrollReveal variant="left">
              <div className="rounded-xl border border-border-default bg-bg-secondary/50 p-7">
                <h2 className="font-heading text-3xl text-text-primary mb-5">Ce qui nous distingue</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  {TRUST_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Diamond className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right" delay={90}>
              <div className="rounded-xl border border-border-default bg-bg-secondary/50 p-7">
                <h2 className="font-heading text-3xl text-text-primary mb-5">Stack maîtrisée</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {STACK_ITEMS.map((item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-border-default bg-bg-primary/50 p-3 text-center text-xs font-medium text-text-secondary"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
