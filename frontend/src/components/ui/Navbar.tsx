"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { SERVICE_MENU_ITEMS, buildAuditHref } from "@/lib/hub-data";

const MAIN_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/formations", label: "Formations" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/boutique", label: "Boutique / Particuliers" },
  { href: "/a-propos", label: "À propos" },
];

function serviceHref(slug: string) {
  return `/services/${slug}`;
}

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActivePath = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const servicesActive = isActivePath("/services");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-bg-deep/76 border-b border-border-soft backdrop-blur-xl shadow-[0_16px_36px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[4.45rem] md:h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <div className="relative w-10 h-10 rounded-2xl overflow-hidden border border-ember/45 bg-surface-2/80 shadow-[0_0_20px_rgba(147,69,64,0.32)]">
            <Image src="/images/brand/addict-mark-96.png" alt="Addict" fill className="object-cover" sizes="40px" priority />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading font-bold text-sm tracking-[0.03em] text-text-primary uppercase">Addict Hub</span>
            <span className="font-accent text-[0.56rem] tracking-[0.2em] uppercase text-text-muted">Premium Lab</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-border-soft bg-bg-main/45 px-2 py-1.5 backdrop-blur-xl">
          {MAIN_LINKS.slice(0, 1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-2 rounded-full text-[0.67rem] font-accent uppercase tracking-[0.14em] transition-colors ${
                isActivePath(link.href)
                  ? "bg-surface-2/90 text-text-primary border border-border-strong"
                  : "text-text-secondary hover:text-copper"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={`px-3.5 py-2 rounded-full text-[0.67rem] font-accent uppercase tracking-[0.14em] transition-colors border ${
                servicesActive || servicesOpen
                  ? "bg-surface-2/90 text-text-primary border-border-strong"
                  : "border-transparent text-text-secondary hover:text-copper"
              }`}
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              onClick={() => setServicesOpen((value) => !value)}
            >
              Services Pro
            </button>
            <div
              className={`absolute top-[calc(100%+0.65rem)] left-1/2 -translate-x-1/2 w-[22rem] rounded-2xl border border-border-soft bg-bg-main/92 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.34)] p-3 transition-all duration-200 ${
                servicesOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"
              }`}
              role="menu"
            >
              {SERVICE_MENU_ITEMS.map((item) => (
                <Link
                  key={item.slug}
                  href={serviceHref(item.slug)}
                  onClick={() => setServicesOpen(false)}
                  className="block rounded-xl px-3.5 py-3 text-[0.66rem] font-accent uppercase tracking-[0.12em] text-text-secondary hover:text-text-primary hover:bg-surface-2/60"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/services"
                onClick={() => setServicesOpen(false)}
                className="mt-2 block rounded-xl px-3.5 py-3 text-[0.66rem] font-accent uppercase tracking-[0.12em] text-copper hover:text-copper-400 hover:bg-tint-copper-8"
              >
                Vue globale services
              </Link>
            </div>
          </div>

          {MAIN_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-2 rounded-full text-[0.67rem] font-accent uppercase tracking-[0.14em] transition-colors ${
                isActivePath(link.href)
                  ? "bg-surface-2/90 text-text-primary border border-border-strong"
                  : "text-text-secondary hover:text-copper"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="primary" size="sm" href={buildAuditHref("general")}>
            Demander un audit
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden p-2.5 rounded-xl border border-border-soft bg-bg-main/65 text-text-primary"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-hub-navigation"
        >
          {mobileOpen ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-hub-navigation"
        aria-hidden={!mobileOpen}
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-200 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-bg-deep/90 backdrop-blur-2xl" onClick={() => setMobileOpen(false)} />
        <div className="relative px-4 pt-[5.35rem] pb-6 h-full">
          <div
            className={`panel h-full p-5 flex flex-col gap-2 transition-transform duration-300 ${
              mobileOpen ? "translate-y-0" : "translate-y-2"
            }`}
          >
            {MAIN_LINKS.slice(0, 1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3.5 rounded-xl text-[0.8rem] font-accent uppercase tracking-[0.12em] ${
                  isActivePath(link.href)
                    ? "bg-surface-2/90 text-text-primary border border-border-strong"
                    : "text-text-secondary bg-surface-2/55"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setServicesMobileOpen((value) => !value)}
              className={`px-4 py-3.5 rounded-xl text-[0.8rem] font-accent uppercase tracking-[0.12em] text-left ${
                servicesActive
                  ? "bg-surface-2/90 text-text-primary border border-border-strong"
                  : "text-text-secondary bg-surface-2/55"
              }`}
              aria-expanded={servicesMobileOpen}
            >
              Services Pro
            </button>
            {servicesMobileOpen && (
              <div className="ml-2 mr-1 rounded-xl border border-border-soft bg-bg-main/65 p-2 space-y-1">
                {SERVICE_MENU_ITEMS.map((item) => (
                  <Link
                    key={item.slug}
                    href={serviceHref(item.slug)}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-[0.7rem] font-accent uppercase tracking-[0.11em] text-text-secondary hover:text-text-primary hover:bg-surface-2/70"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/services"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-[0.7rem] font-accent uppercase tracking-[0.11em] text-copper hover:text-copper-400"
                >
                  Vue globale services
                </Link>
              </div>
            )}

            {MAIN_LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3.5 rounded-xl text-[0.8rem] font-accent uppercase tracking-[0.12em] ${
                  isActivePath(link.href)
                    ? "bg-surface-2/90 text-text-primary border border-border-strong"
                    : "text-text-secondary bg-surface-2/55"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-auto pt-5">
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
