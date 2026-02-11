import { type ReactNode } from "react";

type BadgeVariant = "local" | "express" | "quality" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  local:
    "bg-metal/18 text-metal border-metal/45 shadow-[0_0_1rem_rgba(93,134,178,0.2)]",
  express:
    "bg-flame/16 text-flame border-flame/45 shadow-[0_0_1rem_rgba(255,115,50,0.2)]",
  quality:
    "bg-ember/16 text-ember border-ember/45 shadow-[0_0_1rem_rgba(239,68,86,0.2)]",
  default:
    "bg-surface-2/80 text-text-secondary border-stroke-subtle",
};

export default function Badge({
  variant = "default",
  className = "",
  children,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[0.65rem] font-heading font-medium uppercase tracking-[0.14em] border rounded-full ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
