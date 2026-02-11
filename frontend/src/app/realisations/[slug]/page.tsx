import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
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
  params: { slug: string };
}): Promise<Metadata> {
  const caseStudy = getCaseStudyBySlug(params.slug);
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

export default function RealisationDetailPage({ params }: { params: { slug: string } }) {
  const caseStudy = getCaseStudyBySlug(params.slug);
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
        <section className="pt-28 pb-20 md:pt-32 md:pb-24 surface-grid relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-deep via-bg-main to-bg-section" />
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-10 items-center">
            <ScrollReveal variant="left">
              <div className="space-y-6">
                <p className="eyebrow">Étude de cas</p>
                <h1 className="section-title">{caseStudy.title}</h1>
                <p className="section-lead">{caseStudy.summary}</p>
                <p className="text-copper text-lg">{caseStudy.impact}</p>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border-soft bg-bg-main/55 px-3 py-1 accent-label text-[0.54rem] text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" href={buildAuditHref("general")}>Demander un audit</Button>
                  <Button variant="secondary" href="/realisations">Retour aux réalisations</Button>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right" delay={100}>
              <div className="panel rounded-3xl p-5">
                <div className="relative h-80 rounded-2xl overflow-hidden border border-border-soft">
                  <Image src={caseStudy.image} alt={caseStudy.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/78 to-transparent" />
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
