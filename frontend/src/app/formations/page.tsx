import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import MobileB2BBar from "@/components/sections/MobileB2BBar";
import Card, { CardTitle, CardDescription } from "@/components/ui/Card";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import CinematicHero from "@/components/sections/CinematicHero";
import { getLocationWithFallback, getTrainingsWithFallback } from "@/lib/content";
import { stripHtml } from "@/lib/text";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Formations — No-code, IA & Automatisation",
  description:
    "Formations pratiques pour monter en compétence sur le no-code, l'IA et l'automatisation.",
  alternates: {
    canonical: canonicalFor("/formations"),
  },
  openGraph: {
    title: "Formations — No-code, IA & Automatisation",
    description:
      "Formations pratiques pour monter en compétence sur le no-code, l'IA et l'automatisation.",
    url: canonicalFor("/formations"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Formations — No-code, IA & Automatisation",
    description:
      "Formations pratiques pour monter en compétence sur le no-code, l'IA et l'automatisation.",
  },
};

export default async function FormationsPage() {
  const trainings = await getTrainingsWithFallback();
  const location = await getLocationWithFallback();

  return (
    <>
      <Navbar />
      <main>
        <CinematicHero
          eyebrow="Formations · IA & no-code"
          title="Formations"
          accent="actionnables pour vos équipes."
          description="Des formats courts et concrets, construits sur vos outils et vos cas d'usage pour passer de la théorie à l'exécution."
          tone="metal"
          mainImage={{
            src: "/images/stock/pro-workspace.jpg",
            alt: "Session de travail et montée en compétences en équipe",
          }}
          sideImage={{
            src: "/images/stock/team-meeting.jpg",
            alt: "Atelier de formation opérationnel",
          }}
          actions={[
            { label: "Réserver une session", href: "/contact#contact-b2b", variant: "metal" },
            { label: "Voir les services", href: "/services", variant: "outline" },
          ]}
          metrics={[
            { label: "Formats", value: "Présentiel + distanciel" },
            { label: "Approche", value: "Cas réels de votre équipe" },
            { label: "Objectif", value: "Autonomie opérationnelle" },
          ]}
        />

        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trainings.map((training, i) => (
                <ScrollReveal key={training.id} delay={i * 80} variant={i % 2 === 0 ? "up" : "zoom"} distance={20}>
                  <Card variant="service" className="h-full flex flex-col">
                    <CardTitle>{training.title}</CardTitle>
                    <CardDescription className="mb-6">
                      {training.summary || stripHtml(training.description || "")}
                    </CardDescription>
                    <div className="text-xs text-text-muted space-y-1 mb-6">
                      <p>Durée : {training.duration || "À définir"}</p>
                      <p>Format : {training.format || "Présentiel / distanciel"}</p>
                    </div>
                    <Button
                      variant="metal"
                      size="sm"
                      href={`/formations/${training.slug}`}
                    >
                      {training.cta_label || "Voir le programme"}
                    </Button>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <MobileB2BBar phone={location.phone} auditHref="/pro#contact-pro" />
      <Footer />
    </>
  );
}
