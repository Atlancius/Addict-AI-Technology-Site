import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
        {/* Hero */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/5 via-bg-primary to-bg-secondary/30" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-accent/6 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Réalisations</p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight mb-4">
                Projets livrés,
                <span className="block gradient-text">impact documenté.</span>
              </h1>
              <p className="text-text-secondary text-base md:text-lg max-w-2xl mb-8">
                Portfolio orienté preuves: résultats observables, contexte d&apos;exécution et décisions opérationnelles.
              </p>
              <Button variant="primary" href={buildAuditHref("general")}>
                Demander un audit <ArrowRight className="w-4 h-4" />
              </Button>
            </ScrollReveal>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl text-text-primary mb-10">Portfolio</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {featured.map((item, index) => (
                <ScrollReveal key={item.slug} delay={index * 70}>
                  <article className="group rounded-xl border border-border-default bg-bg-secondary/40 p-5 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                    <div className="relative h-44 rounded-lg overflow-hidden mb-4">
                      <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 32vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/76 to-transparent" />
                    </div>
                    <p className="text-[0.65rem] font-medium uppercase tracking-widest text-text-muted mb-2">{item.sector}</p>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="mb-4">{item.summary}</CardDescription>
                    <p className="text-sm text-brand-light mb-4">{item.impact}</p>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border-default bg-bg-primary/55 px-3 py-1 text-[0.65rem] font-medium text-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={`/realisations/${item.slug}`} className="text-xs font-medium uppercase tracking-widest text-brand-light hover:text-brand transition-colors mt-5">
                      Voir le cas
                    </Link>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Case */}
        <section className="py-20 bg-bg-secondary/30 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 items-center">
            <ScrollReveal variant="left">
              <Card variant="pricing" className="h-full">
                <p className="eyebrow mb-2">Cas formateur</p>
                <CardTitle>{trainingCase.title}</CardTitle>
                <CardDescription className="mb-4">{trainingCase.summary}</CardDescription>
                <p className="text-sm text-brand-light mb-5">{trainingCase.impact}</p>
                <Button variant="secondary" href={`/realisations/${trainingCase.slug}`}>Lire le détail</Button>
              </Card>
            </ScrollReveal>
            <ScrollReveal variant="right" delay={80}>
              <div className="rounded-2xl border border-border-default bg-bg-secondary/50 p-4">
                <div className="relative h-72 rounded-xl overflow-hidden">
                  <Image src={trainingCase.image} alt={trainingCase.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-bg-primary/12 to-transparent" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Stack */}
        <section className="py-20 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Écosystème</p>
              <h2 className="font-heading text-3xl md:text-4xl text-text-primary mb-4">Stack et collaborations</h2>
              <p className="text-text-secondary max-w-2xl mb-8">
                Outils et partenaires utilisés selon les besoins projet. Les marques citées restent la propriété de leurs détenteurs.
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {STACK_ITEMS.slice(0, 10).map((item, index) => (
                <ScrollReveal key={item} delay={index * 40}>
                  <div className="rounded-lg border border-border-default bg-bg-secondary/50 p-4 text-center text-xs font-medium text-text-secondary hover:border-brand/30 transition-colors">{item}</div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-bg-secondary/30 border-t border-border-default">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal>
              <div className="relative rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/8 via-bg-secondary to-accent/5 p-8 md:p-10 text-center space-y-5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="relative">
                  <p className="eyebrow">CTA Audit</p>
                  <h2 className="font-heading text-3xl md:text-4xl text-text-primary mt-3">
                    Tu veux un projet avec
                    <span className="block gradient-text">preuve d&apos;impact dès les premières semaines ?</span>
                  </h2>
                  <div className="flex flex-wrap justify-center gap-3 mt-6">
                    <Button variant="primary" href={buildAuditHref("general")}>
                      Demander un audit <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" href="/services">Voir les services</Button>
                  </div>
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
