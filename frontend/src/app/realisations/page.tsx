import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Card, { CardTitle, CardDescription } from "@/components/ui/Card";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { getCaseStudiesWithFallback } from "@/lib/content";
import { stripHtml } from "@/lib/text";

export const metadata: Metadata = {
  title: "Réalisations — Cas clients",
  description:
    "Découvrez nos études de cas : automatisations, IA, formations et transformations digitales.",
};

export default async function RealisationsPage() {
  const caseStudies = await getCaseStudiesWithFallback();

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 pb-16 bg-surface-0 surface-grid">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
                Réalisations <span className="metal-text">Premium</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-3xl">
                Projets concrets, gains mesurables et solutions sur-mesure.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudies.map((caseStudy, i) => (
                <ScrollReveal key={caseStudy.id} delay={i * 80}>
                  <Card variant="service" className="h-full flex flex-col">
                    <CardTitle>{caseStudy.title}</CardTitle>
                    <CardDescription className="mb-4">
                      {stripHtml(caseStudy.problem || "")}
                    </CardDescription>
                    <div className="mt-auto">
                      <Link
                        href={`/realisations/${caseStudy.slug}`}
                        className="text-xs font-heading uppercase tracking-wider text-metal hover:text-metal-hover transition-colors"
                      >
                        Voir le cas →
                      </Link>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
            {caseStudies.length === 0 && (
              <p className="text-text-muted text-sm text-center mt-8">
                Aucune realisation disponible pour le moment.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
