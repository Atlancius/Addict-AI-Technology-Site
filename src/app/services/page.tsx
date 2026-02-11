import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card, { CardDescription, CardTitle } from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { canonicalFor } from "@/lib/seo";
import {
  CASE_STUDIES,
  GLOBAL_PROCESS_STEPS,
  PRO_SERVICES,
  SERVICES_FAQ,
  buildAuditHref,
} from "@/lib/hub-data";

export const metadata: Metadata = {
  title: "Services Pro",
  description:
    "Routeur services pro: marketing & image, automatisation & IA, CRM/SaaS integrations, transition digitale.",
  alternates: {
    canonical: canonicalFor("/services"),
  },
  openGraph: {
    title: "Services Pro",
    description:
      "Routeur services pro: marketing & image, automatisation & IA, CRM/SaaS integrations, transition digitale.",
    url: canonicalFor("/services"),
  },
};

const GLOBAL_PACKS = [
  {
    name: "Essentiel",
    detail: "Cadrage rapide et actions prioritaires pour débloquer la situation.",
  },
  {
    name: "Signature",
    detail: "Déploiement structuré avec preuves d'impact et suivi opérationnel.",
  },
  {
    name: "Elite",
    detail: "Accompagnement avancé, pilotage de la transformation et gouvernance.",
  },
  {
    name: "Sur-mesure",
    detail: "Architecture personnalisée quand le contexte sort du cadre standard.",
  },
];

export default function ServicesPage() {
  const teaserCases = CASE_STUDIES.slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 pb-18 md:pt-32 md:pb-22 surface-grid relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-deep via-bg-main to-bg-section" />
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Routeur services pro</p>
              <h1 className="section-title mb-4">
                Choisis la branche qui
                <span className="block ember-text">attaque le vrai blocage.</span>
              </h1>
              <p className="section-lead mb-8">
                4 branches complémentaires, même niveau d&apos;exigence, et un audit contextuel pour démarrer au bon endroit.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" href={buildAuditHref("general")}>Demander un audit</Button>
                <Button variant="secondary" href="/contact">Parler à un expert</Button>
              </div>
            </ScrollReveal>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {PRO_SERVICES.map((service, index) => (
                <ScrollReveal key={service.slug} delay={index * 70}>
                  <Card variant="service" className="h-full flex flex-col">
                    <div className="relative h-32 rounded-xl overflow-hidden border border-border-soft mb-4">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/75 to-transparent" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="mb-6">{service.shortDescription}</CardDescription>
                    <div className="mt-auto flex items-center justify-between">
                      <Link href={`/services/${service.slug}`} className="accent-label text-[0.62rem] text-copper hover:text-copper-400">
                        Ouvrir la branche
                      </Link>
                      <Button variant="tertiary" size="sm" href={buildAuditHref(service.auditContext)}>
                        Audit
                      </Button>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 section-shell bg-bg-section/55">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Packs universels</p>
              <h2 className="section-title mb-4">Essentiel, Signature, Elite + Sur-mesure</h2>
              <p className="section-lead mb-10">
                Même structure sur chaque service pour comparer facilement, avec un contenu ajusté par spécialité.
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {GLOBAL_PACKS.map((pack, index) => (
                <ScrollReveal key={pack.name} delay={index * 80}>
                  <Card variant={pack.name === "Signature" ? "pricing" : "service"} className="h-full">
                    <p className="accent-label text-[0.6rem] text-copper-400 mb-2">{pack.name}</p>
                    <CardDescription>{pack.detail}</CardDescription>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 section-shell">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Process</p>
              <h2 className="section-title mb-10">Une méthode claire, du diagnostic à la transmission</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {GLOBAL_PROCESS_STEPS.map((step, index) => (
                <ScrollReveal key={step.title} delay={index * 70}>
                  <div className="panel-soft p-6 h-full">
                    <p className="accent-label text-[0.58rem] text-copper-400 mb-2">Étape {index + 1}</p>
                    <p className="font-heading text-lg text-text-primary mb-3">{step.title}</p>
                    <p className="text-sm text-text-secondary">{step.detail}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 section-shell bg-bg-section/55">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Réalisations teaser</p>
              <h2 className="section-title mb-10">Preuves récentes</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teaserCases.map((caseStudy, index) => (
                <ScrollReveal key={caseStudy.slug} delay={index * 80}>
                  <Card variant="caseStudy" className="h-full flex flex-col">
                    <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
                    <CardDescription className="mb-4">{caseStudy.summary}</CardDescription>
                    <p className="text-sm text-copper mt-auto">{caseStudy.impact}</p>
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
          <div className="max-w-4xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">FAQ</p>
              <h2 className="section-title mb-8">Questions fréquentes</h2>
            </ScrollReveal>
            <ScrollReveal>
              <Accordion items={SERVICES_FAQ} />
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
