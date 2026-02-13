import type { Metadata } from "next";
import { Phone, MapPin } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import LeadB2BForm from "@/components/forms/LeadB2BForm";
import { canonicalFor } from "@/lib/seo";
import { getLocationWithFallback } from "@/lib/content";
import { AUDIT_CONTEXT_LABELS, CONTACT_FAQ } from "@/lib/hub-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Formulaire d'audit pro contextuel, coordonnées Addict et accès rapide au pôle boutique/particuliers.",
  alternates: {
    canonical: canonicalFor("/contact"),
  },
  openGraph: {
    title: "Contact",
    description:
      "Formulaire d'audit pro contextuel, coordonnées Addict et accès rapide au pôle boutique/particuliers.",
    url: canonicalFor("/contact"),
  },
};

function mapAuditParamToGoal(value?: string):
  | ""
  | "marketing"
  | "ia"
  | "crm"
  | "transition"
  | "formation"
  | "formation-pro"
  | "formation-particulier"
  | "audit"
  | "other" {
  if (!value) return "";
  if (value === "marketing") return "marketing";
  if (value === "ia") return "ia";
  if (value === "crm") return "crm";
  if (value === "transition") return "transition";
  if (value === "formation" || value === "formation-pro") return "formation";
  if (value === "formation-particulier") return "formation-particulier";
  if (value === "general") return "audit";
  return "";
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ audit?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const location = await getLocationWithFallback();
  const phone = location.phone || "+33 4 95 31 12 90";
  const phoneHref = phone.replace(/\s+/g, "");
  const mapQuery =
    location.geo_lat && location.geo_lng
      ? `${location.geo_lat},${location.geo_lng}`
      : "42.4474697,9.5067658";
  const mapHref = location.google_maps_url || `https://www.google.com/maps?q=${mapQuery}`;

  const auditParam = resolvedSearchParams.audit;
  const defaultGoal = mapAuditParamToGoal(auditParam);
  const contextLabel = auditParam && auditParam in AUDIT_CONTEXT_LABELS
    ? AUDIT_CONTEXT_LABELS[auditParam as keyof typeof AUDIT_CONTEXT_LABELS]
    : null;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/5 via-bg-primary to-bg-secondary/30" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand/8 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Contact</p>
              <h1 className="font-heading text-4xl md:text-5xl text-text-primary leading-tight mb-4">Formulaire audit pro</h1>
              <p className="text-text-secondary text-base md:text-lg max-w-2xl mb-6">
                Décris ton contexte, on répond avec un cadrage concret et un plan de décision.
              </p>
              {contextLabel && (
                <div className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5">
                  <span className="text-xs font-medium text-brand-light">Contexte reçu: {contextLabel}</span>
                </div>
              )}
            </ScrollReveal>
          </div>
        </section>

        {/* Form + Sidebar */}
        <section className="pb-20" id="audit-pro">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <ScrollReveal>
              <div className="rounded-xl border border-border-default bg-bg-secondary/50 p-7 md:p-8">
                <LeadB2BForm defaultGoal={defaultGoal} />
              </div>
            </ScrollReveal>

            <div className="space-y-6">
              <ScrollReveal delay={80}>
                <div className="rounded-xl border border-border-default bg-bg-secondary/50 p-6">
                  <h2 className="font-heading text-2xl text-text-primary mb-4">Coordonnées</h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {location.address_line1}
                    <br />
                    {location.postal_code} {location.city}, {location.region || "Corse"}
                  </p>
                  <p className="text-sm text-text-secondary">Téléphone: {phone}</p>
                  <p className="text-sm text-text-secondary mb-5">Email: {location.email || "contact@addictai.tech"}</p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" size="sm" href={`tel:${phoneHref}`}>
                      <Phone className="w-3.5 h-3.5" /> Appeler
                    </Button>
                    <Button variant="secondary" size="sm" href={mapHref} target="_blank" rel="noopener noreferrer">
                      <MapPin className="w-3.5 h-3.5" /> Itinéraire
                    </Button>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={140}>
                <div className="rounded-xl border border-border-default bg-bg-secondary/50 p-6">
                  <h2 className="font-heading text-2xl text-text-primary mb-3">Bloc boutique</h2>
                  <p className="text-sm text-text-secondary mb-4">
                    Pour réparation, dépannage domicile ou formation particulier, passe par le pôle boutique.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary" size="sm" href="/boutique">Voir la boutique</Button>
                    <Button variant="tertiary" size="sm" href={`tel:${phoneHref}`}>Appel direct</Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-bg-secondary/30 border-t border-border-default">
          <div className="max-w-4xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl text-text-primary mb-8">FAQ courte</h2>
            </ScrollReveal>
            <ScrollReveal>
              <Accordion items={CONTACT_FAQ} />
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
