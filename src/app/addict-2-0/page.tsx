import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card, { CardIcon, CardTitle, CardDescription } from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import RepairsTable from "@/components/sections/RepairsTable";
import LeadB2CForm from "@/components/forms/LeadB2CForm";
import JsonLd from "@/components/seo/JsonLd";
import { buildFaqJsonLd } from "@/lib/jsonld";
import { getFaqsWithFallback, getRepairsWithFallback } from "@/lib/content";
import { stripHtml } from "@/lib/text";

export const metadata: Metadata = {
  title: "Addict 2.0 — Réparation, Boutique Tech & Café Manga",
  description:
    "Réparation mobile & PC, boutique high-tech et café manga à Folelli, Corse. Diagnostic gratuit, intervention rapide, garantie incluse.",
};

const PILLARS = [
  {
    icon: "🛍️",
    title: "Boutique Tech",
    description:
      "Accessoires, pièces détachées, coques, protections et gadgets tech sélectionnés.",
  },
  {
    icon: "🔧",
    title: "Réparation",
    description:
      "Écran, batterie, connecteur, carte mère — diagnostic gratuit et réparation rapide.",
  },
  {
    icon: "☕",
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
          <div className="absolute top-1/4 -right-32 w-[520px] h-[520px] bg-flame/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-24 left-24 w-[520px] h-[520px] bg-ember/15 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-6 w-full">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-flame bg-surface-3/60 mb-6">
                <span className="text-[10px] font-heading font-medium tracking-[0.2em] text-flame uppercase">
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
          </div>
        </section>

        {/* 3 Piliers */}
        <section className="py-20 bg-surface-1 border-y border-stroke-subtle">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PILLARS.map((pillar, i) => (
                <ScrollReveal key={pillar.title} delay={i * 100}>
                  <Card variant="service" className="h-full text-center">
                    <CardIcon className="text-center">
                      <span className="text-4xl">{pillar.icon}</span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Tarifs */}
        <section id="tarifs" className="py-20 bg-surface-1 border-y border-stroke-subtle">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-4">
                Tarifs réparation
              </h2>
              <p className="text-text-muted mb-8">
                Tarifs indicatifs "à partir de". Contactez-nous pour un devis précis.
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
        <section id="contact-b2c" className="py-20 bg-surface-1 border-t border-stroke-subtle">
          <div className="max-w-3xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-4 text-center">
                Besoin d'une réparation ?
              </h2>
              <p className="text-text-muted mb-8 text-center">
                Appelez-nous, passez au shop ou demandez un devis en ligne.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="glass-panel rounded-sm p-8">
                <LeadB2CForm />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
