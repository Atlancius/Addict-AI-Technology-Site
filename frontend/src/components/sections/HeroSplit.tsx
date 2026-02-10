"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "@/components/ui/Button";

export default function HeroSplit() {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const pivotRef = useRef<HTMLDivElement>(null);
  const centerCopyRef = useRef<HTMLDivElement>(null);
  const leftCtasRef = useRef<HTMLDivElement>(null);
  const rightCtasRef = useRef<HTMLDivElement>(null);
  const leftGlowRef = useRef<HTMLDivElement>(null);
  const rightGlowRef = useRef<HTMLDivElement>(null);
  const pivotGlowFlameRef = useRef<HTMLDivElement>(null);
  const pivotGlowMetalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(
          [leftRef.current, rightRef.current, pivotRef.current, centerCopyRef.current],
          { opacity: 1, x: 0, y: 0, scale: 1 }
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        leftRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.9 },
        0
      )
        .fromTo(
          rightRef.current,
          { opacity: 0, x: 16 },
          { opacity: 1, x: 0, duration: 0.9 },
          0.1
        )
        .fromTo(
          pivotRef.current,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.8 },
          0.2
        )
        .fromTo(
          centerCopyRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.3
        );

      if (leftCtasRef.current) {
        tl.fromTo(
          leftCtasRef.current.children,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.12 },
          0.45
        );
      }

      if (rightCtasRef.current) {
        tl.fromTo(
          rightCtasRef.current.children,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.12 },
          0.5
        );
      }
    }, root);

    if (prefersReduced) return () => ctx.revert();

    const leftPanel = leftRef.current;
    const rightPanel = rightRef.current;

    const handleHoverIn = (side: "left" | "right") => {
      const glow = side === "left" ? leftGlowRef.current : rightGlowRef.current;
      const ctas = side === "left" ? leftCtasRef.current : rightCtasRef.current;
      const pivotGlow =
        side === "left" ? pivotGlowFlameRef.current : pivotGlowMetalRef.current;

      if (glow) {
        gsap.to(glow, { opacity: 1, duration: 0.35, ease: "power2.out" });
      }
      if (ctas) {
        gsap.to(ctas, { scale: 1.02, duration: 0.35, ease: "power2.out" });
      }
      if (pivotGlow) {
        gsap.to(pivotGlow, { opacity: 0.9, duration: 0.35, ease: "power2.out" });
      }
    };

    const handleHoverOut = (side: "left" | "right") => {
      const glow = side === "left" ? leftGlowRef.current : rightGlowRef.current;
      const ctas = side === "left" ? leftCtasRef.current : rightCtasRef.current;
      const pivotGlow =
        side === "left" ? pivotGlowFlameRef.current : pivotGlowMetalRef.current;

      if (glow) {
        gsap.to(glow, { opacity: 0, duration: 0.35, ease: "power2.out" });
      }
      if (ctas) {
        gsap.to(ctas, { scale: 1, duration: 0.35, ease: "power2.out" });
      }
      if (pivotGlow) {
        gsap.to(pivotGlow, { opacity: 0, duration: 0.35, ease: "power2.out" });
      }
    };

    const onLeftEnter = () => handleHoverIn("left");
    const onLeftLeave = () => handleHoverOut("left");
    const onRightEnter = () => handleHoverIn("right");
    const onRightLeave = () => handleHoverOut("right");

    leftPanel?.addEventListener("mouseenter", onLeftEnter);
    leftPanel?.addEventListener("mouseleave", onLeftLeave);
    leftPanel?.addEventListener("focusin", onLeftEnter);
    leftPanel?.addEventListener("focusout", onLeftLeave);

    rightPanel?.addEventListener("mouseenter", onRightEnter);
    rightPanel?.addEventListener("mouseleave", onRightLeave);
    rightPanel?.addEventListener("focusin", onRightEnter);
    rightPanel?.addEventListener("focusout", onRightLeave);

    return () => {
      leftPanel?.removeEventListener("mouseenter", onLeftEnter);
      leftPanel?.removeEventListener("mouseleave", onLeftLeave);
      leftPanel?.removeEventListener("focusin", onLeftEnter);
      leftPanel?.removeEventListener("focusout", onLeftLeave);

      rightPanel?.removeEventListener("mouseenter", onRightEnter);
      rightPanel?.removeEventListener("mouseleave", onRightLeave);
      rightPanel?.removeEventListener("focusin", onRightEnter);
      rightPanel?.removeEventListener("focusout", onRightLeave);

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="min-h-screen flex items-center relative overflow-hidden pt-24 surface-grid"
    >
      {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-0 to-surface-1" />
          <div className="absolute -top-32 -left-40 w-[45rem] h-[45rem] bg-metal/20 rounded-full blur-[8.75rem] aurora" />
          <div className="absolute top-0 -right-40 w-[45rem] h-[45rem] bg-flame/20 rounded-full blur-[10rem] aurora" />
          <div className="absolute bottom-[-20%] left-[20%] w-[50rem] h-[50rem] bg-ember/20 rounded-full blur-[12.5rem] aurora" />
        </div>

      <div className="max-w-7xl mx-auto px-6 w-full py-16 relative">
        {/* Central pivot logo */}
        <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
          <div
            ref={pivotRef}
            className="relative w-24 h-24 rounded-md border border-stroke-medium bg-surface-2/70 backdrop-blur flex items-center justify-center shadow-[0_0_2.5rem_rgba(65,90,119,0.2)]"
          >
            <span
              ref={pivotGlowFlameRef}
              className="absolute inset-0 rounded-md bg-[radial-gradient(circle_at_50%_40%,rgba(255,90,31,0.45),transparent_65%)] opacity-0 pointer-events-none"
            />
            <span
              ref={pivotGlowMetalRef}
              className="absolute inset-0 rounded-md bg-[radial-gradient(circle_at_50%_40%,rgba(65,90,119,0.45),transparent_65%)] opacity-0 pointer-events-none"
            />
            <span className="font-heading font-bold text-3xl metal-text">A</span>
          </div>
        </div>

        <div className="hidden lg:block absolute -top-10 right-10 pointer-events-none">
          <div className="sigil flex items-center justify-center">
            <span className="relative z-10 font-heading font-bold text-4xl metal-text">A</span>
            <span className="pulse-glow" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          {/* B2C — Left panel */}
          <div
            ref={leftRef}
            className="hero-panel-left relative space-y-6 lg:pr-6 relief-panel card-sheen rounded-md p-8 lg:p-10 backdrop-blur"
          >
            <div
              ref={leftGlowRef}
              className="absolute inset-0 opacity-0 pointer-events-none"
            >
              <div className="absolute -inset-10 bg-[radial-gradient(circle_at_30%_0%,rgba(255,90,31,0.35),transparent_60%)] blur-3xl" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-flame bg-surface-3/60">
              <span className="text-[0.625rem] font-heading font-medium tracking-[0.2em] text-flame uppercase">
                Réparation &bull; Boutique &bull; Café Manga
              </span>
            </div>

            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
              Votre QG Tech
              <br />
              <span className="ember-text">à Folelli</span>
            </h2>

            <p className="text-text-secondary text-base leading-relaxed max-w-md">
              Réparation rapide, boutique high-tech et espace café manga.
              Le spot local pour les passionnés.
            </p>

            <div ref={leftCtasRef} className="flex flex-wrap gap-3 pt-2">
              <Button variant="flame" size="lg" href="/addict-2-0">
                Entrer au QG
              </Button>
              <Button variant="outline" size="lg" href="/addict-2-0#tarifs">
                Demander une réparation
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 text-center">
              {[
                { label: "Diagnostic", value: "Gratuit" },
                { label: "Garantie", value: "6 mois" },
                { label: "Délai", value: "Express" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-sm border border-stroke-subtle bg-surface-3/60 px-3 py-2"
                >
                  <p className="text-[0.625rem] uppercase tracking-wider text-text-muted font-heading">
                    {item.label}
                  </p>
                  <p className="text-sm font-heading text-text-primary">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* B2B — Right panel */}
          <div
            ref={rightRef}
            className="hero-panel-right relative space-y-6 lg:pl-6 relief-panel card-sheen rounded-md p-8 lg:p-10 backdrop-blur"
          >
            <div
              ref={rightGlowRef}
              className="absolute inset-0 opacity-0 pointer-events-none"
            >
              <div className="absolute -inset-10 bg-[radial-gradient(circle_at_70%_0%,rgba(65,90,119,0.35),transparent_60%)] blur-3xl" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-metal bg-surface-3/60">
              <span className="text-[0.625rem] font-heading font-medium tracking-[0.2em] text-metal uppercase">
                Automatisation &bull; IA &bull; Formation
              </span>
            </div>

            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
              Solutions Pros
              <br />
              <span className="metal-text">sur-mesure</span>
            </h2>

            <p className="text-text-secondary text-base leading-relaxed max-w-md">
              Accompagnement digital, automatisation IA et formation pour
              transformer vos process métier.
            </p>

            <div ref={rightCtasRef} className="flex flex-wrap gap-3 pt-2">
              <Button variant="metal" size="lg" href="/pro">
                Solutions pros
              </Button>
              <Button variant="outline" size="lg" href="/pro#audit">
                Demander un audit
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 text-center">
              {[
                { label: "Roadmap", value: "90 jours" },
                { label: "ROI", value: "Mesuré" },
                { label: "Support", value: "Continu" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-sm border border-stroke-subtle bg-surface-3/60 px-3 py-2"
                >
                  <p className="text-[0.625rem] uppercase tracking-wider text-text-muted font-heading">
                    {item.label}
                  </p>
                  <p className="text-sm font-heading text-text-primary">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Central info */}
        <div ref={centerCopyRef} className="text-center mt-14 space-y-3 hero-center-copy">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
            Deux univers.{" "}
            <span className="ember-text">Une seule adresse.</span>
          </h1>
          <p className="text-text-muted text-sm font-heading tracking-wider uppercase">
            20213 Folelli – Corse
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-heading uppercase tracking-wider text-text-muted">
            <span className="px-3 py-1 rounded-sm border border-stroke-subtle bg-surface-2/60">
              Diagnostic gratuit
            </span>
            <span className="px-3 py-1 rounded-sm border border-stroke-subtle bg-surface-2/60">
              Garantie 6 mois
            </span>
            <span className="px-3 py-1 rounded-sm border border-stroke-subtle bg-surface-2/60">
              Local &amp; humain
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
