import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import RepairsTable from "@/components/sections/RepairsTable";
import Accordion from "@/components/ui/Accordion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";
import { buildFaqJsonLd } from "@/lib/jsonld";
import { getFaqsWithFallback, getRepairsWithFallback } from "@/lib/content";
import { stripHtml } from "@/lib/text";

export const metadata: Metadata = {
  title: "Réparations — Tarifs & Devis",
  description:
    "Consultez nos tarifs de réparation mobile et PC à Folelli. Filtres par marque, modèle et type de réparation.",
};

export default async function ReparationsPage() {
  const repairs = await getRepairsWithFallback();
  const faqs = await getFaqsWithFallback("b2c");
  const faqItems = faqs.map((faq) => ({
    question: faq.question,
    answer: stripHtml(faq.answer),
  }));
  const faqJsonLd = faqItems.length ? buildFaqJsonLd(faqItems) : null;

  return (
    <>
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      <Navbar />
      <main>
        <section className="pt-28 pb-16 bg-surface-0 surface-grid">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
                <span className="ember-text">Réparations</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-3xl">
                Tarifs indicatifs "à partir de". Pour un devis précis, contactez-nous ou passez au shop.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <RepairsTable items={repairs} />
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 bg-surface-1 border-t border-stroke-subtle">
          <div className="max-w-3xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-8">
                Questions frequentes
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <Accordion items={faqItems} />
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
