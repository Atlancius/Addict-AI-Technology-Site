import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import RepairsTable from "@/components/sections/RepairsTable";
import Accordion from "@/components/ui/Accordion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MobileB2CBar from "@/components/sections/MobileB2CBar";
import JsonLd from "@/components/seo/JsonLd";
import { buildFaqJsonLd } from "@/lib/jsonld";
import { getFaqsWithFallback, getLocationWithFallback, getRepairsWithFallback } from "@/lib/content";
import { stripHtml } from "@/lib/text";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Réparations — Tarifs & Devis",
  description:
    "Consultez nos tarifs de réparation mobile et PC à Folelli. Filtres par marque, modèle et type de réparation.",
  alternates: {
    canonical: canonicalFor("/reparations"),
  },
  openGraph: {
    title: "Réparations — Tarifs & Devis",
    description:
      "Consultez nos tarifs de réparation mobile et PC à Folelli. Filtres par marque, modèle et type de réparation.",
    url: canonicalFor("/reparations"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Réparations — Tarifs & Devis",
    description:
      "Consultez nos tarifs de réparation mobile et PC à Folelli. Filtres par marque, modèle et type de réparation.",
  },
};

export default async function ReparationsPage() {
  const repairs = await getRepairsWithFallback();
  const faqs = await getFaqsWithFallback("b2c");
  const location = await getLocationWithFallback();
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
                Tarifs indicatifs &quot;à partir de&quot;. Pour un devis précis, contactez-nous ou passez au shop.
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

        <section className="py-20 bg-surface-1 border-y border-stroke-subtle">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-8">
                Réassurance
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  desc: "Devis clair, prix “à partir de”, aucun frais caché.",
                },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 80}>
                  <div className="card-sheen rounded-sm border border-stroke-subtle bg-surface-2/80 p-6">
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

        <section className="py-20 bg-surface-1 border-t border-stroke-subtle">
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
      </main>
      <MobileB2CBar
        phone={location.phone}
        mapHref={location.google_maps_url}
        quoteHref="/contact"
      />
      <Footer />
    </>
  );
}
