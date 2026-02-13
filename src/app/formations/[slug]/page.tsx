import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import MobileB2BBar from "@/components/sections/MobileB2BBar";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import LeadB2BForm from "@/components/forms/LeadB2BForm";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildCourseJsonLd,
  buildFaqJsonLd,
} from "@/lib/jsonld";
import {
  getFaqsWithFallback,
  getLocationWithFallback,
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
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const training = await getTrainingBySlugWithFallback(slug);
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
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function TrainingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let training: TrainingWithFaqs | null = null;
  let faqItems: Array<{ question: string; answer: string }> = [];
  const location = await getLocationWithFallback();

  try {
    const res = await getTrainingBySlug(slug);
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
    const fallback = await getTrainingBySlugWithFallback(slug);
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
  const courseJsonLd = buildCourseJsonLd(training);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: "Formations", path: "/formations" },
    { name: training.title, path: `/formations/${training.slug}` },
  ]);
  const jsonLdPayload = [courseJsonLd, breadcrumbJsonLd, ...(faqJsonLd ? [faqJsonLd] : [])];

  return (
    <>
      <JsonLd data={jsonLdPayload} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/5 via-bg-primary to-bg-secondary/30" />
          <div className="absolute top-20 left-1/3 w-96 h-96 bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-6">
                <span className="text-xs font-medium text-accent-light uppercase tracking-widest">
                  Formation
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl text-text-primary leading-tight mb-4">
                {training.title}
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl">
                {training.summary || stripHtml(training.description || "")}
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button variant="primary" size="md" href={training.cta_link || "/contact"}>
                  {training.cta_label || "Demander une session"} <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="md" href="/formations">
                  Toutes les formations
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 border-t border-border-default">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal>
              <div className="rounded-xl border border-border-default bg-bg-secondary/50 p-7">
                <h3 className="text-sm font-medium uppercase tracking-wider text-text-secondary mb-3">
                  Audience
                </h3>
                <p className="text-text-primary text-lg font-semibold">
                  {training.audience || "Équipes opérationnelles"}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="rounded-xl border border-border-default bg-bg-secondary/50 p-7">
                <h3 className="text-sm font-medium uppercase tracking-wider text-text-secondary mb-3">
                  Format
                </h3>
                <p className="text-text-primary text-lg font-semibold">
                  {training.format || "Présentiel ou distanciel"}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="rounded-xl border border-border-default bg-bg-secondary/50 p-7">
                <h3 className="text-sm font-medium uppercase tracking-wider text-text-secondary mb-3">
                  Durée
                </h3>
                <p className="text-text-primary text-lg font-semibold">
                  {training.duration || "À définir"}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Objectives + Prerequisites */}
        <section className="py-20 bg-bg-secondary/30 border-t border-border-default">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <ScrollReveal>
                <h2 className="font-heading text-3xl text-text-primary mb-6">Objectifs</h2>
              </ScrollReveal>
              <ScrollReveal>
                <ul className="space-y-3">
                  {(training.objectives || []).map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-lg border border-border-default bg-bg-secondary/50 p-5 text-text-secondary text-sm">
                      <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
            <div>
              <ScrollReveal>
                <h2 className="font-heading text-3xl text-text-primary mb-6">Prérequis</h2>
              </ScrollReveal>
              <ScrollReveal>
                <ul className="space-y-3">
                  {(training.prerequisites || []).map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-lg border border-border-default bg-bg-secondary/50 p-5 text-text-secondary text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Programme */}
        <section className="py-20 border-t border-border-default">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl text-text-primary mb-6">Programme</h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="rounded-xl border border-border-default bg-bg-secondary/50 p-8 md:p-9 text-text-secondary text-sm leading-relaxed">
                {stripHtml(training.program_outline || training.description || "")}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-pro" className="py-20 bg-bg-secondary/30 border-t border-border-default">
          <div className="max-w-3xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl text-text-primary mb-4 text-center">
                Réserver une session
              </h2>
              <p className="text-text-muted mb-8 text-center">
                Partagez votre contexte d&apos;équipe, vos objectifs et vos contraintes.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="rounded-xl border border-border-default bg-bg-secondary/50 p-8 md:p-9">
                <LeadB2BForm />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 border-t border-border-default">
          <div className="max-w-3xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl text-text-primary mb-8">
                Questions fréquentes
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <Accordion items={faqItems} />
            </ScrollReveal>
          </div>
        </section>
      </main>
      <MobileB2BBar phone={location.phone} auditHref="#contact-pro" />
      <Footer />
    </>
  );
}
