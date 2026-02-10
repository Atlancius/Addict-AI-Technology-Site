import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { getServicesWithFallback } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services Pro — Audit, Automatisation, Formation",
  description:
    "Découvrez nos services B2B : audit digital, automatisation, IA, formation et accompagnement sur-mesure.",
};

export default async function ServicesPage() {
  const services = await getServicesWithFallback();

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
                Audit, automatisation, IA, formation — on construit des solutions concretes pour vos equipes.
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
      <Footer />
    </>
  );
}
