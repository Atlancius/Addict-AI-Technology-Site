import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card, { CardDescription, CardTitle } from "@/components/ui/Card";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { canonicalFor } from "@/lib/seo";
import {
  FORMATIONS_PARTICULIERS,
  FORMATIONS_PRO,
  FORMATION_TESTIMONIALS,
  buildAuditHref,
} from "@/lib/hub-data";

export const metadata: Metadata = {
  title: "Formations",
  description:
    "Formations en deux branches: pro (entreprises) et particuliers, avec audit formation contextuel.",
  alternates: {
    canonical: canonicalFor("/formations"),
  },
  openGraph: {
    title: "Formations",
    description:
      "Formations en deux branches: pro (entreprises) et particuliers, avec audit formation contextuel.",
    url: canonicalFor("/formations"),
  },
};

export default function FormationsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 pb-20 md:pt-32 md:pb-24 surface-grid relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-deep via-bg-main to-bg-section" />
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.06fr_0.94fr] gap-10 items-center">
            <ScrollReveal variant="left" distance={24}>
              <div className="space-y-6">
                <p className="eyebrow">Formations</p>
                <h1 className="section-title">
                  Formations actionnables,
                  <span className="block copper-text">pro ou particuliers.</span>
                </h1>
                <p className="section-lead">
                  Deux parcours distincts, une même exigence: transformer les compétences en résultats tangibles sur le terrain.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" href={buildAuditHref("formation-pro")}>
                    Audit formation entreprise
                  </Button>
                  <Button variant="secondary" href="/contact">Contact formations</Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right" delay={100}>
              <div className="panel rounded-3xl p-5 md:p-6">
                <div className="relative h-72 rounded-2xl overflow-hidden border border-border-soft">
                  <Image
                    src="/images/stock/team-meeting.jpg"
                    alt="Portrait professionnel et accompagnement formation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-bg-deep/15 to-transparent" />
                  <div className="absolute left-4 bottom-4 hero-pill">
                    <span className="accent-label text-[0.55rem] text-copper">Intervenant principal</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 section-shell">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScrollReveal>
              <Card variant="pricing" className="h-full">
                <p className="eyebrow mb-2">Bloc Pro</p>
                <CardTitle>{FORMATIONS_PRO.title}</CardTitle>
                <CardDescription className="mb-6">{FORMATIONS_PRO.summary}</CardDescription>
                <ul className="space-y-3 text-sm text-text-secondary mb-6">
                  {FORMATIONS_PRO.packs.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-copper mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" href={FORMATIONS_PRO.ctaHref}>{FORMATIONS_PRO.ctaLabel}</Button>
                  <Button variant="secondary" href="/services/transition-digitale">Voir transition digitale</Button>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={90}>
              <Card variant="service" className="h-full">
                <p className="eyebrow mb-2">Bloc Particuliers</p>
                <CardTitle>{FORMATIONS_PARTICULIERS.title}</CardTitle>
                <CardDescription className="mb-6">{FORMATIONS_PARTICULIERS.summary}</CardDescription>
                <ul className="space-y-3 text-sm text-text-secondary mb-6">
                  {FORMATIONS_PARTICULIERS.packs.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-copper mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" href="/boutique">Voir le pôle particuliers</Button>
                  <Button variant="tertiary" href={FORMATIONS_PARTICULIERS.ctaHref}>Parler de mon besoin</Button>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 section-shell bg-bg-section/55">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Preuves</p>
              <h2 className="section-title mb-10">Témoignages et retours terrain</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FORMATION_TESTIMONIALS.map((item, index) => (
                <ScrollReveal key={item.name} delay={index * 80}>
                  <Card variant="caseStudy" className="h-full">
                    <CardDescription className="mb-4">&quot;{item.quote}&quot;</CardDescription>
                    <p className="font-heading text-text-primary">{item.name}</p>
                    <p className="text-sm text-text-muted">{item.role}</p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 section-shell">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal>
              <div className="panel wow-glow rounded-3xl p-8 md:p-10 text-center space-y-5">
                <p className="eyebrow">CTA final</p>
                <h2 className="font-heading text-3xl md:text-4xl text-text-primary">
                  Tu veux un parcours de formation
                  <span className="block ember-text">vraiment utile à ton contexte ?</span>
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button variant="primary" href={buildAuditHref("formation-pro")}>
                    Demander un audit formation
                  </Button>
                  <Button variant="secondary" href="/contact">Contacter Addict</Button>
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
