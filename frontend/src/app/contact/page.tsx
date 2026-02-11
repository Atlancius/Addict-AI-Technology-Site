import type { Metadata } from "next";
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
  | "formation-pro"
  | "formation-particulier"
  | "audit"
  | "other" {
  if (!value) return "";
  if (value === "marketing") return "marketing";
  if (value === "ia") return "ia";
  if (value === "crm") return "crm";
  if (value === "transition") return "transition";
  if (value === "formation-pro") return "formation-pro";
  if (value === "formation-particulier") return "formation-particulier";
  if (value === "general") return "audit";
  return "";
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: { audit?: string };
}) {
  const location = await getLocationWithFallback();
  const phone = location.phone || "+33 4 95 31 12 90";
  const phoneHref = phone.replace(/\s+/g, "");
  const mapQuery =
    location.geo_lat && location.geo_lng
      ? `${location.geo_lat},${location.geo_lng}`
      : "42.4474697,9.5067658";
  const mapHref = location.google_maps_url || `https://www.google.com/maps?q=${mapQuery}`;

  const auditParam = searchParams.audit;
  const defaultGoal = mapAuditParamToGoal(auditParam);
  const contextLabel = auditParam && auditParam in AUDIT_CONTEXT_LABELS
    ? AUDIT_CONTEXT_LABELS[auditParam as keyof typeof AUDIT_CONTEXT_LABELS]
    : null;

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 pb-16 md:pt-32 md:pb-18 surface-grid relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-deep via-bg-main to-bg-section" />
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="eyebrow mb-3">Contact</p>
              <h1 className="section-title mb-4">Formulaire audit pro</h1>
              <p className="section-lead mb-6">
                Décris ton contexte, on répond avec un cadrage concret et un plan de décision.
              </p>
              {contextLabel && (
                <div className="inline-flex items-center rounded-full border border-copper/45 bg-tint-copper-12 px-3 py-1">
                  <span className="accent-label text-[0.56rem] text-copper-400">Contexte reçu: {contextLabel}</span>
                </div>
              )}
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-20 section-shell" id="audit-pro">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <ScrollReveal>
              <div className="panel rounded-2xl p-7 md:p-8">
                <LeadB2BForm defaultGoal={defaultGoal} />
              </div>
            </ScrollReveal>

            <div className="space-y-6">
              <ScrollReveal delay={80}>
                <div className="panel-soft p-6">
                  <h2 className="font-heading text-2xl text-text-primary mb-4">Coordonnées</h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {location.address_line1}
                    <br />
                    {location.postal_code} {location.city}, {location.region || "Corse"}
                  </p>
                  <p className="text-sm text-text-secondary">Téléphone: {phone}</p>
                  <p className="text-sm text-text-secondary mb-5">Email: {location.email || "contact@addictai.tech"}</p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" size="sm" href={`tel:${phoneHref}`}>Appeler</Button>
                    <Button variant="secondary" size="sm" href={mapHref} target="_blank" rel="noopener noreferrer">
                      Itinéraire
                    </Button>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={140}>
                <div className="panel-soft p-6">
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

        <section className="py-20 section-shell bg-bg-section/55">
          <div className="max-w-4xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="section-title mb-8">FAQ courte</h2>
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
