import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card, { CardDescription, CardTitle } from "@/components/ui/Card";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { canonicalFor } from "@/lib/seo";
import { CASE_STUDIES, STACK_ITEMS, buildAuditHref } from "@/lib/hub-data";

export const metadata: Metadata = {
  title: "Réalisations",
  description: "Portfolio de réalisations Addict Hub: cas clients, impacts et écosystème d'outils maîtrisés.",
  alternates: {
    canonical: canonicalFor("/realisations"),
  },
  openGraph: {
    title: "Réalisations",
    description: "Portfolio de réalisations Addict Hub: cas clients, impacts et écosystème d'outils maîtrisés.",
    url: canonicalFor("/realisations"),
  },
};

export default function RealisationsPage() {
  const featured = CASE_STUDIES.slice(0, 6);
  const trainingCase = CASE_STUDIES.find((item) => item.slug === "formation-equipe-terrain") || CASE_STUDIES[0];

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 pb-20 md:pt-32 md:pb-24 surface-grid relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-deep via-bg-main to-bg-section" />
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Réalisations</p>
              <h1 className="section-title mb-4">
                Projets livrés,
                <span className="block copper-text">impact documenté.</span>
              </h1>
              <p className="section-lead mb-8">
                Portfolio orienté preuves: résultats observables, contexte d&apos;exécution et décisions opérationnelles.
              </p>
              <Button variant="primary" href={buildAuditHref("general")}>Demander un audit</Button>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 section-shell">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="section-title mb-10">Portfolio</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {featured.map((item, index) => (
                <ScrollReveal key={item.slug} delay={index * 70}>
                  <article className="panel card-sheen rounded-2xl p-5 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-copper/60 hover:shadow-[0_26px_50px_rgba(0,0,0,0.38)]">
                    <div className="relative h-44 rounded-xl overflow-hidden border border-border-soft mb-4">
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 32vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/76 to-transparent" />
                    </div>
                    <p className="accent-label text-[0.56rem] text-text-muted mb-2">{item.sector}</p>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="mb-4">{item.summary}</CardDescription>
                    <p className="text-sm text-copper mb-4">{item.impact}</p>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border-soft bg-bg-main/55 px-3 py-1 accent-label text-[0.52rem] text-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={`/realisations/${item.slug}`} className="accent-label text-[0.62rem] text-copper hover:text-copper-400 mt-5">
                      Voir le cas
                    </Link>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 section-shell bg-bg-section/55">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 items-center">
            <ScrollReveal variant="left">
              <Card variant="pricing" className="h-full">
                <p className="eyebrow mb-2">Cas formateur</p>
                <CardTitle>{trainingCase.title}</CardTitle>
                <CardDescription className="mb-4">{trainingCase.summary}</CardDescription>
                <p className="text-sm text-copper mb-5">{trainingCase.impact}</p>
                <Button variant="secondary" href={`/realisations/${trainingCase.slug}`}>Lire le détail</Button>
              </Card>
            </ScrollReveal>
            <ScrollReveal variant="right" delay={80}>
              <div className="panel rounded-3xl p-5">
                <div className="relative h-72 rounded-2xl overflow-hidden border border-border-soft">
                  <Image src={trainingCase.image} alt={trainingCase.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-bg-deep/12 to-transparent" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 section-shell">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Écosystème</p>
              <h2 className="section-title mb-4">Stack et collaborations</h2>
              <p className="section-lead mb-8">
                Outils et partenaires utilisés selon les besoins projet. Les marques citées restent la propriété de leurs détenteurs.
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {STACK_ITEMS.slice(0, 10).map((item, index) => (
                <ScrollReveal key={item} delay={index * 40}>
                  <div className="panel-soft p-4 text-center accent-label text-[0.58rem] text-text-secondary">{item}</div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 section-shell bg-bg-section/55">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal>
              <div className="panel wow-glow rounded-3xl p-8 md:p-10 text-center space-y-5">
                <p className="eyebrow">CTA Audit</p>
                <h2 className="font-heading text-3xl md:text-4xl text-text-primary">
                  Tu veux un projet avec
                  <span className="block ember-text">preuve d&apos;impact dès les premières semaines ?</span>
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button variant="primary" href={buildAuditHref("general")}>Demander un audit</Button>
                  <Button variant="secondary" href="/services">Voir les services</Button>
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
