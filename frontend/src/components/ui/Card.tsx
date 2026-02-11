import { type ReactNode } from "react";

type CardVariant = "service" | "bento" | "pricing" | "caseStudy" | "repair";

interface CardProps {
  variant?: CardVariant;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  service:
    "panel hover:border-ember/45 hover:-translate-y-1.5 hover:shadow-[0_1.25rem_3.4rem_rgba(0,0,0,0.42)] transition-all duration-300 group",
  bento:
    "panel hover:border-flame/50 hover:shadow-[0_1.2rem_3.25rem_rgba(255,115,50,0.2)] hover:-translate-y-1.5 transition-all duration-300 group",
  pricing:
    "panel hover:border-metal/55 hover:shadow-[0_1.125rem_3rem_rgba(16,30,49,0.45)] hover:-translate-y-1 transition-all duration-300",
  caseStudy:
    "panel hover:border-metal/55 hover:shadow-[0_1.2rem_3.25rem_rgba(16,30,49,0.48)] hover:-translate-y-1 transition-all duration-300 group",
  repair:
    "panel hover:border-flame/50 hover:shadow-[0_1.2rem_3.25rem_rgba(255,115,50,0.2)] hover:-translate-y-1 transition-all duration-300",
};

export default function Card({
  variant = "service",
  className = "",
  children,
}: CardProps) {
  return (
    <div className={`rounded-2xl p-7 md:p-8 card-sheen ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

// Subcomponents for structured card content
export function CardIcon({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`text-3xl text-text-primary mb-4 group-hover:text-flame transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={`font-heading font-semibold text-xl text-text-primary mb-2 leading-tight ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-text-muted text-sm leading-relaxed ${className}`}>
      {children}
    </p>
  );
}
