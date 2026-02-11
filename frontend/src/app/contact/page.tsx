import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import LocationMap from "@/components/sections/LocationMap";
import MobileB2BBar from "@/components/sections/MobileB2BBar";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import LeadB2CForm from "@/components/forms/LeadB2CForm";
import LeadB2BForm from "@/components/forms/LeadB2BForm";
import { getLocationWithFallback } from "@/lib/content";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Addict AI Technology à Folelli, Corse. Réparation, devis, projet digital — on vous répond rapidement.",
  alternates: {
    canonical: canonicalFor("/contact"),
  },
  openGraph: {
    title: "Contact — Addict AI Technology",
    description:
      "Contactez Addict AI Technology à Folelli, Corse. Réparation, devis, projet digital — on vous répond rapidement.",
    url: canonicalFor("/contact"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Addict AI Technology",
    description:
      "Contactez Addict AI Technology à Folelli, Corse. Réparation, devis, projet digital — on vous répond rapidement.",
  },
};

export default async function ContactPage() {
  const location = await getLocationWithFallback();
  const phone = location.phone || "+33000000000";
  const phoneHref = phone.replace(/\s+/g, "");
  const mapQuery =
    location.geo_lat && location.geo_lng
      ? `${location.geo_lat},${location.geo_lng}`
      : "42.4474697,9.5067658";
  const mapHref =
    location.google_maps_url || `https://www.google.com/maps?q=${mapQuery}`;

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 pb-16 surface-grid">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
                <span className="metal-text">Contact</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl mb-12">
                Une question, un devis, un projet ? Contactez-nous par le moyen
                qui vous convient.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <ScrollReveal>
                <div className="panel rounded-2xl p-6 text-center space-y-3">
                  <div className="inline-flex justify-center text-flame">
                    <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                      <path d="M6 3h4l1 5-2.5 1.8a16 16 0 0 0 5.7 5.7L16 13l5 1v4l-2.2 2A18 18 0 0 1 4 5.2L6 3Z" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-semibold text-text-primary">
                    Téléphone
                  </h3>
                  <p className="text-text-muted text-sm">
                    Appelez-nous pendant les heures d&apos;ouverture.
                  </p>
                  <Button variant="flame" size="sm" href={`tel:${phoneHref}`}>
                    Appeler
                  </Button>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="panel rounded-2xl p-6 text-center space-y-3">
                  <div className="inline-flex justify-center text-metal">
                    <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m4 7 8 6 8-6" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-semibold text-text-primary">
                    Email
                  </h3>
                  <p className="text-text-muted text-sm">
                    Réponse sous 24h ouvrées.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    href={`mailto:${location.email || "contact@addictai.tech"}`}
                  >
                    Écrire
                  </Button>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="panel rounded-2xl p-6 text-center space-y-3">
                  <div className="inline-flex justify-center text-text-primary">
                    <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-semibold text-text-primary">
                    Sur place
                  </h3>
                  <p className="text-text-muted text-sm">
                    {location.address_line1}, {location.postal_code} {location.city}.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    href={mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Itinéraire
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            <section id="contact-b2c" className="py-6">
              <ScrollReveal>
                <h2 className="font-heading text-3xl font-bold text-text-primary mb-3">
                  Demande de réparation (B2C)
                </h2>
                <p className="text-text-muted mb-8">
                  Décrivez votre appareil et le problème rencontré. Nous vous recontactons rapidement.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <div className="panel rounded-2xl p-8">
                  <LeadB2CForm />
                </div>
              </ScrollReveal>
            </section>

            <section id="contact-b2b" className="py-14">
              <ScrollReveal>
                <h2 className="font-heading text-3xl font-bold text-text-primary mb-3">
                  Demande de projet digital (B2B)
                </h2>
                <p className="text-text-muted mb-8">
                  Audit, automatisation, IA, formation: précisez vos objectifs pour un cadrage clair.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <div className="panel rounded-2xl p-8">
                  <LeadB2BForm />
                </div>
              </ScrollReveal>
            </section>
          </div>
        </section>

        <LocationMap location={location} />
      </main>
      <MobileB2BBar phone={location.phone} auditHref="#contact-b2b" />
      <Footer />
    </>
  );
}
