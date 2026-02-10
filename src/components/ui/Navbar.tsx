"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./Button";

const NAV_LINKS = [
  { href: "/addict-2-0", label: "Addict 2.0" },
  { href: "/pro", label: "Pro" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-panel border-b border-stroke-subtle"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-ember to-flame flex items-center justify-center">
            <span className="font-heading font-bold text-white text-lg leading-none">
              A
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm leading-none tracking-tight text-text-primary group-hover:text-white transition-colors uppercase">
              ADDICT
            </span>
            <span className="font-heading font-medium text-[9px] leading-tight tracking-[0.2em] text-flame uppercase">
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
              className="text-xs font-heading font-medium uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors"
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
      {mobileOpen && (
        <div className="md:hidden glass-panel border-t border-stroke-subtle">
          <nav className="flex flex-col px-6 py-6 gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-heading font-medium uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-4 border-t border-stroke-subtle">
              <Button variant="flame" size="sm" href="/addict-2-0" className="flex-1">
                Réparer
              </Button>
              <Button variant="metal" size="sm" href="/pro" className="flex-1">
                Audit
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
