"use client";

import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  className?: string;
}

export default function Tabs({ items, className }: TabsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
              activeId === item.id
                ? "bg-brand text-white shadow-[0_0_16px_rgba(249,115,22,0.25)]"
                : "text-text-secondary hover:text-text-primary hover:bg-white/5 border border-border-default",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div>
        {items.map((item) => (
          <div key={item.id} className={activeId === item.id ? "block" : "hidden"}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
