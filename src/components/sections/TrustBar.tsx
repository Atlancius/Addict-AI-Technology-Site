import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/animations/ScrollReveal";

const TRUST_ITEMS = [
  { label: "Local – Corse", variant: "local" as const },
  { label: "Sur-mesure", variant: "quality" as const },
  { label: "Support réactif", variant: "express" as const },
];

const TOOLS = [
  "Make",
  "Airtable",
  "Notion",
  "ChatGPT",
  "Zapier",
  "Webflow",
  "Next.js",
  "Strapi",
];

export default function TrustBar() {
  return (
    <section className="py-12 bg-surface-0">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 glass-panel rounded-md px-6 py-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-3 justify-center">
              {TRUST_ITEMS.map((item) => (
                <Badge key={item.label} variant={item.variant}>
                  {item.label}
                </Badge>
              ))}
              <Badge variant="default">Qualiopi : en cours</Badge>
            </div>

            {/* Tool logos (text-based for now) */}
            <div className="relative overflow-hidden max-w-full">
              <div className="flex flex-wrap items-center gap-6 justify-center">
                {TOOLS.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-heading font-medium text-text-muted/50 uppercase tracking-wider"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
