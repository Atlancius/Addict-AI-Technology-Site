import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  buildFaqJsonLd,
  buildServiceJsonLd,
} from "@/lib/jsonld";
import {
  getFaqsWithFallback,
  getLocationWithFallback,
  getServiceBySlugWithFallback,
  getServicesWithFallback,
} from "@/lib/content";
import { getServiceBySlug, unwrapCollection } from "@/lib/strapi";
import type { Faq, Service } from "@/lib/types";
import { stripHtml } from "@/lib/text";
import { canonicalFor } from "@/lib/seo";

type StrapiFaqRelation = { data?: Array<{ id: number; attributes: Faq }> };

type ServiceWithFaqs = Service & {
  faqs?: StrapiFaqRelation;
};

export async function generateStaticParams() {
  const services = await getServicesWithFallback();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getServiceBySlugWithFallback(params.slug);
  if (!service) return { title: "Service" };

  const title = service.seo_title || service.title;
  const description =
    service.seo_description || service.summary || stripHtml(service.description || "");
  const canonical = canonicalFor(`/services/${service.slug}`);

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

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let service: ServiceWithFaqs | null = null;
  let faqItems: Array<{ question: string; answer: string }> = [];
  const location = await getLocationWithFallback();

  try {
    const res = await getServiceBySlug(params.slug);
    const services = unwrapCollection<ServiceWithFaqs>(res);
    service = services[0] ?? null;

    const relatedFaqs = service?.faqs?.data || [];
    if (relatedFaqs.length > 0) {
      faqItems = relatedFaqs.map((faq) => ({
        question: faq.attributes.question,
        answer: stripHtml(faq.attributes.answer),
      }));
    }
  } catch {
    service = null;
  }

  if (!service) {
    const fallback = await getServiceBySlugWithFallback(params.slug, {
      skipRemote: true,
    });
    if (!fallback) notFound();
    service = fallback;
  }

  if (faqItems.length === 0) {
    const fallbackFaqs = await getFaqsWithFallback("b2b");
    faqItems = fallbackFaqs.map((faq) => ({
      question: faq.question,
      answer: stripHtml(faq.answer),
    }));
  }

  const faqJsonLd = faqItems.length ? buildFaqJsonLd(faqItems) : null;
  const serviceJsonLd = buildServiceJsonLd(service);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ]);
  const jsonLdPayload = [serviceJsonLd, breadcrumbJsonLd, ...(faqJsonLd ? [faqJsonLd] : [])];

  return (
    <>
      <JsonLd data={jsonLdPayload} />
      <Navbar />
      <main>
        <section className="pt-28 pb-16 bg-surface-0">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-metal bg-surface-1/60 mb-6">
                <span className="text-[0.625rem] font-heading font-medium tracking-[0.2em] text-metal uppercase">
                  {service.category}
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
                {service.title}
              </h1>
              <p className="text-text-secondary text-lg">
                {service.summary || stripHtml(service.description || "")}
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button variant="metal" size="md" href="/pro#contact-pro">
                  Demander un audit
                </Button>
                <Button variant="outline" size="md" href="/services">
                  Tous les services
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 bg-surface-1 section-shell">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal>
              <div className="panel rounded-2xl p-7">
                <h3 className="font-heading text-sm uppercase tracking-wider text-text-secondary mb-3">
                  Durée estimée
                </h3>
                <p className="text-text-primary text-lg font-semibold">
                  {service.duration_estimate || "Sur mesure"}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="panel rounded-2xl p-7">
                <h3 className="font-heading text-sm uppercase tracking-wider text-text-secondary mb-3">
                  Prix
                </h3>
                <p className="text-text-primary text-lg font-semibold">
                  {service.starting_price_text || "Sur devis"}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="panel rounded-2xl p-7">
                <h3 className="font-heading text-sm uppercase tracking-wider text-text-secondary mb-3">
                  Accompagnement
                </h3>
                <p className="text-text-primary text-lg font-semibold">Local + distanciel</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 bg-surface-0">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-6">
                Livrables
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(service.deliverables || []).map((item) => (
                  <li
                    key={item}
                    className="panel-soft p-5 text-text-secondary text-sm"
                  >
                    <span className="text-metal mr-2">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              {(!service.deliverables || service.deliverables.length === 0) && (
                <p className="text-text-muted text-sm">
                  Les livrables précis seront définis après audit.
                </p>
              )}
            </ScrollReveal>
          </div>
        </section>

        <section id="contact-pro" className="py-20 bg-surface-1 section-shell">
          <div className="max-w-3xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-4 text-center">
                Parlons de votre besoin
              </h2>
              <p className="text-text-muted mb-8 text-center">
                Décrivez votre contexte et vos objectifs, nous revenons vers vous avec une proposition claire.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="panel rounded-2xl p-8 md:p-9">
                <LeadB2BForm />
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 bg-surface-1 section-shell">
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
      <MobileB2BBar phone={location.phone} auditHref="#contact-pro" />
      <Footer />
    </>
  );
}

