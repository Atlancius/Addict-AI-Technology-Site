"use client";

import { useMemo, useState } from "react";
import type { Repair } from "@/lib/types";
import { Input } from "@/components/ui/Input";

const currency = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

type Filters = {
  brand: string;
  type: string;
  model: string;
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export default function RepairsTable({ items }: { items: Repair[] }) {
  const [filters, setFilters] = useState<Filters>({
    brand: "all",
    type: "all",
    model: "",
  });

  const brands = useMemo(() => {
    const set = new Set(items.map((item) => item.device_brand));
    return Array.from(set).sort();
  }, [items]);

  const types = useMemo(() => {
    const set = new Set(items.map((item) => item.repair_type));
    return Array.from(set).sort();
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchBrand =
        filters.brand === "all" || item.device_brand === filters.brand;
      const matchType =
        filters.type === "all" || item.repair_type === filters.type;
      const matchModel =
        !filters.model ||
        normalize(item.device_model).includes(normalize(filters.model));
      return matchBrand && matchType && matchModel;
    });
  }, [items, filters]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-heading font-medium uppercase tracking-wider text-text-secondary mb-1">
            Marque
          </label>
          <select
            value={filters.brand}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, brand: event.target.value }))
            }
            className="w-full bg-surface-1 border border-stroke-subtle text-text-primary rounded-sm px-4 py-3 text-sm font-body focus:border-flame focus:ring-1 focus:ring-flame/30 focus:outline-none"
          >
            <option value="all">Toutes</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-heading font-medium uppercase tracking-wider text-text-secondary mb-1">
            Type de reparation
          </label>
          <select
            value={filters.type}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, type: event.target.value }))
            }
            className="w-full bg-surface-1 border border-stroke-subtle text-text-primary rounded-sm px-4 py-3 text-sm font-body focus:border-flame focus:ring-1 focus:ring-flame/30 focus:outline-none"
          >
            <option value="all">Tous</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Modele"
          id="repair-model"
          placeholder="Ex: iPhone 13"
          value={filters.model}
          onChange={(event) =>
            setFilters((prev) => ({ ...prev, model: event.target.value }))
          }
        />
      </div>

      <div className="overflow-x-auto border border-stroke-subtle rounded-sm bg-surface-2/60">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-surface-3 text-text-secondary uppercase text-xs font-heading tracking-wider">
            <tr>
              <th className="px-4 py-3">Marque</th>
              <th className="px-4 py-3">Modele</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Delai</th>
              <th className="px-4 py-3">Garantie</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stroke-subtle">
            {filtered.map((item) => {
              const price =
                typeof item.price_from === "string"
                  ? Number(item.price_from)
                  : item.price_from;
              return (
                <tr key={item.id} className="hover:bg-surface-1/60">
                  <td className="px-4 py-3 text-text-primary">
                    {item.device_brand}
                  </td>
                  <td className="px-4 py-3 text-text-primary">
                    {item.device_model}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {item.repair_type}
                  </td>
                  <td className="px-4 py-3 text-text-primary font-semibold">
                    {Number.isFinite(price) ? currency.format(price) : "Sur devis"}
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {item.duration_text || "Selon stock"}
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {item.warranty_text || "6 mois"}
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-text-muted">
                  Aucun resultat pour ces filtres.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
