import Link from "next/link";
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "flame"
  | "metal"
  | "outline"
  | "ghost";

type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "btn-sheen bg-[linear-gradient(112deg,var(--ember-900)_0%,var(--ember-700)_48%,var(--ember-500)_100%)] text-white border border-transparent shadow-[0_14px_34px_rgba(63,21,24,0.42)] hover:bg-[linear-gradient(112deg,var(--ember-900)_0%,var(--ember-500)_50%,var(--ember-400)_100%)] hover:shadow-[0_18px_40px_rgba(91,36,39,0.5)] hover:-translate-y-0.5",
  secondary:
    "bg-transparent text-copper border border-copper/60 shadow-[0_12px_28px_rgba(0,0,0,0.28)] hover:text-copper-400 hover:border-copper-400 hover:bg-tint-copper-8 hover:-translate-y-0.5",
  tertiary:
    "bg-transparent text-text-secondary border border-transparent hover:text-text-primary hover:bg-tint-ember-8 hover:border-stroke-subtle",
  flame:
    "btn-sheen bg-[linear-gradient(112deg,var(--ember-900)_0%,var(--ember-700)_48%,var(--ember-500)_100%)] text-white border border-transparent shadow-[0_14px_34px_rgba(63,21,24,0.42)] hover:bg-[linear-gradient(112deg,var(--ember-900)_0%,var(--ember-500)_50%,var(--ember-400)_100%)] hover:shadow-[0_18px_40px_rgba(91,36,39,0.5)] hover:-translate-y-0.5",
  metal:
    "bg-transparent text-copper border border-copper/60 shadow-[0_12px_28px_rgba(0,0,0,0.28)] hover:text-copper-400 hover:border-copper-400 hover:bg-tint-copper-8 hover:-translate-y-0.5",
  outline:
    "bg-transparent text-copper border border-copper/60 shadow-[0_12px_28px_rgba(0,0,0,0.28)] hover:text-copper-400 hover:border-copper-400 hover:bg-tint-copper-8 hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-text-secondary border border-transparent hover:text-text-primary hover:bg-tint-ember-8 hover:border-stroke-subtle hover:underline hover:underline-offset-4",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[0.66rem]",
  md: "px-6 py-3 text-[0.7rem]",
  lg: "px-7 py-3.5 text-[0.74rem]",
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
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = "disabled" in props && props.disabled;
  const classes = [
    "inline-flex items-center justify-center gap-2 relative isolate overflow-hidden",
    "font-heading font-semibold uppercase tracking-[0.14em]",
    "rounded-xl transition-[transform,box-shadow,border-color,background,color] duration-300 cursor-pointer",
    "active:translate-y-0.5",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep focus-visible:shadow-[0_0_18px_rgba(147,69,64,0.28)]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  if ("href" in props && props.href) {
    const { href, children, ...rest } = props as ButtonAsLink;
    const isInternal = href.startsWith("/");

    if (isDisabled) {
      return <span className={`${classes} opacity-50 pointer-events-none`}>{children}</span>;
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
