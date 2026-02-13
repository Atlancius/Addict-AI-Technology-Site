import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Brain, BarChart3, RefreshCw } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card, { CardDescription, CardTitle } from "@/components/ui/Card";
import ScrollReveal from "@/components/animations/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";
import { buildLocalBusinessJsonLd } from "@/lib/jsonld";
import { getLocationWithFallback } from "@/lib/content";
import { canonicalFor } from "@/lib/seo";
import {
  CASE_STUDIES,
  FORMATIONS_PARTICULIERS,
  FORMATIONS_PRO,
  PRO_SERVICES,
  STACK_ITEMS,
  TRUST_ITEMS,
  buildAuditHref,
} from "@/lib/hub-data";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Hub premium Addict AI Technology: services pro, formations, réalisations et boutique/particuliers.",
  alternates: { canonical: canonicalFor("/") },
  openGraph: {
    title: "Addict AI Technology - Accueil",
    description:
      "Hub premium Addict AI Technology: services pro, formations, réalisations et boutique/particuliers.",
    url: canonicalFor("/"),
  },
};

const SERVICE_ICONS = [
  <BarChart3 key="m" className="w-6 h-6" />,
  <Brain key="i" className="w-6 h-6" />,
  <RefreshCw key="c" className="w-6 h-6" />,
  <Zap key="t" className="w-6 h-6" />,
];

export default async function HomePage() {
  const location = await getLocationWithFallback();
  const localBusiness = buildLocalBusinessJsonLd(location);
  const featuredCases = CASE_STUDIES.slice(0, 3);

  return (
    <>
      <JsonLd data={localBusiness} />
      <Navbar />
      <main>
        {/* ─── Hero ─── */}
        <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-[-20%] left-[10%] w-[40rem] h-[40rem] bg-brand/8 rounded-full blur-[140px]" />
            <div className="absolute top-[10%] right-[-5%] w-[35rem] h-[35rem] bg-accent/6 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[40%] w-[30rem] h-[30rem] bg-brand/5 rounded-full blur-[100px]" />
          </div>
          <div className="dot-grid absolute inset-0 -z-10" />

          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal variant="left" distance={30}>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-muted px-4 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                    <span className="text-xs font-medium text-brand-light">
                      Services pro + Particuliers
                    </span>
                  </div>

                  <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-text-primary leading-[0.95] tracking-tight">
                    Stratégie digitale,
                    <span className="block gradient-text">exécution concrète.</span>
                  </h1>

                  <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
                    Un seul hub pour orienter vos décisions: services pro, formations, réalisations et accompagnement particuliers.
                    Clarté stratégique, exécution mesurable.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary" size="lg" href={buildAuditHref("general")}>
                      Demander un audit <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" size="lg" href="/boutique">
                      Pôle particuliers
                    </Button>
                  </div>

                  <div className="flex items-center gap-6 pt-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-bg-primary bg-bg-elevated" />
                      ))}
                    </div>
                    <p className="text-sm text-text-muted">
                      <span className="text-brand-light font-semibold">50+</span> projets livrés en Corse et France
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="right" delay={150} distance={30}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/15 to-accent/10 rounded-3xl blur-3xl -z-10 scale-95" />
                  <div className="rounded-2xl border border-border-default bg-bg-secondary/70 backdrop-blur-sm p-5 space-y-4">
                    <div className="relative h-56 md:h-64 rounded-xl overflow-hidden border border-border-default">
                      <Image
                        src="/images/stock/data-center.jpg"
                        alt="Univers visuel Addict AI Technology"
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 42vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/70 via-transparent to-transparent" />
                      <div className="absolute left-4 bottom-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-bg-primary/80 backdrop-blur-sm px-3 py-1 text-xs text-brand-light">
                          IA &amp; Automatisation
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-border-default bg-bg-tertiary/50 p-4">
                        <p className="text-xs text-text-muted mb-1">Direction</p>
                        <p className="font-heading text-sm text-text-primary">Premium &amp; moderne</p>
                      </div>
                      <div className="rounded-lg border border-border-default bg-bg-tertiary/50 p-4">
                        <p className="text-xs text-text-muted mb-1">Approche</p>
                        <p className="font-heading text-sm text-text-primary">Résultats mesurables</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── Two routes ─── */}
        <section className="py-20 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollReveal variant="up" distance={20}>
                <div className="group relative rounded-2xl border border-border-default bg-bg-secondary/40 p-8 transition-all duration-300 hover:border-brand/30 hover:bg-bg-secondary/60 h-full">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-brand/5 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative space-y-4">
                    <span className="eyebrow">Route pro</span>
                    <CardTitle>Services Pro</CardTitle>
                    <CardDescription className="mb-6">
                      Marketing, IA, CRM et transition digitale dans une logique de performance mesurable.
                    </CardDescription>
                    <Button variant="secondary" href="/services">
                      Explorer les 4 branches <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="up" delay={100} distance={20}>
                <div className="group relative rounded-2xl border border-border-default bg-bg-secondary/40 p-8 transition-all duration-300 hover:border-accent/30 hover:bg-bg-secondary/60 h-full">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative space-y-4">
                    <span className="eyebrow" style={{ color: "var(--accent-light)" }}>Route particuliers</span>
                    <CardTitle>Boutique / Particuliers</CardTitle>
                    <CardDescription className="mb-6">
                      Réparation, dépannage domicile et formations accessibles pour gagner en autonomie numérique.
                    </CardDescription>
                    <Button variant="secondary" href="/boutique">
                      Aller en boutique <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── Services grid ─── */}
        <section className="py-20 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Services Pro</p>
              <h2 className="section-title mb-4">
                4 branches, 1 logique:
                <span className="block gradient-text">impact opérationnel.</span>
              </h2>
              <p className="section-lead mb-12">
                Chaque branche suit la même structure premium et propose des packs lisibles: Essentiel, Signature, Elite et sur-mesure.
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {PRO_SERVICES.map((service, index) => (
                <ScrollReveal key={service.slug} delay={index * 80} variant="up" distance={20}>
                  <Card variant="service" className="h-full flex flex-col group">
                    <div className="w-10 h-10 rounded-lg border border-brand/20 bg-brand-muted flex items-center justify-center text-brand mb-4 group-hover:bg-brand/20 transition-colors">
                      {SERVICE_ICONS[index]}
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="mb-6">{service.shortDescription}</CardDescription>
                    <div className="mt-auto">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm text-brand-light hover:text-brand transition-colors"
                      >
                        Voir la branche <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Formations ─── */}
        <section className="py-20 border-t border-border-default bg-bg-secondary/20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScrollReveal variant="left">
              <Card variant="pricing" className="h-full">
                <p className="eyebrow mb-2">Formations Pro</p>
                <CardTitle>{FORMATIONS_PRO.title}</CardTitle>
                <CardDescription className="mb-5">{FORMATIONS_PRO.summary}</CardDescription>
                <ul className="space-y-2 text-sm text-text-secondary mb-6">
                  {FORMATIONS_PRO.packs.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-brand mt-0.5">&#10003;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="primary" href={FORMATIONS_PRO.ctaHref}>{FORMATIONS_PRO.ctaLabel}</Button>
              </Card>
            </ScrollReveal>
            <ScrollReveal variant="right" delay={100}>
              <Card variant="service" className="h-full">
                <p className="eyebrow mb-2" style={{ color: "var(--accent-light)" }}>Particuliers</p>
                <CardTitle>{FORMATIONS_PARTICULIERS.title}</CardTitle>
                <CardDescription className="mb-5">{FORMATIONS_PARTICULIERS.summary}</CardDescription>
                <ul className="space-y-2 text-sm text-text-secondary mb-6">
                  {FORMATIONS_PARTICULIERS.packs.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-accent-light mt-0.5">&#10003;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" href={FORMATIONS_PARTICULIERS.ctaHref}>{FORMATIONS_PARTICULIERS.ctaLabel}</Button>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── B2C teaser ─── */}
        <section className="py-20 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Particuliers</p>
              <h2 className="section-title mb-4">Réparation, dépannage, formation</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
              {["Réparation atelier (smartphone/PC)", "Dépannage domicile sur zone locale", "Formations numériques pratiques"].map(
                (item, index) => (
                  <ScrollReveal key={item} delay={index * 80}>
                    <div className="rounded-xl border border-border-default bg-bg-secondary/40 p-6 h-full hover:border-border-hover transition-colors">
                      <p className="font-heading text-lg text-text-primary">{item}</p>
                    </div>
                  </ScrollReveal>
                ),
              )}
            </div>
            <div className="mt-8">
              <Button variant="secondary" href="/boutique">
                Voir le pôle particuliers <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </section>

        {/* ─── Case studies ─── */}
        <section className="py-20 border-t border-border-default bg-bg-secondary/20">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Réalisations</p>
              <h2 className="section-title mb-10">Extraits de projets livrés</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCases.map((cs, index) => (
                <ScrollReveal key={cs.slug} delay={index * 100}>
                  <Card variant="caseStudy" className="h-full flex flex-col">
                    <div className="relative h-40 rounded-lg overflow-hidden border border-border-default mb-4">
                      <Image src={cs.image} alt={cs.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 30vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 to-transparent" />
                    </div>
                    <CardTitle className="text-lg">{cs.title}</CardTitle>
                    <CardDescription className="mb-3">{cs.summary}</CardDescription>
                    <p className="text-sm text-brand-light mt-auto">{cs.impact}</p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-10">
              <Button variant="secondary" href="/realisations">
                Voir toutes les réalisations <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </section>

        {/* ─── Trust + Stack ─── */}
        <section className="py-20 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal variant="left">
              <div className="rounded-2xl border border-border-default bg-bg-secondary/40 p-8">
                <p className="eyebrow mb-3">Confiance</p>
                <h2 className="font-heading text-2xl text-text-primary mb-6">Expérience, collabs et méthode</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  {TRUST_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-brand mt-0.5 shrink-0">&#9670;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right" delay={100}>
              <div className="rounded-2xl border border-border-default bg-bg-secondary/40 p-8">
                <p className="eyebrow mb-4">Stack</p>
                <div className="marquee-mask overflow-hidden">
                  <div className="marquee-track">
                    {[...STACK_ITEMS, ...STACK_ITEMS].map((item, idx) => (
                      <span
                        key={`${item}-${idx}`}
                        className="inline-flex items-center rounded-full border border-border-default bg-bg-tertiary/50 px-4 py-2 text-xs text-text-secondary whitespace-nowrap"
                      >
                        {item}
                      </span>
                    ))}
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
