import Link from "next/link";
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type Variant = "flame" | "metal" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  flame:
    "btn-sheen bg-gradient-to-r from-ember-deep via-ember to-flame text-white border border-ember/40 shadow-[0_0_24px_rgba(217,35,35,0.25)] hover:shadow-[0_0_42px_rgba(255,122,61,0.35)] hover:-translate-y-0.5",
  metal:
    "btn-sheen bg-gradient-to-r from-surface-2 to-surface-3 text-metal border border-white/10 hover:text-white hover:border-white/20 hover:shadow-[0_0_24px_rgba(167,176,189,0.25)] hover:-translate-y-0.5",
  outline:
    "bg-transparent text-text-primary border border-stroke-medium hover:bg-surface-2/60 hover:border-flame",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-2",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-4 text-sm",
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
    "inline-flex items-center justify-center gap-2 relative overflow-hidden",
    "font-heading font-semibold uppercase tracking-wider",
    "rounded-sm transition-all duration-300 cursor-pointer",
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
