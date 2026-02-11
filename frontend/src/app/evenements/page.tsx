import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import MobileB2BBar from "@/components/sections/MobileB2BBar";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { getLocationWithFallback } from "@/lib/content";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Événements — Workshops & Rencontres",
  description:
    "Formats workshop et interventions sur mesure autour de la tech, de l'IA et du no-code.",
  alternates: {
    canonical: canonicalFor("/evenements"),
  },
  openGraph: {
    title: "Événements — Workshops & Rencontres",
    description:
      "Formats workshop et interventions sur mesure autour de la tech, de l'IA et du no-code.",
    url: canonicalFor("/evenements"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Événements — Workshops & Rencontres",
    description:
      "Formats workshop et interventions sur mesure autour de la tech, de l'IA et du no-code.",
  },
};

export default async function EvenementsPage() {
  const location = await getLocationWithFallback();

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
                Workshops, masterclass IA et sessions no-code sur mesure pour équipes et communautés locales.
              </p>
              <div className="panel rounded-2xl p-8 md:p-9 space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Workshop IA Express",
                      desc: "3h pour appliquer l'IA aux tâches concrètes de votre équipe.",
                    },
                    {
                      title: "No-code Ops",
                      desc: "Automatisations rapides et workflows fiables pour gagner du temps.",
                    },
                    {
                      title: "Roadmap Digitale",
                      desc: "Session stratégique pour prioriser vos actions et KPI.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="panel-soft p-5"
                    >
                      <h3 className="font-heading text-sm uppercase tracking-wider text-text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-text-muted text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="metal" href="/pro#contact-pro">
                    Planifier une session
                  </Button>
                  <Button variant="outline" href="/contact">
                    Demander un devis
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <MobileB2BBar phone={location.phone} auditHref="/contact#contact-b2b" />
      <Footer />
    </>
  );
}
