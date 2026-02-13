import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card, { CardDescription, CardTitle } from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";
import { canonicalFor } from "@/lib/seo";
import {
  PRO_SERVICES,
  buildAuditHref,
  getCaseStudiesForService,
  getProServiceBySlug,
} from "@/lib/hub-data";

export async function generateStaticParams() {
  return PRO_SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getProServiceBySlug(slug);
  if (!service) return { title: "Service" };

  return {
    title: service.title,
    description: service.shortDescription,
    alternates: {
      canonical: canonicalFor(`/services/${service.slug}`),
    },
    openGraph: {
      title: service.title,
      description: service.shortDescription,
      url: canonicalFor(`/services/${service.slug}`),
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getProServiceBySlug(slug);
  if (!service) notFound();

  const relatedCases = getCaseStudiesForService(service.slug, 3);
  const crossLinks = service.crossNav
    .map((s) => getProServiceBySlug(s))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.shortDescription,
      url: canonicalFor(`/services/${service.slug}`),
      areaServed: "France",
      provider: {
        "@type": "Organization",
        name: "Addict Hub",
        url: canonicalFor("/"),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: canonicalFor("/") },
        { "@type": "ListItem", position: 2, name: "Services Pro", item: canonicalFor("/services") },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: canonicalFor(`/services/${service.slug}`),
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/5 via-bg-primary to-bg-secondary/30" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-accent/6 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <ScrollReveal variant="left">
              <div className="space-y-6">
                <p className="eyebrow">Service Pro</p>
                <h1 className="font-heading text-4xl md:text-5xl text-text-primary leading-tight">{service.title}</h1>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed">{service.heroPain}</p>
                <p className="text-text-primary text-base md:text-lg leading-relaxed">
                  <span className="text-brand font-medium">Promesse:</span> {service.heroPromise}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" href={buildAuditHref(service.auditContext)}>
                    Demander un audit contextuel <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" href="/services">Retour routeur services</Button>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right" delay={100}>
              <div className="rounded-2xl border border-border-default bg-bg-secondary/50 p-4">
                <div className="relative h-72 rounded-xl overflow-hidden">
                  <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/75 via-bg-primary/20 to-transparent" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Problems -> Solutions */}
        <section className="py-20 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl text-text-primary mb-10">
                Problèmes <span className="text-text-muted">&rarr;</span> solutions
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {service.problems.map((item, index) => (
                <ScrollReveal key={item.problem} delay={index * 80}>
                  <Card variant="service" className="h-full">
                    <p className="text-xs font-medium uppercase tracking-widest text-red-400/80 mb-3">Douleur</p>
                    <p className="font-heading text-lg text-text-primary mb-4">{item.problem}</p>
                    <p className="text-xs font-medium uppercase tracking-widest text-brand-light mb-2">Réponse</p>
                    <CardDescription>{item.solution}</CardDescription>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Packs */}
        <section className="py-20 bg-bg-secondary/30 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl text-text-primary mb-10">Packs + Sur-mesure</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.packs.map((pack, index) => (
                <ScrollReveal key={pack.name} delay={index * 80}>
                  <Card variant={pack.highlighted ? "pricing" : "service"} className="h-full flex flex-col">
                    <p className="text-xs font-medium uppercase tracking-widest text-brand-light mb-2">{pack.name}</p>
                    <CardTitle className="text-lg">{pack.label}</CardTitle>
                    <p className="text-sm text-accent mb-4">{pack.price}</p>
                    <ul className="space-y-2 text-sm text-text-secondary mt-auto">
                      {pack.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={120}>
              <div className="mt-6 rounded-xl border border-border-default bg-bg-secondary/50 p-6">
                <p className="text-xs font-medium uppercase tracking-widest text-brand-light mb-4">Sur-mesure</p>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-text-secondary">
                  {service.bespoke.map((item) => (
                    <li key={item} className="rounded-lg border border-border-default bg-bg-primary/50 p-4">{item}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Method */}
        <section className="py-20 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl text-text-primary mb-10">Méthode</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {service.method.map((step, index) => (
                <ScrollReveal key={step} delay={index * 70}>
                  <div className="rounded-xl border border-border-default bg-bg-secondary/50 p-6 h-full hover:border-brand/30 transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand/10 text-brand text-sm font-bold mb-4">
                      {index + 1}
                    </div>
                    <p className="text-sm text-text-secondary">{step}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Related Case Studies */}
        <section className="py-20 bg-bg-secondary/30 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl text-text-primary mb-10">Preuves / réalisations liées</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCases.map((caseStudy, index) => (
                <ScrollReveal key={caseStudy.slug} delay={index * 80}>
                  <Card variant="caseStudy" className="h-full flex flex-col">
                    <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
                    <CardDescription className="mb-4">{caseStudy.summary}</CardDescription>
                    <p className="text-sm text-brand-light mb-4">{caseStudy.impact}</p>
                    <Link href={`/realisations/${caseStudy.slug}`} className="text-xs font-medium uppercase tracking-widest text-brand-light hover:text-brand transition-colors mt-auto">
                      Voir le cas
                    </Link>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 border-t border-border-default">
          <div className="max-w-4xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl text-text-primary mb-8">FAQ</h2>
            </ScrollReveal>
            <ScrollReveal>
              <Accordion items={service.faq} />
            </ScrollReveal>
          </div>
        </section>

        {/* Cross Nav + CTA */}
        <section className="py-20 bg-bg-secondary/30 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6 space-y-8">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl text-text-primary">Tu as plutôt besoin de...</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {crossLinks.map((item, index) => (
                <ScrollReveal key={item.slug} delay={index * 80}>
                  <Card variant="service" className="h-full">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="mb-5">{item.shortDescription}</CardDescription>
                    <Button variant="secondary" href={`/services/${item.slug}`}>Voir ce service</Button>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={140}>
              <div className="relative rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/8 via-bg-secondary to-accent/5 p-8 md:p-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-brand/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
                  <div>
                    <p className="eyebrow mb-2">Audit contextuel</p>
                    <h3 className="font-heading text-3xl text-text-primary">Décision rapide, plan clair.</h3>
                  </div>
                  <Button variant="primary" href={buildAuditHref(service.auditContext)}>
                    Demander un audit {service.menuLabel} <ArrowRight className="w-4 h-4" />
                  </Button>
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
