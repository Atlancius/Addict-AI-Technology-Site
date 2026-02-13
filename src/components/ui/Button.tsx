import Link from "next/link";
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "tertiary" | "ghost" | "flame" | "metal" | "outline";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary: [
    "bg-gradient-to-r from-brand-dark via-brand to-brand-light text-white",
    "shadow-[0_0_24px_rgba(249,115,22,0.25)]",
    "hover:shadow-[0_0_32px_rgba(249,115,22,0.4)] hover:-translate-y-0.5",
    "active:translate-y-0",
  ].join(" "),
  secondary: [
    "bg-transparent text-brand-light border border-brand/30",
    "hover:bg-brand-muted hover:border-brand/50 hover:-translate-y-0.5",
    "active:translate-y-0",
  ].join(" "),
  tertiary: [
    "bg-transparent text-text-secondary border border-transparent",
    "hover:text-text-primary hover:bg-white/5 hover:border-border-default",
  ].join(" "),
  ghost: [
    "bg-transparent text-text-secondary border border-transparent",
    "hover:text-text-primary hover:underline hover:underline-offset-4",
  ].join(" "),
  flame: [
    "bg-gradient-to-r from-brand-dark via-brand to-brand-light text-white",
    "shadow-[0_0_24px_rgba(249,115,22,0.25)]",
    "hover:shadow-[0_0_32px_rgba(249,115,22,0.4)] hover:-translate-y-0.5",
  ].join(" "),
  metal: [
    "bg-transparent text-brand-light border border-brand/30",
    "hover:bg-brand-muted hover:border-brand/50 hover:-translate-y-0.5",
  ].join(" "),
  outline: [
    "bg-transparent text-brand-light border border-brand/30",
    "hover:bg-brand-muted hover:border-brand/50 hover:-translate-y-0.5",
  ].join(" "),
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-sm",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type AsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonProps = AsButton | AsLink;

export default function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  const isDisabled = "disabled" in props && props.disabled;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 relative overflow-hidden",
    "font-heading font-semibold uppercase tracking-widest",
    "rounded-lg transition-all duration-300 cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, children, ...rest } = props as AsLink;
    if (isDisabled) {
      return <span className={cn(classes, "opacity-50 pointer-events-none")}>{children}</span>;
    }
    if (href.startsWith("/")) {
      return <Link href={href} className={classes} {...rest}>{children}</Link>;
    }
    return <a className={classes} href={href} {...rest}>{children}</a>;
  }

  return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
