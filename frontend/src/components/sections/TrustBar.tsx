import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MouseTilt from "@/components/animations/MouseTilt";

const TRUST_ITEMS = [
  { label: "Local — Corse", variant: "local" as const },
  { label: "Sur-mesure", variant: "quality" as const },
  { label: "Support réactif", variant: "express" as const },
  { label: "Devis validé avant action", variant: "default" as const },
];

const TOOLS = [
  "Make",
  "Airtable",
  "Notion",
  "OpenAI",
  "Zapier",
  "n8n",
  "Next.js",
  "Strapi",
  "Google Workspace",
  "Slack",
];

const MARQUEE_ITEMS = [...TOOLS, ...TOOLS];

export default function TrustBar() {
  return (
    <section className="py-12 bg-surface-0">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal variant="soft" distance={18}>
          <MouseTilt className="panel rounded-2xl p-8 md:p-9 space-y-7" maxTilt={4.5} scale={1.004}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="eyebrow mb-2">Crédibilité opérationnelle</p>
                <p className="text-sm text-text-secondary max-w-2xl">
                  Une exécution simple côté client: périmètre clair, planning
                  réaliste et suivi transparent à chaque étape.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {TRUST_ITEMS.map((item) => (
                  <Badge key={item.label} variant={item.variant}>
                    {item.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="split-divider" />

            <div className="space-y-3">
              <p className="text-[0.64rem] font-heading uppercase tracking-[0.18em] text-text-muted text-center">
                Stack maîtrisée
              </p>
              <div className="tool-marquee">
                <div className="tool-track">
                  {MARQUEE_ITEMS.map((tool, index) => (
                    <span
                      key={`${tool}-${index}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-stroke-subtle bg-surface-2/55 text-[0.67rem] font-heading uppercase tracking-[0.14em] text-text-secondary"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-metal/80" />
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </MouseTilt>
        </ScrollReveal>
      </div>
    </section>
  );
}
