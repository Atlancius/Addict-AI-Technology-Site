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
      <div className="panel p-4 md:p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="repairs-brand"
            className="block text-[0.65rem] font-heading font-medium uppercase tracking-[0.14em] text-text-secondary mb-1"
          >
            Marque
          </label>
          <div className="input-shell rounded-xl px-3 py-2">
            <select
              id="repairs-brand"
              value={filters.brand}
              onChange={(event) =>
                setFilters((prev) => ({ ...prev, brand: event.target.value }))
              }
              className="w-full bg-transparent text-text-primary text-sm font-body focus:outline-none"
            >
              <option value="all">Toutes</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="repairs-type"
            className="block text-[0.65rem] font-heading font-medium uppercase tracking-[0.14em] text-text-secondary mb-1"
          >
            Type de réparation
          </label>
          <div className="input-shell rounded-xl px-3 py-2">
            <select
              id="repairs-type"
              value={filters.type}
              onChange={(event) =>
                setFilters((prev) => ({ ...prev, type: event.target.value }))
              }
              className="w-full bg-transparent text-text-primary text-sm font-body focus:outline-none"
            >
              <option value="all">Tous</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Input
          label="Modèle"
          id="repair-model"
          placeholder="Ex: iPhone 13"
          value={filters.model}
          onChange={(event) =>
            setFilters((prev) => ({ ...prev, model: event.target.value }))
          }
          className="bg-surface-2/70"
        />
      </div>

      <div className="table-shell overflow-x-auto">
        <table className="min-w-full text-left text-sm" aria-label="Tableau des tarifs de réparation">
          <thead className="sticky top-0 z-10 bg-surface-3/90 backdrop-blur text-text-secondary uppercase text-[0.63rem] font-heading tracking-[0.14em]">
            <tr>
              <th className="px-4 py-3">Marque</th>
              <th className="px-4 py-3">Modèle</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Délai</th>
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
                <tr
                  key={item.id}
                  className="odd:bg-surface-1/35 even:bg-surface-2/30 hover:bg-surface-3/62 transition-colors"
                >
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
                  Aucun résultat pour ces filtres.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
