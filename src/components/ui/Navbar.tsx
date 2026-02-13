"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { SERVICE_MENU_ITEMS, buildAuditHref } from "@/lib/hub-data";

const MAIN_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/formations", label: "Formations" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/boutique", label: "Boutique" },
  { href: "/a-propos", label: "À propos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "bg-bg-primary/80 backdrop-blur-xl border-b border-border-default shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent",
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      <div
        className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 transition-[height] duration-300",
          scrolled ? "h-16" : "h-18 md:h-20",
        )}
      >
        <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-brand/30 bg-bg-secondary shadow-[0_0_20px_rgba(249,115,22,0.15)]">
            <Image src="/images/brand/addict-mark-96.png" alt="Addict" fill className="object-cover" sizes="36px" priority />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading font-bold text-sm tracking-wider text-text-primary uppercase">Addict</span>
            <span className="font-accent text-[0.55rem] tracking-[0.2em] uppercase text-text-muted">AI Technology</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-border-default bg-bg-secondary/60 backdrop-blur-xl px-2 py-1.5">
          {MAIN_LINKS.slice(0, 1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                isActive(link.href) ? "bg-brand/15 text-brand-light" : "text-text-secondary hover:text-text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button
              type="button"
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer",
                isActive("/services") || servicesOpen ? "bg-brand/15 text-brand-light" : "text-text-secondary hover:text-text-primary",
              )}
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
            </button>
            <div
              className={cn(
                "absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 w-72 rounded-xl",
                "border border-border-default bg-bg-secondary/95 backdrop-blur-xl",
                "shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-2 transition-all duration-200",
                servicesOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1",
              )}
              role="menu"
            >
              {SERVICE_MENU_ITEMS.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  onClick={() => setServicesOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-px bg-border-default my-1" />
              <Link
                href="/services"
                onClick={() => setServicesOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-brand-light hover:bg-brand-muted transition-colors"
              >
                Tous les services
              </Link>
            </div>
          </div>

          {MAIN_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                isActive(link.href) ? "bg-brand/15 text-brand-light" : "text-text-secondary hover:text-text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="primary" size="sm" href={buildAuditHref("general")}>Demander un audit</Button>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 rounded-lg border border-border-default bg-bg-secondary/60 text-text-primary cursor-pointer"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        aria-hidden={!mobileOpen}
        className={cn(
          "lg:hidden fixed inset-0 z-40 transition-opacity duration-200",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="absolute inset-0 bg-bg-primary/95 backdrop-blur-2xl" onClick={() => setMobileOpen(false)} />
        <div className="relative px-4 pt-20 pb-6 h-full overflow-y-auto">
          <div className="rounded-xl border border-border-default bg-bg-secondary/80 p-4 space-y-1">
            {MAIN_LINKS.slice(0, 1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive(link.href) ? "bg-brand/15 text-brand-light" : "text-text-secondary hover:bg-white/5",
                )}
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setServicesMobileOpen((v) => !v)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                isActive("/services") ? "bg-brand/15 text-brand-light" : "text-text-secondary hover:bg-white/5",
              )}
              aria-expanded={servicesMobileOpen}
            >
              Services
            </button>
            {servicesMobileOpen && (
              <div className="ml-2 rounded-lg border border-border-default bg-bg-primary/50 p-2 space-y-0.5">
                {SERVICE_MENU_ITEMS.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/services/${item.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-white/5"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/services"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm text-brand-light hover:bg-brand-muted"
                >
                  Tous les services
                </Link>
              </div>
            )}

            {MAIN_LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive(link.href) ? "bg-brand/15 text-brand-light" : "text-text-secondary hover:bg-white/5",
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4">
              <Button variant="primary" size="md" href={buildAuditHref("general")} className="w-full" onClick={() => setMobileOpen(false)}>
                Demander un audit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
