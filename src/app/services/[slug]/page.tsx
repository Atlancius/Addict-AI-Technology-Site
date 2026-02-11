import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  params: { slug: string };
}): Promise<Metadata> {
  const service = getProServiceBySlug(params.slug);
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

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getProServiceBySlug(params.slug);
  if (!service) notFound();

  const relatedCases = getCaseStudiesForService(service.slug, 3);
  const crossLinks = service.crossNav
    .map((slug) => getProServiceBySlug(slug))
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
        <section className="pt-28 pb-18 md:pt-32 md:pb-22 surface-grid relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-deep via-bg-main to-bg-section" />
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <ScrollReveal variant="left">
              <div className="space-y-6">
                <p className="eyebrow">Service Pro</p>
                <h1 className="section-title">{service.title}</h1>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed">{service.heroPain}</p>
                <p className="text-text-primary text-base md:text-lg leading-relaxed">
                  <span className="copper-text">Promesse:</span> {service.heroPromise}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" href={buildAuditHref(service.auditContext)}>
                    Demander un audit contextuel
                  </Button>
                  <Button variant="secondary" href="/services">Retour routeur services</Button>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right" delay={100}>
              <div className="panel rounded-3xl p-5">
                <div className="relative h-72 rounded-2xl overflow-hidden border border-border-soft">
                  <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/75 via-bg-deep/20 to-transparent" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 section-shell">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="section-title mb-10">Problèmes -&gt; solutions</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {service.problems.map((item, index) => (
                <ScrollReveal key={item.problem} delay={index * 80}>
                  <Card variant="service" className="h-full">
                    <p className="accent-label text-[0.58rem] text-ember-300 mb-3">Douleur</p>
                    <p className="font-heading text-lg text-text-primary mb-4">{item.problem}</p>
                    <p className="accent-label text-[0.58rem] text-copper-400 mb-2">Réponse</p>
                    <CardDescription>{item.solution}</CardDescription>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 section-shell bg-bg-section/55">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="section-title mb-10">Packs + Sur-mesure</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.packs.map((pack, index) => (
                <ScrollReveal key={pack.name} delay={index * 80}>
                  <Card variant={pack.highlighted ? "pricing" : "service"} className="h-full flex flex-col">
                    <p className="accent-label text-[0.58rem] text-copper-400 mb-2">{pack.name}</p>
                    <CardTitle className="text-lg">{pack.label}</CardTitle>
                    <p className="text-sm text-ember-300 mb-4">{pack.price}</p>
                    <ul className="space-y-2 text-sm text-text-secondary mt-auto">
                      {pack.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2">
                          <span className="text-copper mt-0.5">✓</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={120}>
              <div className="panel mt-6 rounded-2xl p-6">
                <p className="accent-label text-[0.58rem] text-copper-400 mb-2">Sur-mesure</p>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-text-secondary">
                  {service.bespoke.map((item) => (
                    <li key={item} className="panel-soft p-4">{item}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 section-shell">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="section-title mb-10">Méthode</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {service.method.map((step, index) => (
                <ScrollReveal key={step} delay={index * 70}>
                  <div className="panel-soft p-6 h-full">
                    <p className="accent-label text-[0.58rem] text-copper-400 mb-2">Étape {index + 1}</p>
                    <p className="text-sm text-text-secondary">{step}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 section-shell bg-bg-section/55">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="section-title mb-10">Preuves / réalisations liées</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCases.map((caseStudy, index) => (
                <ScrollReveal key={caseStudy.slug} delay={index * 80}>
                  <Card variant="caseStudy" className="h-full flex flex-col">
                    <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
                    <CardDescription className="mb-4">{caseStudy.summary}</CardDescription>
                    <p className="text-sm text-copper mb-4">{caseStudy.impact}</p>
                    <Link href={`/realisations/${caseStudy.slug}`} className="accent-label text-[0.62rem] text-copper hover:text-copper-400 mt-auto">
                      Voir le cas
                    </Link>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 section-shell">
          <div className="max-w-4xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="section-title mb-8">FAQ</h2>
            </ScrollReveal>
            <ScrollReveal>
              <Accordion items={service.faq} />
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 section-shell bg-bg-section/55">
          <div className="max-w-7xl mx-auto px-6 space-y-8">
            <ScrollReveal>
              <h2 className="section-title">Tu as plutôt besoin de...</h2>
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
              <div className="panel wow-glow rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
                <div>
                  <p className="eyebrow mb-2">Audit contextuel</p>
                  <h3 className="font-heading text-3xl text-text-primary">Décision rapide, plan clair.</h3>
                </div>
                <Button variant="primary" href={buildAuditHref(service.auditContext)}>
                  Demander un audit {service.menuLabel}
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
