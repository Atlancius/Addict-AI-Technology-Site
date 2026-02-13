import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";
import { canonicalFor } from "@/lib/seo";
import { CASE_STUDIES, buildAuditHref, getCaseStudyBySlug } from "@/lib/hub-data";

export async function generateStaticParams() {
  return CASE_STUDIES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return { title: "Réalisation" };

  return {
    title: caseStudy.title,
    description: caseStudy.summary,
    alternates: {
      canonical: canonicalFor(`/realisations/${caseStudy.slug}`),
    },
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.summary,
      url: canonicalFor(`/realisations/${caseStudy.slug}`),
      images: [{ url: caseStudy.image }],
    },
  };
}

export default async function RealisationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy.title,
    description: caseStudy.summary,
    abstract: caseStudy.impact,
    creator: {
      "@type": "Organization",
      name: "Addict Hub",
    },
    url: canonicalFor(`/realisations/${caseStudy.slug}`),
    keywords: caseStudy.tags.join(", "),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/5 via-bg-primary to-bg-secondary/30" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-brand/8 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-10 items-center">
            <ScrollReveal variant="left">
              <div className="space-y-6">
                <p className="eyebrow">Étude de cas</p>
                <h1 className="font-heading text-4xl md:text-5xl text-text-primary leading-tight">{caseStudy.title}</h1>
                <p className="text-text-secondary text-base md:text-lg">{caseStudy.summary}</p>
                <p className="text-brand-light text-lg">{caseStudy.impact}</p>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border-default bg-bg-secondary/55 px-3 py-1 text-[0.65rem] font-medium text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" href={buildAuditHref("general")}>
                    Demander un audit <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" href="/realisations">Retour aux réalisations</Button>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right" delay={100}>
              <div className="rounded-2xl border border-border-default bg-bg-secondary/50 p-4">
                <div className="relative h-80 rounded-xl overflow-hidden">
                  <Image src={caseStudy.image} alt={caseStudy.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/78 to-transparent" />
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
