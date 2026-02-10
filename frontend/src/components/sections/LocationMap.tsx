import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import type { Location } from "@/lib/types";
import { fallbackLocation } from "@/lib/fallback-data";

const DAY_LABELS: Record<string, string> = {
  mon: "Lun",
  tue: "Mar",
  wed: "Mer",
  thu: "Jeu",
  fri: "Ven",
  sat: "Sam",
  sun: "Dim",
};

const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function formatHours(location: Location) {
  const opening = location.opening_hours;
  if (!opening || Object.keys(opening).length === 0) {
    return ["Lun – Ven : 09h – 18h", "Sam : 10h – 16h", "Dim : Fermé"];
  }

  return DAY_ORDER.filter((day) => opening[day]).map((day) => {
    const slots = opening[day];
    const label = DAY_LABELS[day] || day;
    if (!slots || slots.length === 0) return `${label} : Fermé`;
    const ranges = slots
      .map((slot) => `${slot.open} – ${slot.close}`)
      .join(", ");
    return `${label} : ${ranges}`;
  });
}

export default function LocationMap({ location }: { location?: Location }) {
  const data = location ?? fallbackLocation;
  const mapQuery =
    data.geo_lat && data.geo_lng
      ? `${data.geo_lat},${data.geo_lng}`
      : "42.4474697,9.5067658";
  const mapHref =
    data.google_maps_url || `https://www.google.com/maps?q=${mapQuery}`;
  const mapEmbed = `https://www.google.com/maps?q=${mapQuery}&z=17&output=embed`;
  const hours = formatHours(data);

  return (
    <section className="py-24 bg-surface-0 border-t border-stroke-subtle surface-grid">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12">
            <p className="text-xs font-heading uppercase tracking-[0.3em] text-text-muted mb-3">
              Sur place
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-2">
              Retrouvez-nous
            </h2>
            <p className="text-text-muted">
              Visitez notre shop à Folelli, Corse.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-4">
            <ScrollReveal>
              <div className="glass-panel rounded-sm p-6 space-y-4">
                <h3 className="font-heading font-semibold text-sm text-text-primary uppercase tracking-wider">
                  Adresse
                </h3>
                <p className="text-text-muted text-sm">
                  {data.address_line1}
                  <br />
                  {data.postal_code} {data.city}
                  <br />
                  {data.region || "Corse"}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <div className="glass-panel rounded-sm p-6 space-y-4">
                <h3 className="font-heading font-semibold text-sm text-text-primary uppercase tracking-wider">
                  Horaires
                </h3>
                <div className="text-text-muted text-sm space-y-1">
                  {hours.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <div className="glass-panel rounded-sm p-6 space-y-4 border border-ember/20">
                <h3 className="font-heading font-semibold text-sm text-text-primary uppercase tracking-wider">
                  Contact
                </h3>
                <p className="text-text-muted text-sm">
                  <a
                    href={`mailto:${data.email || "contact@addictai.tech"}`}
                    className="hover:text-flame transition-colors"
                  >
                    {data.email || "contact@addictai.tech"}
                  </a>
                </p>
                <div className="flex gap-3">
                  {data.phone && (
                    <Button
                      variant="outline"
                      size="sm"
                      href={`tel:${data.phone.replace(/\\s+/g, "")}`}
                    >
                      Appeler
                    </Button>
                  )}
                  <Button
                    variant="flame"
                    size="sm"
                    href={mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Itinéraire
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="w-full h-80 lg:h-full min-h-80 rounded-sm border border-stroke-subtle overflow-hidden shadow-[0_1.25rem_3.75rem_rgba(0,0,0,0.35)]">
                <iframe
                  src={mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Addict AI Technology – Folelli"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
