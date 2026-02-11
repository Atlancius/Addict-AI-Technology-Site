"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const SESSION_KEY = "addict_preloader_seen";

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const overlay = overlayRef.current;
    const mark = markRef.current;
    if (!overlay || !mark) return;

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

      const tl = gsap.timeline({
        onComplete: () => setVisible(false),
      });

      tl.to(mark, {
        y: -6,
        opacity: 0,
        duration: 0.28,
        ease: "power2.in",
      }).to(
        overlay,
        {
          opacity: 0,
          duration: 0.42,
          ease: "power2.out",
        },
        "-=0.08"
      );
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
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[radial-gradient(circle_at_20%_10%,rgba(93,134,178,0.28),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(255,115,50,0.28),transparent_50%),linear-gradient(180deg,#080d14,#070b11)] flex items-center justify-center"
      aria-live="polite"
      role="status"
      aria-label="Chargement du site"
    >
      <div
        ref={markRef}
        className="relative flex flex-col items-center gap-4 preloader-mark"
      >
        <div className="relative w-20 h-20 rounded-3xl border border-stroke-medium bg-surface-2/85 flex items-center justify-center shadow-[0_0_2rem_rgba(93,134,178,0.35)]">
          <span className="absolute -inset-3 rounded-3xl bg-ember/20 blur-2xl" />
          <span className="relative font-heading font-bold text-4xl metal-text">
            A
          </span>
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
