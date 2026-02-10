import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import LocationMap from "@/components/sections/LocationMap";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { getLocationWithFallback } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Addict AI Technology à Folelli, Corse. Réparation, devis, projet digital — on vous répond rapidement.",
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
        <section className="pt-28 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
                Contact
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl mb-12">
                Une question, un devis, un projet ? Contactez-nous par le moyen
                qui vous convient.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <ScrollReveal>
                <div className="glass-panel rounded-sm p-6 text-center space-y-3">
                  <div className="text-3xl">📞</div>
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
                <div className="glass-panel rounded-sm p-6 text-center space-y-3">
                  <div className="text-3xl">✉️</div>
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
                <div className="glass-panel rounded-sm p-6 text-center space-y-3">
                  <div className="text-3xl">📍</div>
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
          </div>
        </section>

        <LocationMap location={location} />
      </main>
      <Footer />
    </>
  );
}
