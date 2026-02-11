import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import MobileB2BBar from "@/components/sections/MobileB2BBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CinematicHero from "@/components/sections/CinematicHero";
import { getLocationWithFallback, getServicesWithFallback } from "@/lib/content";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services Pro — Audit, Automatisation, Formation",
  description:
    "Découvrez nos services B2B : audit digital, automatisation, IA, formation et accompagnement sur-mesure.",
  alternates: {
    canonical: canonicalFor("/services"),
  },
  openGraph: {
    title: "Services Pro — Audit, Automatisation, Formation",
    description:
      "Découvrez nos services B2B : audit digital, automatisation, IA, formation et accompagnement sur-mesure.",
    url: canonicalFor("/services"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Services Pro — Audit, Automatisation, Formation",
    description:
      "Découvrez nos services B2B : audit digital, automatisation, IA, formation et accompagnement sur-mesure.",
  },
};

export default async function ServicesPage() {
  const services = await getServicesWithFallback();
  const location = await getLocationWithFallback();

  return (
    <>
      <Navbar />
      <main>
        <CinematicHero
          eyebrow="Services B2B · Audit & automatisation"
          title="Services"
          accent="pro orientés résultats."
          description="Audit, automatisation, IA et accompagnement: chaque service est pensé pour générer un gain opérationnel concret et mesurable."
          tone="metal"
          mainImage={{
            src: "/images/stock/team-meeting.jpg",
            alt: "Atelier stratégique pour un projet de transformation digitale",
          }}
          sideImage={{
            src: "/images/stock/data-center.jpg",
            alt: "Infrastructure digitale et automatisation",
          }}
          actions={[
            { label: "Parler à un expert", href: "/pro#contact-pro", variant: "metal" },
            { label: "Voir les réalisations", href: "/realisations", variant: "outline" },
          ]}
          metrics={[
            { label: "Méthode", value: "Audit → Roadmap → Déploiement" },
            { label: "Focus", value: "ROI et simplification process" },
            { label: "Accompagnement", value: "Terrain + remote" },
          ]}
        />

        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal variant="up" distance={20}>
              <ServicesGrid items={services} />
            </ScrollReveal>
          </div>
        </section>
      </main>
      <MobileB2BBar phone={location.phone} auditHref="/pro#contact-pro" />
      <Footer />
    </>
  );
}
