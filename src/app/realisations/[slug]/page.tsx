import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { getCaseStudiesWithFallback, getCaseStudyBySlugWithFallback } from "@/lib/content";
import { stripHtml } from "@/lib/text";

export async function generateStaticParams() {
  const cases = await getCaseStudiesWithFallback();
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const caseStudy = await getCaseStudyBySlugWithFallback(params.slug);
  if (!caseStudy) return { title: "Réalisation" };

  return {
    title: caseStudy.seo_title || caseStudy.title,
    description:
      caseStudy.seo_description || stripHtml(caseStudy.problem || caseStudy.solution || ""),
  };
}

export default async function RealisationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const caseStudy = await getCaseStudyBySlugWithFallback(params.slug);
  if (!caseStudy) notFound();

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 pb-16 bg-surface-0">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
                {caseStudy.title}
              </h1>
              <p className="text-text-secondary text-lg">
                {stripHtml(caseStudy.problem || "")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {(caseStudy.tools || []).map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-heading uppercase tracking-wider px-3 py-1 border border-stroke-subtle rounded-sm text-text-secondary"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <Button variant="outline" href="/realisations">
                  Retour aux réalisations
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 bg-surface-1 border-y border-stroke-subtle">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal>
              <div className="glass-panel rounded-sm p-6">
                <h3 className="font-heading text-sm uppercase tracking-wider text-text-secondary mb-3">
                  Probleme
                </h3>
                <p className="text-text-primary text-sm">
                  {stripHtml(caseStudy.problem || "")}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="glass-panel rounded-sm p-6">
                <h3 className="font-heading text-sm uppercase tracking-wider text-text-secondary mb-3">
                  Solution
                </h3>
                <p className="text-text-primary text-sm">
                  {stripHtml(caseStudy.solution || "")}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="glass-panel rounded-sm p-6">
                <h3 className="font-heading text-sm uppercase tracking-wider text-text-secondary mb-3">
                  Resultat
                </h3>
                <p className="text-text-primary text-sm">
                  {stripHtml(caseStudy.results || "")}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
