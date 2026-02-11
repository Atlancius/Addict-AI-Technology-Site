import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import MobileB2BBar from "@/components/sections/MobileB2BBar";
import Card, { CardTitle, CardDescription } from "@/components/ui/Card";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CinematicHero from "@/components/sections/CinematicHero";
import { getCaseStudiesWithFallback, getLocationWithFallback } from "@/lib/content";
import { stripHtml } from "@/lib/text";
import { extractMediaUrl } from "@/lib/media";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Réalisations — Cas clients",
  description:
    "Découvrez nos études de cas : automatisations, IA, formations et transformations digitales.",
  alternates: {
    canonical: canonicalFor("/realisations"),
  },
  openGraph: {
    title: "Réalisations — Cas clients",
    description:
      "Découvrez nos études de cas : automatisations, IA, formations et transformations digitales.",
    url: canonicalFor("/realisations"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Réalisations — Cas clients",
    description:
      "Découvrez nos études de cas : automatisations, IA, formations et transformations digitales.",
  },
};

export default async function RealisationsPage() {
  const caseStudies = await getCaseStudiesWithFallback();
  const location = await getLocationWithFallback();

  return (
    <>
      <Navbar />
      <main>
        <CinematicHero
          eyebrow="Études de cas · B2B"
          title="Réalisations"
          accent="avec impact mesurable."
          description="Explorez des projets livrés de bout en bout: cadrage, déploiement, adoption et résultats opérationnels."
          tone="metal"
          mainImage={{
            src: "/images/stock/data-center.jpg",
            alt: "Vue abstraite d'une infrastructure numérique moderne",
          }}
          sideImage={{
            src: "/images/stock/pro-workspace.jpg",
            alt: "Poste de travail orienté productivité",
          }}
          actions={[
            { label: "Démarrer un projet", href: "/pro#contact-pro", variant: "metal" },
            { label: "Parcourir les services", href: "/services", variant: "outline" },
          ]}
          metrics={[
            { label: "Livrables", value: "Clairs et documentés" },
            { label: "Pilotage", value: "Indicateurs avant/après" },
            { label: "Adoption", value: "Formation + support" },
          ]}
        />

        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy, i) => {
                const coverUrl = extractMediaUrl(caseStudy.cover_image);
                return (
                  <ScrollReveal key={caseStudy.id} delay={i * 80} variant={i % 2 === 0 ? "up" : "zoom"} distance={20}>
                    <Card variant="caseStudy" className="h-full flex flex-col">
                      {coverUrl && (
                        <div className="mb-4 overflow-hidden rounded-xl border border-stroke-subtle">
                          <Image
                            src={coverUrl}
                            alt={caseStudy.title}
                            width={800}
                            height={450}
                            className="w-full h-44 object-cover"
                          />
                        </div>
                      )}
                      <CardTitle>{caseStudy.title}</CardTitle>
                      <CardDescription className="mb-4">
                        {stripHtml(caseStudy.problem || "")}
                      </CardDescription>
                      {caseStudy.results && (
                        <p className="text-text-muted text-sm mb-4">
                          <span className="text-text-secondary font-semibold">Résultat:</span>{" "}
                          {stripHtml(caseStudy.results)}
                        </p>
                      )}
                      <div className="mt-auto">
                        <Link
                          href={`/realisations/${caseStudy.slug}`}
                          className="text-[0.68rem] font-heading uppercase tracking-[0.14em] text-metal hover:text-metal-hover transition-colors"
                        >
                          Voir le cas →
                        </Link>
                      </div>
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>
            {caseStudies.length === 0 && (
              <p className="text-text-muted text-sm text-center mt-8">
                Aucune réalisation disponible pour le moment.
              </p>
            )}
          </div>
        </section>
      </main>
      <MobileB2BBar phone={location.phone} auditHref="/pro#contact-pro" />
      <Footer />
    </>
  );
}
