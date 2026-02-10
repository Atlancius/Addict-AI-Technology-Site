import Link from "next/link";
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type Variant = "flame" | "metal" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  flame:
    "bg-gradient-to-r from-ember to-flame text-white border border-white/10 hover:shadow-[0_0_24px_rgba(255,90,31,0.35)] hover:-translate-y-0.5",
  metal:
    "bg-metal text-white border border-white/10 hover:bg-metal-hover hover:shadow-[0_0_24px_rgba(65,90,119,0.3)] hover:-translate-y-0.5",
  outline:
    "bg-transparent text-text-primary border border-stroke-medium hover:bg-surface-2 hover:border-flame",
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
    "inline-flex items-center justify-center gap-2",
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
