"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealVariant = "up" | "down" | "left" | "right" | "zoom" | "soft";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  duration?: number;
  distance?: number;
  variant?: RevealVariant;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
  duration = 760,
  distance = 28,
  variant = "up",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
          return;
        }

        if (!once) setVisible(false);
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  const style = {
    transitionDelay: `${Math.max(0, delay)}ms`,
    transitionDuration: `${Math.max(180, duration)}ms`,
    ["--reveal-distance" as string]: `${Math.max(8, distance)}px`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`reveal-base reveal-${variant} ${visible ? "reveal-visible" : "reveal-hidden"} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
