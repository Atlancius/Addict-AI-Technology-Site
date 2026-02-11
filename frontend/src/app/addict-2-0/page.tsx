import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card, { CardIcon, CardTitle, CardDescription } from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import RepairsTable from "@/components/sections/RepairsTable";
import LeadB2CForm from "@/components/forms/LeadB2CForm";
import MobileB2CBar from "@/components/sections/MobileB2CBar";
import JsonLd from "@/components/seo/JsonLd";
import { buildFaqJsonLd } from "@/lib/jsonld";
import { getFaqsWithFallback, getLocationWithFallback, getRepairsWithFallback } from "@/lib/content";
import { stripHtml } from "@/lib/text";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Addict 2.0 — Réparation, Boutique Tech & Café Manga",
  description:
    "Réparation mobile & PC, boutique high-tech et café manga à Folelli, Corse. Diagnostic gratuit, intervention rapide, garantie incluse.",
  alternates: {
    canonical: canonicalFor("/addict-2-0"),
  },
  openGraph: {
    title: "Addict 2.0 — Réparation, Boutique Tech & Café Manga",
    description:
      "Réparation mobile & PC, boutique high-tech et café manga à Folelli, Corse. Diagnostic gratuit, intervention rapide, garantie incluse.",
    url: canonicalFor("/addict-2-0"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Addict 2.0 — Réparation, Boutique Tech & Café Manga",
    description:
      "Réparation mobile & PC, boutique high-tech et café manga à Folelli, Corse. Diagnostic gratuit, intervention rapide, garantie incluse.",
  },
};

const PILLARS = [
  {
    icon: (
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path d="M6 8h12l-1 11H7L6 8Z" />
        <path d="M9 9V7a3 3 0 0 1 6 0v2" />
      </svg>
    ),
    title: "Boutique Tech",
    description:
      "Accessoires, pièces détachées, coques, protections et gadgets tech sélectionnés.",
  },
  {
    icon: (
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path d="m14 7 3 3-7.5 7.5H6.5v-3L14 7Z" />
        <path d="M15 6.5 17.5 4A2.1 2.1 0 0 1 20 6.5L17.5 9" />
      </svg>
    ),
    title: "Réparation",
    description:
      "Écran, batterie, connecteur, carte mère — diagnostic gratuit et réparation rapide.",
  },
  {
    icon: (
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path d="M5 10h11a3 3 0 0 1 0 6H7a2 2 0 0 1-2-2v-4Z" />
        <path d="M16 11h1.5a2 2 0 0 1 0 4H16" />
        <path d="M4 19h14" />
      </svg>
    ),
    title: "Café Manga",
    description:
      "Espace détente avec boissons chaudes et manga. Attendez votre réparation ou profitez.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Dépôt",
    description: "Déposez votre appareil. Vos données sont protégées.",
  },
  {
    step: "02",
    title: "Diagnostic",
    description: "Diagnostic complet et devis transparent en quelques minutes.",
  },
  {
    step: "03",
    title: "Réparation",
    description: "Intervention experte avec pièces de qualité. Suivi en temps réel.",
  },
  {
    step: "04",
    title: "Récupération",
    description: "Votre appareil réparé, testé et prêt. Garantie incluse.",
  },
];

export default async function AddictB2C() {
  const repairs = await getRepairsWithFallback();
  const faqs = await getFaqsWithFallback("b2c");
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
        {/* Hero */}
        <section className="min-h-[70vh] flex items-center pt-24 pb-16 relative surface-grid">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-0 via-surface-0 to-surface-1" />
          <div className="absolute top-1/4 -right-32 w-[32.5rem] h-[32.5rem] bg-flame/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-24 left-24 w-[32.5rem] h-[32.5rem] bg-ember/15 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
              <ScrollReveal variant="left">
                <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-flame bg-surface-3/60 mb-6">
                  <span className="text-[0.625rem] font-heading font-medium tracking-[0.2em] text-flame uppercase">
                    B2C • Folelli • Corse
                  </span>
                </div>

                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
                  Réparation rapide,
                  <br />
                  <span className="ember-text">boutique tech, café manga</span>
                </h1>

                <p className="text-text-secondary text-lg max-w-2xl mb-8 leading-relaxed">
                  Votre appareil a un problème ? On le diagnostique, on le répare,
                  et vous repartez tranquille. Avec garantie.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button variant="flame" size="lg" href="#contact-b2c">
                    Demander un devis
                  </Button>
                  <Button variant="outline" size="lg" href="#tarifs">
                    Voir les tarifs
                  </Button>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={120} variant="right">
                <div className="panel rounded-3xl p-5 md:p-6 space-y-5">
                  <div className="relative h-56 rounded-2xl overflow-hidden border border-stroke-subtle">
                    <Image
                      src="/images/stock/repair-workbench.jpg"
                      alt="Réparation de smartphone en atelier"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 38vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-0/70 via-surface-0/10 to-transparent" />
                  </div>
                  <div className="relative h-36 rounded-2xl overflow-hidden border border-stroke-subtle">
                    <Image
                      src="/images/stock/cafe-cozy.jpg"
                      alt="Ambiance café cosy"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 38vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-0/70 via-surface-0/10 to-transparent" />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 3 Piliers */}
        <section className="py-20 bg-surface-1 section-shell">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PILLARS.map((pillar, i) => (
                <ScrollReveal key={pillar.title} delay={i * 100}>
                  <Card variant="service" className="h-full text-center">
                    <CardIcon className="text-center">
                      <span className="inline-flex justify-center text-flame">
                        {pillar.icon}
                      </span>
                    </CardIcon>
                    <CardTitle className="text-center">{pillar.title}</CardTitle>
                    <CardDescription className="text-center">
                      {pillar.description}
                    </CardDescription>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process réparation */}
        <section className="py-20 bg-surface-0">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-12 text-center">
                Comment ça marche
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PROCESS_STEPS.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 100}>
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-flame/10 border border-flame/30 flex items-center justify-center">
                      <span className="font-heading font-bold text-flame text-sm">
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

        {/* Réassurance */}
        <section className="py-20 bg-surface-1 border-y border-stroke-subtle">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-8">
                Réassurance & garantie
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Garantie 6 mois",
                  desc: "Pièces et main d'œuvre garanties sur toutes les réparations.",
                },
                {
                  title: "Données protégées",
                  desc: "Nous n'accédons pas à vos données. Sauvegarde conseillée.",
                },
                {
                  title: "Transparence totale",
                  desc: "Devis clair, tarifs “à partir de”, aucun frais caché.",
                },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 80}>
                  <div className="card-sheen panel-soft p-7">
                    <h3 className="font-heading text-lg text-text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-text-muted text-sm">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Tarifs */}
        <section id="tarifs" className="py-20 bg-surface-1 section-shell">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-4">
                Tarifs réparation
              </h2>
              <p className="text-text-muted mb-8">
                Tarifs indicatifs &quot;à partir de&quot;. Contactez-nous pour un devis précis.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <RepairsTable items={repairs} />
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ B2C */}
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

        {/* Contact express */}
        <section id="contact-b2c" className="py-20 bg-surface-1 section-shell">
          <div className="max-w-3xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-4 text-center">
                Besoin d&apos;une réparation ?
              </h2>
              <p className="text-text-muted mb-8 text-center">
                Appelez-nous, passez au shop ou demandez un devis en ligne.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="panel rounded-2xl p-8 md:p-9">
                <LeadB2CForm />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <MobileB2CBar phone={location.phone} mapHref={location.google_maps_url} />
      <Footer />
    </>
  );
}
