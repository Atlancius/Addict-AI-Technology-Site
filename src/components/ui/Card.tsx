import { type ReactNode } from "react";

type CardVariant = "service" | "bento" | "pricing" | "caseStudy" | "repair";

interface CardProps {
  variant?: CardVariant;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  service:
    "panel hover:border-ember/55 hover:bg-[linear-gradient(170deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.04)_36%,rgba(0,0,0,0.36)_100%),rgba(74,68,66,0.9)]",
  bento:
    "panel hover:border-copper/55 hover:shadow-[0_20px_52px_rgba(122,50,51,0.24)]",
  pricing:
    "panel hover:border-copper/60 hover:shadow-[0_20px_55px_rgba(122,50,51,0.26)]",
  caseStudy:
    "panel hover:border-copper/65 hover:shadow-[0_22px_58px_rgba(122,50,51,0.28)]",
  repair:
    "panel hover:border-ember/55 hover:shadow-[0_18px_48px_rgba(91,36,39,0.3)]",
};

export default function Card({
  variant = "service",
  className = "",
  children,
}: CardProps) {
  return (
    <div className={`rounded-2xl p-7 md:p-8 card-sheen transition-all duration-300 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

export function CardIcon({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`text-3xl text-copper mb-4 group-hover:text-copper-400 transition-colors duration-300 ${className}`}>
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
  return <p className={`text-text-secondary text-sm leading-relaxed ${className}`}>{children}</p>;
}
