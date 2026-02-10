import { type ReactNode } from "react";

type BadgeVariant = "local" | "express" | "quality" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  local:
    "bg-metal/15 text-metal border-metal/40",
  express:
    "bg-flame/15 text-flame border-flame/40",
  quality:
    "bg-ember/15 text-ember border-ember/40",
  default:
    "bg-surface-2 text-text-secondary border-stroke-subtle",
};

export default function Badge({
  variant = "default",
  className = "",
  children,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-heading font-medium uppercase tracking-wider border rounded-sm ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
