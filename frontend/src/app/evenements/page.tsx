import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "Événements — Workshops & Rencontres",
  description:
    "Découvrez nos prochains workshops et événements autour de la tech, de l'IA et du no-code.",
};

export default function EvenementsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 pb-20 bg-surface-0 surface-grid">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <ScrollReveal>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
                Événements <span className="metal-text">Tech</span>
              </h1>
              <p className="text-text-secondary text-lg mb-8">
                Workshops, meetups et sessions pratiques arrivent bientôt.
              </p>
              <div className="glass-panel rounded-sm p-8">
                <p className="text-text-muted mb-6">
                  Restez connectés pour les prochaines dates. Vous pouvez deja nous contacter
                  pour organiser un atelier sur-mesure.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="metal" href="/pro#contact-pro">
                    Proposer un evenement
                  </Button>
                  <Button variant="outline" href="/contact">
                    Nous contacter
                  </Button>
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
