import type { Metadata } from "next";
import Image from "next/image";
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
        <section className="pt-28 pb-20 md:pt-32 md:pb-24 surface-grid relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-deep via-bg-main to-bg-section" />
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.98fr_1.02fr] gap-10 items-center">
            <ScrollReveal variant="left" distance={24}>
              <div className="space-y-6">
                <p className="eyebrow">À propos</p>
                <h1 className="section-title">
                  Exigence premium,
                  <span className="block copper-text">ancrage terrain.</span>
                </h1>
                <p className="section-lead">
                  Addict Hub combine stratégie, design et exécution opérationnelle pour transformer des intentions digitales en résultats concrets.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" href={buildAuditHref("general")}>Demander un audit</Button>
                  <Button variant="secondary" href="/contact">Nous contacter</Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right" delay={90}>
              <div className="panel rounded-3xl p-5">
                <div className="relative h-80 rounded-2xl overflow-hidden border border-border-soft">
                  <Image
                    src="/images/stock/pro-workspace.jpg"
                    alt="Portrait professionnel Addict"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-bg-deep/12 to-transparent" />
                  <div className="absolute left-4 bottom-4 hero-pill">
                    <span className="accent-label text-[0.55rem] text-copper">Fondateur & opérateur</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 section-shell">
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

        <section className="py-20 section-shell bg-bg-section/55">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.96fr_1.04fr] gap-8 items-start">
            <ScrollReveal variant="left">
              <div className="panel rounded-2xl p-7">
                <h2 className="font-heading text-3xl text-text-primary mb-5">Ce qui nous distingue</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  {TRUST_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-copper mt-0.5">◆</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right" delay={90}>
              <div className="panel rounded-2xl p-7">
                <h2 className="font-heading text-3xl text-text-primary mb-5">Stack maîtrisée</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {STACK_ITEMS.map((item) => (
                    <div
                      key={item}
                      className="panel-soft p-3 text-center accent-label text-[0.56rem] text-text-secondary"
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
