import { type ReactNode } from "react";

type CardVariant = "service" | "bento" | "pricing";

interface CardProps {
  variant?: CardVariant;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  service:
    "bg-gradient-to-b from-surface-2/80 via-surface-1/80 to-surface-0 border border-stroke-subtle hover:border-ember/30 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-all duration-300 group",
  bento:
    "bg-gradient-to-b from-surface-2/80 via-surface-1/80 to-surface-0 border border-stroke-subtle hover:border-flame/40 hover:shadow-[0_0_32px_rgba(255,122,61,0.12)] hover:-translate-y-1 transition-all duration-300 group",
  pricing:
    "bg-gradient-to-b from-surface-2 to-surface-1 border border-stroke-subtle hover:border-metal/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.32)] transition-all duration-300",
};

export default function Card({
  variant = "service",
  className = "",
  children,
}: CardProps) {
  return (
    <div className={`rounded-sm p-6 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

// Subcomponents for structured card content
export function CardIcon({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`text-3xl text-text-primary mb-4 group-hover:text-flame transition-colors ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={`font-heading font-semibold text-lg text-text-primary mb-2 ${className}`}>
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
