import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "brand" | "accent" | "local" | "express" | "quality";

const variantStyles: Record<BadgeVariant, string> = {
  default: "border-border-default text-text-secondary",
  brand: "border-brand/25 bg-brand-muted text-brand-light",
  accent: "border-accent/25 bg-accent-muted text-accent-light",
  local: "border-accent/30 bg-accent-muted text-accent-light",
  express: "border-brand/30 bg-brand-muted text-brand-light",
  quality: "border-brand/30 bg-brand-muted text-brand-light",
};

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

export default function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-[0.65rem] font-heading font-medium uppercase tracking-widest border rounded-full",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
