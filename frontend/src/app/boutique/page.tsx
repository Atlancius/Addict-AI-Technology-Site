import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card, { CardDescription, CardTitle } from "@/components/ui/Card";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { canonicalFor } from "@/lib/seo";
import { getLocationWithFallback } from "@/lib/content";
import { BOUTIQUE_OFFERS } from "@/lib/hub-data";

export const metadata: Metadata = {
  title: "Boutique / Particuliers",
  description:
    "Pôle particuliers Addict: réparation, dépannage domicile, formations numériques et infos pratiques boutique.",
  alternates: {
    canonical: canonicalFor("/boutique"),
  },
  openGraph: {
    title: "Boutique / Particuliers",
    description:
      "Pôle particuliers Addict: réparation, dépannage domicile, formations numériques et infos pratiques boutique.",
    url: canonicalFor("/boutique"),
  },
};

export default async function BoutiquePage() {
  const location = await getLocationWithFallback();
  const phone = location.phone || "+33 4 95 31 12 90";
  const phoneHref = phone.replace(/\s+/g, "");
  const mapQuery =
    location.geo_lat && location.geo_lng
      ? `${location.geo_lat},${location.geo_lng}`
      : "42.4474697,9.5067658";
  const mapHref = location.google_maps_url || `https://www.google.com/maps?q=${mapQuery}`;
  const mapEmbed = `https://www.google.com/maps?q=${mapQuery}&z=16&output=embed`;

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 pb-20 md:pt-32 md:pb-24 surface-grid relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-deep via-bg-main to-bg-section" />
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.06fr_0.94fr] gap-10 items-center">
            <ScrollReveal variant="left" distance={24}>
              <div className="space-y-6">
                <p className="eyebrow">Boutique / Particuliers</p>
                <h1 className="section-title">
                  Service local,
                  <span className="block copper-text">accompagnement pratique.</span>
                </h1>
                <p className="section-lead">
                  Réparation, dépannage et formations numériques accessibles depuis un seul point de contact à Folelli.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" href={`tel:${phoneHref}`}>Appeler la boutique</Button>
                  <Button variant="secondary" href={mapHref} target="_blank" rel="noopener noreferrer">
                    Itinéraire
                  </Button>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right" delay={100}>
              <div className="panel rounded-3xl p-5 md:p-6 space-y-4">
                <div className="relative h-52 rounded-2xl overflow-hidden border border-border-soft">
                  <Image src="/images/stock/repair-workbench.jpg" alt="Atelier réparation" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
                </div>
                <div className="relative h-36 rounded-2xl overflow-hidden border border-border-soft">
                  <Image src="/images/stock/cafe-cozy.jpg" alt="Ambiance boutique" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 section-shell" id="reparations">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BOUTIQUE_OFFERS.map((offer, index) => (
                <ScrollReveal key={offer.title} delay={index * 70}>
                  <Card variant="repair" className="h-full">
                    <CardTitle>{offer.title}</CardTitle>
                    <CardDescription className="mb-5">{offer.summary}</CardDescription>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      {offer.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="text-copper mt-0.5">✓</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 section-shell bg-bg-section/55">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-8">
            <ScrollReveal variant="left">
              <div className="panel rounded-2xl p-7 space-y-5 h-full">
                <h2 className="font-heading text-3xl text-text-primary">Infos pratiques</h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {location.address_line1}
                  <br />
                  {location.postal_code} {location.city}, {location.region || "Corse"}
                </p>
                <p className="text-text-secondary text-sm">Lun - Ven: 09h00 - 18h00</p>
                <p className="text-text-secondary text-sm">Sam: 10h00 - 16h00</p>
                <p className="text-text-secondary text-sm">Dim: Fermé</p>
                <div className="split-divider" />
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" href={`tel:${phoneHref}`}>Appeler</Button>
                  <Button variant="secondary" href={mapHref} target="_blank" rel="noopener noreferrer">
                    Itinéraire
                  </Button>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right" delay={90}>
              <div className="panel rounded-2xl overflow-hidden h-[24rem] md:h-[30rem]">
                <iframe
                  src={mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Addict Boutique"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
