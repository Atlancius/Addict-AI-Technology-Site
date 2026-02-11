"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SESSION_KEY = "addict_preloader_seen";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

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
      const minVisible = 520;
      const wait = Math.max(0, minVisible - elapsed);
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
      className={`fixed inset-0 z-[100] bg-[radial-gradient(circle_at_20%_10%,rgba(93,134,178,0.28),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(255,115,50,0.28),transparent_50%),linear-gradient(180deg,#080d14,#070b11)] flex items-center justify-center transition-opacity duration-400 ease-out ${
        closing ? "opacity-0" : "opacity-100"
      }`}
      aria-live="polite"
      role="status"
      aria-label="Chargement du site"
    >
      <div className={`relative flex flex-col items-center gap-4 preloader-mark transition-all duration-300 ease-out ${closing ? "-translate-y-1.5 opacity-0" : "translate-y-0 opacity-100"}`}>
        <div className="relative w-20 h-20 rounded-3xl border border-stroke-medium bg-surface-2/85 overflow-hidden shadow-[0_0_2rem_rgba(93,134,178,0.35)]">
          <span className="absolute -inset-3 rounded-3xl bg-ember/20 blur-2xl" />
          <Image
            src="/images/brand/addict-mark-160.png"
            alt="Logo Addict"
            fill
            className="object-cover"
            sizes="80px"
            priority
          />
        </div>
        <p className="text-[0.64rem] font-heading uppercase tracking-[0.2em] text-text-muted">
          Addict AI Technology
        </p>
        <div className="w-40 h-1 rounded-full bg-surface-3/70 overflow-hidden border border-stroke-subtle">
          <span className="block h-full w-1/2 preloader-bar bg-[linear-gradient(90deg,var(--metal)_0%,var(--flame)_100%)]" />
        </div>
      </div>
    </div>
  );
}
