import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import MobileB2BBar from "@/components/sections/MobileB2BBar";
import Button from "@/components/ui/Button";
import Card, { CardTitle, CardDescription } from "@/components/ui/Card";
import Link from "next/link";
import Accordion from "@/components/ui/Accordion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import LeadB2BForm from "@/components/forms/LeadB2BForm";
import JsonLd from "@/components/seo/JsonLd";
import { buildFaqJsonLd } from "@/lib/jsonld";
import {
  getCaseStudiesWithFallback,
  getFaqsWithFallback,
  getLocationWithFallback,
  getServicesWithFallback,
} from "@/lib/content";
import { stripHtml } from "@/lib/text";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Solutions Pro — Automatisation, IA & Formation",
  description:
    "Accompagnement digital pour les entreprises : audit, automatisation IA, formation no-code. Gagnez du temps et optimisez vos process.",
  alternates: {
    canonical: canonicalFor("/pro"),
  },
  openGraph: {
    title: "Solutions Pro — Automatisation, IA & Formation",
    description:
      "Accompagnement digital pour les entreprises : audit, automatisation IA, formation no-code. Gagnez du temps et optimisez vos process.",
    url: canonicalFor("/pro"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions Pro — Automatisation, IA & Formation",
    description:
      "Accompagnement digital pour les entreprises : audit, automatisation IA, formation no-code. Gagnez du temps et optimisez vos process.",
  },
};

const METHODOLOGY = [
  { step: "01", title: "Audit", description: "Analyse de vos process et identification des opportunités." },
  { step: "02", title: "Stratégie", description: "Roadmap priorisée avec ROI estimé." },
  { step: "03", title: "Implémentation", description: "Mise en place des solutions et automatisations." },
  { step: "04", title: "Suivi", description: "Accompagnement continu et optimisation." },
];

const STACK = [
  "Make",
  "Zapier",
  "n8n",
  "Airtable",
  "Notion",
  "OpenAI",
  "Next.js",
  "Strapi",
];

export default async function ProPage() {
  const services = await getServicesWithFallback();
  const caseStudies = await getCaseStudiesWithFallback();
  const faqs = await getFaqsWithFallback("b2b");
  const location = await getLocationWithFallback();
  const faqItems = faqs.map((faq) => ({
    question: faq.question,
    answer: stripHtml(faq.answer),
  }));
  const faqJsonLd = faqItems.length > 0 ? buildFaqJsonLd(faqItems) : null;

  return (
    <>
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      <Navbar />
      <main>
        {/* Hero B2B */}
        <section className="min-h-[70vh] flex items-center pt-24 pb-16 relative surface-grid">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-0 via-surface-0 to-surface-1" />
          <div className="absolute top-1/4 -left-32 w-[32.5rem] h-[32.5rem] bg-metal/15 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-24 right-24 w-[32.5rem] h-[32.5rem] bg-ember/10 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-6 w-full">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-metal bg-surface-3/60 mb-6">
                <span className="text-[0.625rem] font-heading font-medium tracking-[0.2em] text-metal uppercase">
                  B2B • Digital • Automatisation
                </span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
                Gagnez du temps,
                <br />
                <span className="metal-text">automatisez vos process</span>
              </h1>

              <p className="text-text-secondary text-lg max-w-2xl mb-8 leading-relaxed">
                Accompagnement digital complet : audit, automatisation IA, formation.
                On transforme vos process pour que vous puissiez vous concentrer sur votre métier.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button variant="metal" size="lg" href="#audit">
                  Demander un audit
                </Button>
                <Button variant="outline" size="lg" href="#contact-pro">
                  Planifier un RDV
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Offres packagées */}
        <section className="py-20 bg-surface-1 border-y border-stroke-subtle">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-4">
                Nos offres
              </h2>
              <p className="text-text-muted mb-12">
                Des solutions adaptées à chaque besoin, de l&apos;audit à la formation.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <ScrollReveal key={service.id} delay={i * 100}>
                  <Card variant="pricing" className="h-full flex flex-col">
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription className="mb-6">
                      {service.summary || stripHtml(service.description || "")}
                    </CardDescription>
                    <ul className="space-y-2 mb-6 flex-1">
                      {(service.deliverables || []).map((item) => (
                        <li
                          key={item}
                          className="text-sm text-text-secondary flex items-start gap-2"
                        >
                          <span className="text-metal mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="metal"
                      size="md"
                      className="w-full"
                      href={service.cta_link || "/pro#contact-pro"}
                    >
                      {service.cta_label || "Demander un audit"}
                    </Button>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Méthodologie */}
        <section id="audit" className="py-20 bg-surface-0">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-12 text-center">
                Notre méthodologie
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {METHODOLOGY.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 100}>
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-metal/10 border border-metal/30 flex items-center justify-center">
                      <span className="font-heading font-bold text-metal text-sm">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-text-primary">
                      {step.title}
                    </h3>
                    <p className="text-text-muted text-sm">{step.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stack & crédibilité */}
        <section className="py-20 bg-surface-1 border-y border-stroke-subtle">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-4">
                Stack & crédibilité
              </h2>
              <p className="text-text-muted mb-8">
                Outils fiables, process documentés et approche orientée ROI.
              </p>
            </ScrollReveal>

            <div className="flex flex-wrap gap-4">
              {STACK.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 border border-stroke-subtle rounded-sm text-xs font-heading uppercase tracking-wider text-text-secondary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Cas / Réalisations */}
        <section className="py-20 bg-surface-1 border-y border-stroke-subtle">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-4">
                Cas clients
              </h2>
              <p className="text-text-muted mb-8">
                Quelques exemples de projets réalisés.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudies.map((caseStudy, i) => (
                <ScrollReveal key={caseStudy.id} delay={i * 100}>
                  <Card variant="caseStudy" className="h-full">
                    <CardTitle>{caseStudy.title}</CardTitle>
                    <CardDescription className="mb-3">
                      {stripHtml(caseStudy.problem || "")}
                    </CardDescription>
                    <p className="text-text-muted text-sm mb-2">
                      <span className="text-text-secondary font-semibold">Solution:</span>{" "}
                      {stripHtml(caseStudy.solution || "")}
                    </p>
                    <p className="text-text-muted text-sm">
                      <span className="text-text-secondary font-semibold">Résultat:</span>{" "}
                      {stripHtml(caseStudy.results || "")}
                    </p>
                    <div className="mt-4">
                      <Link
                        href={`/realisations/${caseStudy.slug}`}
                        className="text-xs font-heading uppercase tracking-wider text-metal hover:text-metal-hover transition-colors"
                      >
                        Voir le cas →
                      </Link>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ B2B */}
        <section className="py-20 bg-surface-0">
          <div className="max-w-3xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-8">
                Questions fréquentes
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <Accordion items={faqItems} />
            </ScrollReveal>
          </div>
        </section>

        {/* Formulaire qualifié */}
        <section id="contact-pro" className="py-20 bg-surface-1 border-t border-stroke-subtle">
          <div className="max-w-3xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-4 text-center">
                Parlons de votre projet
              </h2>
              <p className="text-text-muted mb-8 text-center">
                Remplissez le formulaire ci-dessous, on revient vers vous sous 24h.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="glass-panel rounded-sm p-8">
                <LeadB2BForm />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <MobileB2BBar phone={location.phone} />
      <Footer />
    </>
  );
}
