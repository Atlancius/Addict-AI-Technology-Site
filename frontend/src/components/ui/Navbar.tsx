"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/addict-2-0", label: "Addict 2.0" },
  { href: "/pro", label: "Pro" },
  { href: "/services", label: "Services" },
  { href: "/reparations", label: "Réparations" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuId = "mobile-navigation";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
    return pathname.startsWith(href);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-surface-0/76 backdrop-blur-xl border-b border-stroke-subtle shadow-[0_0.75rem_2.5rem_rgba(0,0,0,0.35)]"
          : "bg-transparent"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/45 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group" onClick={closeMobile}>
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-ember/25 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-11 h-11 rounded-2xl border border-ember/40 bg-surface-2/80 shadow-[0_0_1.25rem_rgba(239,68,86,0.3)] flex items-center justify-center">
              <span className="font-heading font-bold text-xl leading-none metal-text">
                A
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm leading-none tracking-tight metal-text uppercase">
              ADDICT
            </span>
            <span className="font-heading font-medium text-[0.58rem] leading-tight tracking-[0.2em] text-text-muted uppercase">
              AI TECHNOLOGY
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-stroke-subtle bg-surface-1/45 px-2 py-1.5 backdrop-blur-xl">
          {NAV_LINKS.map((link) => {
            const isActive = isActivePath(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-full text-[0.67rem] font-heading font-medium uppercase tracking-[0.14em] transition-colors ${
                  isActive
                    ? "bg-surface-2/90 text-text-primary border border-stroke-medium"
                    : "text-text-muted hover:text-flame"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" href="/addict-2-0">
            Réparer
          </Button>
          <Button variant="metal" size="sm" href="/pro">
            Audit
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden text-text-primary p-2.5 rounded-xl border border-stroke-subtle bg-surface-2/60"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
          aria-controls={menuId}
        >
          {mobileOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        id={menuId}
        aria-hidden={!mobileOpen}
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-250 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-surface-0/85 backdrop-blur-2xl" onClick={closeMobile} />
        <div className="relative px-5 pt-24 pb-8 h-full">
          <div
            className={`panel h-full p-6 flex flex-col transition-transform duration-300 ${
              mobileOpen ? "translate-y-0" : "translate-y-3"
            }`}
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = isActivePath(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 rounded-xl text-sm font-heading font-medium uppercase tracking-[0.14em] transition-colors ${
                      isActive
                        ? "bg-surface-2/85 border border-stroke-medium text-text-primary"
                        : "bg-surface-2/45 text-text-secondary hover:text-flame"
                    }`}
                    tabIndex={mobileOpen ? 0 : -1}
                    onClick={closeMobile}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto grid gap-3 pt-6">
              <Button
                variant="flame"
                size="md"
                href="/addict-2-0"
                className="w-full"
                tabIndex={mobileOpen ? 0 : -1}
                onClick={closeMobile}
              >
                Réparer maintenant
              </Button>
              <Button
                variant="metal"
                size="md"
                href="/pro"
                className="w-full"
                tabIndex={mobileOpen ? 0 : -1}
                onClick={closeMobile}
              >
                Demander un audit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
