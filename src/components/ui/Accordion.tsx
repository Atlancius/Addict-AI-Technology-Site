"use client";

import { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className = "" }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`faq_component ${className}`}>
      {items.map((item, index) => (
        <AccordionRow
          key={index}
          index={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}

function AccordionRow({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const buttonId = `accordion-button-${index}`;
  const panelId = `accordion-panel-${index}`;

  return (
    <div className="faq_item">
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        className="faq_question cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span>{question}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="faq_answer">{answer}</p>
      </div>
    </div>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-text-muted transition-transform duration-300 flex-shrink-0 ${
        isOpen ? "rotate-180 text-copper-400" : ""
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
