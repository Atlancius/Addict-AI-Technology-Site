"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Card, { CardTitle, CardDescription } from "@/components/ui/Card";
import type { Service } from "@/lib/types";
import { stripHtml } from "@/lib/text";

export default function ServicesGrid({ items }: { items: Service[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const categoryLabels: Record<string, string> = {
    all: "Tout",
    Audit: "Audit",
    Automation: "Automatisation",
    Training: "Formation",
    Support: "Support",
    Web: "Web",
    Branding: "Branding",
  };

  const categories = useMemo(() => {
    const set = new Set(items.map((item) => item.category));
    return ["all", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-[0.64rem] font-heading uppercase tracking-[0.14em] rounded-full border transition-colors ${
              activeCategory === category
                ? "bg-surface-3/95 text-metal border-metal/50 shadow-[0_0_1.2rem_rgba(93,134,178,0.3)]"
                : "bg-surface-2/70 text-text-secondary border-stroke-subtle hover:text-text-primary hover:border-stroke-medium"
            }`}
          >
            {categoryLabels[category] || category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((service) => (
          <Card key={service.id} variant="service" className="h-full flex flex-col">
            <CardTitle>{service.title}</CardTitle>
            <CardDescription className="mb-6">
              {service.summary || stripHtml(service.description || "")}
            </CardDescription>
            <div className="mt-auto">
              <Link
                href={`/services/${service.slug}`}
                className="text-[0.68rem] font-heading uppercase tracking-[0.14em] text-metal hover:text-metal-hover transition-colors"
              >
                Voir le service →
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-text-muted text-sm">
          Aucun service pour cette catégorie.
        </div>
      )}
    </div>
  );
}
