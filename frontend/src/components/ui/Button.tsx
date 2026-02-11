import Link from "next/link";
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type Variant = "flame" | "metal" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  flame:
    "btn-sheen bg-[linear-gradient(115deg,var(--ember-deep)_0%,var(--ember)_45%,var(--flame)_100%)] text-white border border-ember/45 shadow-[0_0.875rem_2.375rem_rgba(239,68,86,0.34)] hover:shadow-[0_1.125rem_2.875rem_rgba(255,115,50,0.42)] hover:-translate-y-0.5",
  metal:
    "btn-sheen bg-[linear-gradient(120deg,rgba(93,134,178,0.25)_0%,rgba(18,27,43,0.92)_58%,rgba(27,37,53,0.95)_100%)] text-text-primary border border-metal/35 shadow-[0_0.875rem_2.2rem_rgba(73,108,145,0.28)] hover:text-text-primary hover:border-metal/60 hover:shadow-[0_1.125rem_2.75rem_rgba(93,134,178,0.35)] hover:-translate-y-0.5",
  outline:
    "bg-surface-1/20 text-text-primary border border-stroke-medium hover:bg-surface-2/70 hover:border-flame/70 hover:text-text-primary hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-text-secondary border border-transparent hover:text-text-primary hover:bg-surface-2/70 hover:border-stroke-subtle",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2.5 text-[0.65rem]",
  md: "px-6 py-3 text-[0.7rem]",
  lg: "px-8 py-4 text-xs",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "flame",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = "disabled" in props && props.disabled;
  const classes = [
    "inline-flex items-center justify-center gap-2 relative isolate overflow-hidden",
    "font-heading font-semibold uppercase tracking-[0.14em]",
    "rounded-full transition-[transform,box-shadow,border-color,background,color] duration-300 cursor-pointer",
    "active:translate-y-0.5",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  if ("href" in props && props.href) {
    const { href, children, ...rest } = props as ButtonAsLink;
    const isInternal = href.startsWith("/");

    if (isDisabled) {
      return (
        <span className={`${classes} opacity-50 pointer-events-none`}>
          {children}
        </span>
      );
    }

    if (isInternal) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }

  return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
