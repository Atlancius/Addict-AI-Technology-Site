import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Card, { CardTitle, CardDescription } from "@/components/ui/Card";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import { getServicesWithFallback } from "@/lib/content";
import { stripHtml } from "@/lib/text";

export const metadata: Metadata = {
  title: "Formations — No-code, IA & Automatisation",
  description:
    "Formations pratiques pour monter en compétence sur le no-code, l'IA et l'automatisation.",
};

export default async function FormationsPage() {
  const services = await getServicesWithFallback();
  const trainings = services.filter((service) => service.category === "Training");

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 pb-16 bg-surface-0">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
                Formations
              </h1>
              <p className="text-text-secondary text-lg max-w-3xl">
                Des parcours concrets pour rendre vos equipes autonomes sur le no-code et l'IA.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(trainings.length > 0 ? trainings : services).map((service, i) => (
                <ScrollReveal key={service.id} delay={i * 80}>
                  <Card variant="service" className="h-full flex flex-col">
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription className="mb-6">
                      {service.summary || stripHtml(service.description || "")}
                    </CardDescription>
                    <Button
                      variant="metal"
                      size="sm"
                      href={service.cta_link || "/pro#contact-pro"}
                    >
                      {service.cta_label || "Demander un programme"}
                    </Button>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
