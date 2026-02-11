"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = "mobile-navigation";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(menu, { opacity: mobileOpen ? 1 : 0 });
      gsap.set(menu.querySelectorAll("[data-menu-item]"), {
        opacity: mobileOpen ? 1 : 0,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      if (mobileOpen) {
        gsap.fromTo(
          menu,
          { opacity: 0 },
          { opacity: 1, duration: 0.28, ease: "power2.out" }
        );
        gsap.fromTo(
          menu.querySelectorAll("[data-menu-item]"),
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.07,
            ease: "power3.out",
          }
        );
      } else {
        gsap.to(menu.querySelectorAll("[data-menu-item]"), {
          opacity: 0,
          y: 10,
          duration: 0.2,
          stagger: { each: 0.03, from: "end" },
          ease: "power2.in",
        });
        gsap.to(menu, {
          opacity: 0,
          duration: 0.22,
          ease: "power2.in",
        });
      }
    }, menu);

    return () => ctx.revert();
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-panel border-b border-stroke-subtle"
          : "bg-transparent"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-ember/20 blur-2xl opacity-70" />
            <div className="relative w-10 h-10 rounded-sm border border-ember/40 bg-surface-2/70 shadow-[0_0_1.125rem_rgba(230,57,70,0.35)] flex items-center justify-center">
              <span className="font-heading font-bold text-lg leading-none metal-text">
                A
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm leading-none tracking-tight metal-text uppercase">
              ADDICT
            </span>
            <span className="font-heading font-medium text-[0.5625rem] leading-tight tracking-[0.2em] text-text-muted uppercase">
              AI TECHNOLOGY
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-heading font-medium uppercase tracking-wider text-text-muted hover:text-flame transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" href="/addict-2-0">
            Réparer
          </Button>
          <Button variant="metal" size="sm" href="/pro">
            Audit
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-text-primary p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
          aria-controls={menuId}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id={menuId}
        ref={menuRef}
        aria-hidden={!mobileOpen}
        className={`md:hidden fixed inset-0 z-40 glass-panel border-t border-stroke-subtle transition-opacity duration-200 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-surface-0/80 via-surface-1/70 to-surface-0/90" />
        <nav className="relative flex flex-col px-6 pt-28 pb-10 gap-6 h-full">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-menu-item
              className="text-base font-heading font-medium uppercase tracking-wider text-text-secondary hover:text-flame transition-colors py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-6 border-t border-stroke-subtle" data-menu-item>
            <Button
              variant="flame"
              size="md"
              href="/addict-2-0"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              Réparer
            </Button>
            <Button
              variant="metal"
              size="md"
              href="/pro"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              Audit
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
