import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    "Hub premium Addict: services pro, formations, réalisations et boutique/particuliers, avec audit contextuel.",
  alternates: {
    canonical: canonicalFor("/"),
  },
  openGraph: {
    title: "Addict Hub - Accueil",
    description:
      "Hub premium Addict: services pro, formations, réalisations et boutique/particuliers, avec audit contextuel.",
    url: canonicalFor("/"),
  },
};

export default async function HomePage() {
  const location = await getLocationWithFallback();
  const localBusiness = buildLocalBusinessJsonLd(location);
  const featuredCases = CASE_STUDIES.slice(0, 3);

  return (
    <>
      <JsonLd data={localBusiness} />
      <Navbar />
      <main>
        <section className="pt-28 pb-20 md:pt-32 md:pb-24 surface-grid relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-bg-deep via-bg-main to-bg-section" />
            <div className="ambient-orb -left-40 top-[-12%] w-[38rem] h-[38rem] bg-ember/50 aurora" />
            <div className="ambient-orb -right-28 top-[8%] w-[34rem] h-[34rem] bg-copper/45 aurora" />
          </div>

          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 items-center">
              <ScrollReveal variant="left" distance={24}>
                <div className="space-y-6">
                  <div className="hero-pill">
                    <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
                    <span className="accent-label text-[0.6rem] text-text-secondary">
                      Hub premium • services pro + particuliers
                    </span>
                  </div>
                  <h1 className="font-heading text-[2.2rem] md:text-6xl text-text-primary leading-[0.95]">
                    Dark premium vivant,
                    <span className="block ember-text">signature braise assumée.</span>
                  </h1>
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl">
                    Un seul hub pour orienter tes décisions: services pro, formations, réalisations et accompagnement particuliers.
                    Clarté stratégique, exécution concrète, rendu premium.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" size="lg" href={buildAuditHref("general")}>
                      Demander un audit
                    </Button>
                    <Button variant="secondary" size="lg" href="/boutique">
                      Pôle particuliers
                    </Button>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100} variant="right" distance={24}>
                <div className="panel rounded-3xl p-5 md:p-6 space-y-4">
                  <div className="relative h-60 rounded-2xl overflow-hidden border border-border-soft">
                    <Image
                      src="/images/stock/data-center.jpg"
                      alt="Univers visuel cinématique Addict Hub"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-bg-deep/20 to-transparent" />
                    <div className="absolute left-4 bottom-4 hero-pill">
                      <span className="accent-label text-[0.54rem] text-copper">Hero signature</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="panel-soft p-4">
                      <p className="accent-label text-[0.56rem] text-text-muted">Direction</p>
                      <p className="font-heading text-sm text-text-primary mt-2">Luxe cuivre / braise</p>
                    </div>
                    <div className="panel-soft p-4">
                      <p className="accent-label text-[0.56rem] text-text-muted">Motion</p>
                      <p className="font-heading text-sm text-text-primary mt-2">Subtil + 3 moments wow</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollReveal variant="up" distance={18}>
                <Card variant="service" className="h-full">
                  <p className="accent-label text-[0.58rem] text-copper-400 mb-2">Route pro</p>
                  <CardTitle>Services Pro</CardTitle>
                  <CardDescription className="mb-6">
                    Marketing, IA, CRM et transition digitale dans une logique de performance mesurable.
                  </CardDescription>
                  <Button variant="secondary" href="/services">Explorer les 4 branches</Button>
                </Card>
              </ScrollReveal>
              <ScrollReveal variant="up" delay={80} distance={18}>
                <Card variant="service" className="h-full">
                  <p className="accent-label text-[0.58rem] text-copper-400 mb-2">Route particuliers</p>
                  <CardTitle>Boutique / Particuliers</CardTitle>
                  <CardDescription className="mb-6">
                    Réparation, dépannage domicile et formations accessibles pour gagner en autonomie numérique.
                  </CardDescription>
                  <Button variant="secondary" href="/boutique">Aller en boutique</Button>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-20 section-shell">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Services Pro</p>
              <h2 className="section-title mb-4">
                4 branches, 1 logique:
                <span className="block copper-text">impact opérationnel.</span>
              </h2>
              <p className="section-lead mb-10">
                Chaque branche suit la même structure premium et propose des packs lisibles: Essentiel, Signature, Elite et sur-mesure.
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {PRO_SERVICES.map((service, index) => (
                <ScrollReveal key={service.slug} delay={index * 70} variant="up" distance={16}>
                  <Card variant="service" className="h-full flex flex-col">
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="mb-6">{service.shortDescription}</CardDescription>
                    <div className="mt-auto">
                      <Link
                        href={`/services/${service.slug}`}
                        className="accent-label text-[0.62rem] text-copper hover:text-copper-400"
                      >
                        Voir la branche
                      </Link>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 section-shell bg-bg-section/55">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScrollReveal variant="left">
              <Card variant="pricing" className="h-full">
                <p className="eyebrow mb-2">Formations</p>
                <CardTitle>{FORMATIONS_PRO.title}</CardTitle>
                <CardDescription className="mb-5">{FORMATIONS_PRO.summary}</CardDescription>
                <ul className="space-y-2 text-sm text-text-secondary mb-6">
                  {FORMATIONS_PRO.packs.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-copper mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="primary" href={FORMATIONS_PRO.ctaHref}>{FORMATIONS_PRO.ctaLabel}</Button>
              </Card>
            </ScrollReveal>

            <ScrollReveal variant="right" delay={80}>
              <Card variant="pricing" className="h-full">
                <p className="eyebrow mb-2">Particuliers</p>
                <CardTitle>{FORMATIONS_PARTICULIERS.title}</CardTitle>
                <CardDescription className="mb-5">{FORMATIONS_PARTICULIERS.summary}</CardDescription>
                <ul className="space-y-2 text-sm text-text-secondary mb-6">
                  {FORMATIONS_PARTICULIERS.packs.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-copper mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" href={FORMATIONS_PARTICULIERS.ctaHref}>{FORMATIONS_PARTICULIERS.ctaLabel}</Button>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 section-shell">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Particuliers</p>
              <h2 className="section-title mb-4">Réparation, dépannage, formation</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                "Réparation atelier (smartphone/PC)",
                "Dépannage domicile sur zone locale",
                "Formations numériques pratiques",
              ].map((item, index) => (
                <ScrollReveal key={item} delay={index * 70}>
                  <div className="panel-soft p-6 h-full">
                    <p className="font-heading text-lg text-text-primary">{item}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-8">
              <Button variant="secondary" href="/boutique">Voir le pôle particuliers</Button>
            </div>
          </div>
        </section>

        <section className="py-20 section-shell bg-bg-section/55">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Réalisations</p>
              <h2 className="section-title mb-10">Extraits de projets livrés</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCases.map((caseStudy, index) => (
                <ScrollReveal key={caseStudy.slug} delay={index * 80}>
                  <Card variant="caseStudy" className="h-full flex flex-col">
                    <div className="relative h-40 rounded-xl overflow-hidden border border-border-soft mb-4">
                      <Image
                        src={caseStudy.image}
                        alt={caseStudy.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                    </div>
                    <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
                    <CardDescription className="mb-4">{caseStudy.summary}</CardDescription>
                    <p className="text-sm text-copper">{caseStudy.impact}</p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-8">
              <Button variant="secondary" href="/realisations">Voir toutes les réalisations</Button>
            </div>
          </div>
        </section>

        <section className="py-20 section-shell">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
            <ScrollReveal variant="left">
              <div className="panel rounded-2xl p-7">
                <p className="eyebrow mb-3">Confiance</p>
                <h2 className="font-heading text-3xl text-text-primary mb-5">Expérience, collabs et méthode</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  {TRUST_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-copper">◆</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right" delay={90}>
              <div className="panel rounded-2xl p-7">
                <p className="eyebrow mb-4">Stack</p>
                <div className="tool-marquee">
                  <div className="tool-track">
                    {[...STACK_ITEMS, ...STACK_ITEMS].map((item, idx) => (
                      <span
                        key={`${item}-${idx}`}
                        className="inline-flex items-center rounded-full border border-border-soft bg-bg-main/45 px-4 py-2 accent-label text-[0.58rem] text-text-secondary"
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
