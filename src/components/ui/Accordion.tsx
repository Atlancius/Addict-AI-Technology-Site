"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("rounded-xl border border-border-default bg-bg-secondary/50 divide-y divide-border-default", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer group"
              aria-expanded={isOpen}
            >
              <span className="font-heading text-base text-text-primary group-hover:text-brand-light transition-colors">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-text-muted shrink-0 transition-transform duration-200",
                  isOpen && "rotate-180 text-brand",
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <p className="px-6 pb-5 text-sm text-text-secondary leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
