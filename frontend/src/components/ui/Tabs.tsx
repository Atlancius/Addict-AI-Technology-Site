"use client";

import { useState, type ReactNode } from "react";

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  className?: string;
}

export default function Tabs({ items, className = "" }: TabsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  return (
    <div className={`tabs_component ${className}`}>
      <div className="tabs_menu">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className={`tabs_link ${activeId === item.id ? "is-active" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div>
        {items.map((item) => (
          <div
            key={item.id}
            className={activeId === item.id ? "block" : "hidden"}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
