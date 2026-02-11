import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import MobileB2BBar from "@/components/sections/MobileB2BBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ScrollReveal from "@/components/animations/ScrollReveal";
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
        <section className="pt-28 pb-16 bg-surface-0 surface-grid">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
                Services <span className="metal-text">Pro</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-3xl">
                Audit, automatisation, IA, formation - on construit des solutions concrètes pour vos équipes.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
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
