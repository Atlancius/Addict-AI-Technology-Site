import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";
import { buildFaqJsonLd } from "@/lib/jsonld";
import {
  getFaqsWithFallback,
  getTrainingBySlugWithFallback,
  getTrainingsWithFallback,
} from "@/lib/content";
import { getTrainingBySlug, unwrapCollection } from "@/lib/strapi";
import type { Faq, Training } from "@/lib/types";
import { stripHtml } from "@/lib/text";
import { canonicalFor } from "@/lib/seo";

type StrapiFaqRelation = { data?: Array<{ id: number; attributes: Faq }> };

type TrainingWithFaqs = Training & {
  faqs?: StrapiFaqRelation;
};

export async function generateStaticParams() {
  const trainings = await getTrainingsWithFallback();
  return trainings.map((training) => ({ slug: training.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const training = await getTrainingBySlugWithFallback(params.slug);
  if (!training) return { title: "Formation" };

  const title = training.seo_title || training.title;
  const description =
    training.seo_description || training.summary || stripHtml(training.description || "");
  const canonical = canonicalFor(`/formations/${training.slug}`);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function TrainingDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let training: TrainingWithFaqs | null = null;
  let faqItems: Array<{ question: string; answer: string }> = [];

  try {
    const res = await getTrainingBySlug(params.slug);
    const trainings = unwrapCollection<TrainingWithFaqs>(res);
    training = trainings[0] ?? null;

    const relatedFaqs = training?.faqs?.data || [];
    if (relatedFaqs.length > 0) {
      faqItems = relatedFaqs.map((faq) => ({
        question: faq.attributes.question,
        answer: stripHtml(faq.attributes.answer),
      }));
    }
  } catch {
    training = null;
  }

  if (!training) {
    const fallback = await getTrainingBySlugWithFallback(params.slug);
    if (!fallback) notFound();
    training = fallback;
  }

  if (faqItems.length === 0) {
    const fallbackFaqs = await getFaqsWithFallback("b2b");
    faqItems = fallbackFaqs.map((faq) => ({
      question: faq.question,
      answer: stripHtml(faq.answer),
    }));
  }

  const faqJsonLd = faqItems.length ? buildFaqJsonLd(faqItems) : null;

  return (
    <>
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      <Navbar />
      <main>
        <section className="pt-28 pb-16 bg-surface-0 surface-grid">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-metal bg-surface-3/60 mb-6">
                <span className="text-[0.625rem] font-heading font-medium tracking-[0.2em] text-metal uppercase">
                  Formation
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
                {training.title}
              </h1>
              <p className="text-text-secondary text-lg">
                {training.summary || stripHtml(training.description || "")}
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button variant="metal" size="md" href={training.cta_link || "/contact"}>
                  {training.cta_label || "Demander une session"}
                </Button>
                <Button variant="outline" size="md" href="/formations">
                  Toutes les formations
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 bg-surface-1 border-y border-stroke-subtle">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal>
              <div className="glass-panel rounded-sm p-6">
                <h3 className="font-heading text-sm uppercase tracking-wider text-text-secondary mb-3">
                  Audience
                </h3>
                <p className="text-text-primary text-lg font-semibold">
                  {training.audience || "Équipes opérationnelles"}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="glass-panel rounded-sm p-6">
                <h3 className="font-heading text-sm uppercase tracking-wider text-text-secondary mb-3">
                  Format
                </h3>
                <p className="text-text-primary text-lg font-semibold">
                  {training.format || "Présentiel ou distanciel"}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="glass-panel rounded-sm p-6">
                <h3 className="font-heading text-sm uppercase tracking-wider text-text-secondary mb-3">
                  Durée
                </h3>
                <p className="text-text-primary text-lg font-semibold">
                  {training.duration || "À définir"}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 bg-surface-0">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <ScrollReveal>
                <h2 className="font-heading text-3xl font-bold text-text-primary mb-6">
                  Objectifs
                </h2>
              </ScrollReveal>
              <ScrollReveal>
                <ul className="space-y-3">
                  {(training.objectives || []).map((item) => (
                    <li
                      key={item}
                      className="border border-stroke-subtle rounded-sm p-4 text-text-secondary text-sm"
                    >
                      <span className="text-metal mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
            <div>
              <ScrollReveal>
                <h2 className="font-heading text-3xl font-bold text-text-primary mb-6">
                  Prérequis
                </h2>
              </ScrollReveal>
              <ScrollReveal>
                <ul className="space-y-3">
                  {(training.prerequisites || []).map((item) => (
                    <li
                      key={item}
                      className="border border-stroke-subtle rounded-sm p-4 text-text-secondary text-sm"
                    >
                      <span className="text-metal mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-20 bg-surface-1 border-y border-stroke-subtle">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-6">
                Programme
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="glass-panel rounded-sm p-8 text-text-secondary text-sm leading-relaxed">
                {stripHtml(training.program_outline || training.description || "")}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 bg-surface-0">
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
