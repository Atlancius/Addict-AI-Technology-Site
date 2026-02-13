import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "service" | "bento" | "pricing" | "caseStudy" | "repair" | "default";

const variantStyles: Record<CardVariant, string> = {
  default: "border-border-default hover:border-border-hover",
  service: "border-border-default hover:border-brand/30 hover:shadow-[0_0_40px_rgba(249,115,22,0.08)]",
  bento: "border-border-default hover:border-accent/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.08)]",
  pricing: "border-brand/20 hover:border-brand/40 hover:shadow-[0_0_40px_rgba(249,115,22,0.12)]",
  caseStudy: "border-border-default hover:border-brand/25 hover:shadow-[0_0_40px_rgba(249,115,22,0.06)]",
  repair: "border-border-default hover:border-brand/30",
};

interface CardProps {
  variant?: CardVariant;
  className?: string;
  children: ReactNode;
}

export default function Card({ variant = "default", className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6 md:p-7 border bg-bg-secondary/60 backdrop-blur-sm",
        "transition-all duration-300 hover:-translate-y-1",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardIcon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("text-2xl text-brand mb-4 transition-colors duration-300", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn("font-heading font-semibold text-xl text-text-primary mb-2 leading-tight", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-text-secondary text-sm leading-relaxed", className)}>
      {children}
    </p>
  );
}
