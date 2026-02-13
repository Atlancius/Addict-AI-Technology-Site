import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card, { CardDescription, CardTitle } from "@/components/ui/Card";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FormationsTabs from "@/components/sections/FormationsTabs";
import { canonicalFor } from "@/lib/seo";
import {
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
        {/* Hero */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/5 via-bg-primary to-bg-secondary/30" />
          <div className="absolute top-20 left-1/3 w-96 h-96 bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand/6 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.06fr_0.94fr] gap-10 items-center">
            <ScrollReveal variant="left" distance={24}>
              <div className="space-y-6">
                <p className="eyebrow">Formations</p>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight">
                  Formations actionnables,
                  <span className="block gradient-text">pro ou particuliers.</span>
                </h1>
                <p className="text-text-secondary text-base md:text-lg max-w-xl">
                  Deux parcours distincts, une même exigence: transformer les compétences en résultats tangibles sur le terrain.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" href={buildAuditHref("formation")}>
                    Audit formation entreprise <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" href="/contact">Contact formations</Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right" delay={100}>
              <div className="rounded-2xl border border-border-default bg-bg-secondary/50 p-4">
                <div className="relative h-72 rounded-xl overflow-hidden">
                  <Image
                    src="/images/stock/team-meeting.jpg"
                    alt="Portrait professionnel et accompagnement formation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-bg-primary/15 to-transparent" />
                  <div className="absolute left-4 bottom-4 inline-flex items-center rounded-full border border-brand/30 bg-bg-primary/80 backdrop-blur-sm px-3 py-1.5">
                    <span className="text-xs font-medium text-brand-light">Intervenant principal</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Tabs */}
        <section className="py-20 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Parcours</p>
              <h2 className="font-heading text-3xl md:text-4xl text-text-primary mb-8">Choisis ton parcours de formation</h2>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <FormationsTabs />
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-bg-secondary/30 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Preuves</p>
              <h2 className="font-heading text-3xl md:text-4xl text-text-primary mb-10">Témoignages et retours terrain</h2>
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

        {/* CTA */}
        <section className="py-20 border-t border-border-default">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal>
              <div className="relative rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/8 via-bg-secondary to-accent/5 p-8 md:p-10 text-center space-y-5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="relative">
                  <p className="eyebrow">Prêt à se former ?</p>
                  <h2 className="font-heading text-3xl md:text-4xl text-text-primary mt-3">
                    Tu veux un parcours de formation
                    <span className="block gradient-text">vraiment utile à ton contexte ?</span>
                  </h2>
                  <div className="flex flex-wrap justify-center gap-3 mt-6">
                    <Button variant="primary" href={buildAuditHref("formation")}>
                      Demander un audit formation <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" href="/contact">Contacter Addict</Button>
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
