"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SESSION_KEY = "addict_preloader_seen";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";

    if (alreadySeen) {
      requestAnimationFrame(() => setVisible(false));
      return;
    }

    const startedAt = performance.now();
    let closed = false;

    const close = () => {
      if (closed) return;
      closed = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      if (reduceMotion) {
        setVisible(false);
        return;
      }
      setClosing(true);
      window.setTimeout(() => setVisible(false), 420);
    };

    const closeWhenReady = () => {
      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, 520 - elapsed);
      window.setTimeout(close, wait);
    };

    if (document.readyState === "complete") {
      closeWhenReady();
    } else {
      window.addEventListener("load", closeWhenReady, { once: true });
    }

    const hardTimeout = window.setTimeout(closeWhenReady, 1800);
    return () => {
      window.removeEventListener("load", closeWhenReady);
      window.clearTimeout(hardTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-bg-primary flex items-center justify-center transition-opacity duration-400 ease-out ${
        closing ? "opacity-0" : "opacity-100"
      }`}
      aria-live="polite"
      role="status"
      aria-label="Chargement du site"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent/8 rounded-full blur-[100px]" />
      </div>
      <div
        className={`relative flex flex-col items-center gap-4 preloader-mark transition-all duration-300 ease-out ${
          closing ? "-translate-y-2 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="relative w-20 h-20 rounded-2xl border border-border-hover bg-bg-secondary overflow-hidden shadow-[0_0_40px_rgba(249,115,22,0.2)]">
          <span className="absolute -inset-3 rounded-2xl bg-brand/15 blur-2xl" />
          <Image
            src="/images/brand/addict-mark-160.png"
            alt="Logo Addict"
            fill
            className="object-cover"
            sizes="80px"
            priority
          />
        </div>
        <p className="text-xs font-heading uppercase tracking-[0.2em] text-text-muted">
          Addict AI Technology
        </p>
        <div className="w-40 h-1 rounded-full bg-bg-elevated overflow-hidden border border-border-default">
          <span className="block h-full w-1/2 preloader-bar bg-gradient-to-r from-brand-dark to-brand-light" />
        </div>
      </div>
    </div>
  );
}
