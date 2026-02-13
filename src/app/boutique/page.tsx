import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, CheckCircle2 } from "lucide-react";
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
        {/* Hero */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/5 via-bg-primary to-bg-secondary/30" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-brand/8 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.06fr_0.94fr] gap-10 items-center">
            <ScrollReveal variant="left" distance={24}>
              <div className="space-y-6">
                <p className="eyebrow">Boutique / Particuliers</p>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight">
                  Service local,
                  <span className="block gradient-text">accompagnement pratique.</span>
                </h1>
                <p className="text-text-secondary text-base md:text-lg max-w-xl">
                  Réparation, dépannage et formations numériques accessibles depuis un seul point de contact à Folelli.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" href={`tel:${phoneHref}`}>
                    <Phone className="w-4 h-4" /> Appeler la boutique
                  </Button>
                  <Button variant="secondary" href={mapHref} target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-4 h-4" /> Itinéraire
                  </Button>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right" delay={100}>
              <div className="rounded-2xl border border-border-default bg-bg-secondary/50 p-4 space-y-3">
                <div className="relative h-52 rounded-xl overflow-hidden">
                  <Image src="/images/stock/repair-workbench.jpg" alt="Atelier réparation" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
                </div>
                <div className="relative h-36 rounded-xl overflow-hidden">
                  <Image src="/images/stock/cafe-cozy.jpg" alt="Ambiance boutique" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Offers */}
        <section className="py-20 border-t border-border-default" id="reparations">
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
                          <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
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

        {/* Practical Info + Map */}
        <section className="py-20 bg-bg-secondary/30 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-8">
            <ScrollReveal variant="left">
              <div className="rounded-xl border border-border-default bg-bg-secondary/50 p-7 space-y-5 h-full">
                <h2 className="font-heading text-3xl text-text-primary">Infos pratiques</h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {location.address_line1}
                  <br />
                  {location.postal_code} {location.city}, {location.region || "Corse"}
                </p>
                <p className="text-text-secondary text-sm">Lun - Ven: 09h00 - 18h00</p>
                <p className="text-text-secondary text-sm">Sam: 10h00 - 16h00</p>
                <p className="text-text-secondary text-sm">Dim: Fermé</p>
                <div className="h-px bg-border-default" />
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" href={`tel:${phoneHref}`}>Appeler</Button>
                  <Button variant="secondary" href={mapHref} target="_blank" rel="noopener noreferrer">
                    Itinéraire
                  </Button>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right" delay={90}>
              <div className="rounded-xl border border-border-default overflow-hidden h-[24rem] md:h-[30rem]">
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
