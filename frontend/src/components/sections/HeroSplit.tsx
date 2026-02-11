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
        { opacity: 0, x: -22 },
        { opacity: 1, x: 0, duration: 0.85 },
        0
      )
        .fromTo(
          rightRef.current,
          { opacity: 0, x: 22 },
          { opacity: 1, x: 0, duration: 0.85 },
          0.08
        )
        .fromTo(
          pivotRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.7 },
          0.2
        )
        .fromTo(
          centerCopyRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.28
        );

      if (leftCtasRef.current) {
        tl.fromTo(
          leftCtasRef.current.children,
          { opacity: 0, y: 9 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.4
        );
      }

      if (rightCtasRef.current) {
        tl.fromTo(
          rightCtasRef.current.children,
          { opacity: 0, y: 9 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.44
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
        gsap.to(glow, { opacity: 1, duration: 0.32, ease: "power2.out" });
      }
      if (ctas) {
        gsap.to(ctas, { scale: 1.015, duration: 0.32, ease: "power2.out" });
      }
      if (pivotGlow) {
        gsap.to(pivotGlow, { opacity: 0.9, duration: 0.32, ease: "power2.out" });
      }
    };

    const handleHoverOut = (side: "left" | "right") => {
      const glow = side === "left" ? leftGlowRef.current : rightGlowRef.current;
      const ctas = side === "left" ? leftCtasRef.current : rightCtasRef.current;
      const pivotGlow =
        side === "left" ? pivotGlowFlameRef.current : pivotGlowMetalRef.current;

      if (glow) {
        gsap.to(glow, { opacity: 0, duration: 0.32, ease: "power2.out" });
      }
      if (ctas) {
        gsap.to(ctas, { scale: 1, duration: 0.32, ease: "power2.out" });
      }
      if (pivotGlow) {
        gsap.to(pivotGlow, { opacity: 0, duration: 0.32, ease: "power2.out" });
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
      className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-14 surface-grid"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-0 to-surface-1" />
        <div className="ambient-orb -left-44 top-[-14%] w-[40rem] h-[40rem] bg-metal/70 aurora" />
        <div className="ambient-orb -right-44 top-[2%] w-[43rem] h-[43rem] bg-flame/65 aurora" />
        <div className="ambient-orb left-[20%] -bottom-[28%] w-[50rem] h-[50rem] bg-ember/55 aurora" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full py-14 relative">
        <div className="text-center mb-8">
          <div className="hero-pill">
            <span className="h-1.5 w-1.5 rounded-full bg-flame animate-pulse" />
            <span className="text-[0.62rem] font-heading uppercase tracking-[0.18em] text-text-secondary">
              Folelli, Corse · Boutique physique + studio digital
            </span>
          </div>
        </div>

        <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
          <div
            ref={pivotRef}
            className="relative w-24 h-24 rounded-2xl border border-stroke-medium bg-surface-2/75 backdrop-blur-xl flex items-center justify-center shadow-[0_0_2.8rem_rgba(93,134,178,0.25)]"
          >
            <span
              ref={pivotGlowFlameRef}
              className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_40%,rgba(255,115,50,0.52),transparent_65%)] opacity-0 pointer-events-none"
            />
            <span
              ref={pivotGlowMetalRef}
              className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_40%,rgba(93,134,178,0.52),transparent_65%)] opacity-0 pointer-events-none"
            />
            <span className="font-heading font-bold text-3xl metal-text">A</span>
          </div>
        </div>

        <div className="hidden lg:block absolute -top-16 right-12 pointer-events-none">
          <div className="sigil flex items-center justify-center">
            <span className="relative z-10 font-heading font-bold text-4xl metal-text">A</span>
            <span className="pulse-glow" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-16 items-stretch">
          <div
            ref={leftRef}
            className="relative space-y-7 lg:pr-6 relief-panel card-sheen rounded-3xl p-7 md:p-9"
          >
            <div
              ref={leftGlowRef}
              className="absolute inset-0 opacity-0 pointer-events-none"
            >
              <div className="absolute -inset-12 bg-[radial-gradient(circle_at_26%_0%,rgba(255,115,50,0.38),transparent_60%)] blur-3xl" />
            </div>
            <div className="hero-pill w-fit">
              <span className="text-[0.62rem] font-heading font-medium tracking-[0.18em] text-flame uppercase">
                Réparation · Boutique · Café Manga
              </span>
            </div>

            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-text-primary leading-[1.06]">
              Votre QG Tech
              <br />
              <span className="ember-text">en Corse</span>
            </h2>

            <p className="text-text-secondary text-base leading-relaxed max-w-xl">
              Diagnostic immédiat, réparation soignée et espace de détente sur place.
              Une expérience locale sérieuse, rapide et agréable.
            </p>

            <div ref={leftCtasRef} className="flex flex-wrap gap-3 pt-1">
              <Button variant="flame" size="lg" href="/addict-2-0">
                Entrer au QG
              </Button>
              <Button variant="outline" size="lg" href="/addict-2-0#tarifs">
                Demander une réparation
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center">
              {[
                { label: "Diagnostic", value: "Offert" },
                { label: "Garantie", value: "6 mois" },
                { label: "Délais", value: "Express" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="panel-soft px-3 py-3"
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.16em] text-text-muted font-heading">
                    {item.label}
                  </p>
                  <p className="text-sm font-heading text-text-primary mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={rightRef}
            className="relative space-y-7 lg:pl-6 relief-panel card-sheen rounded-3xl p-7 md:p-9"
          >
            <div
              ref={rightGlowRef}
              className="absolute inset-0 opacity-0 pointer-events-none"
            >
              <div className="absolute -inset-12 bg-[radial-gradient(circle_at_75%_0%,rgba(93,134,178,0.4),transparent_60%)] blur-3xl" />
            </div>
            <div className="hero-pill w-fit">
              <span className="text-[0.62rem] font-heading font-medium tracking-[0.18em] text-metal uppercase">
                IA · Automatisation · Formation
              </span>
            </div>

            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-text-primary leading-[1.06]">
              Accélération
              <br />
              <span className="metal-text">de vos process</span>
            </h2>

            <p className="text-text-secondary text-base leading-relaxed max-w-xl">
              Audit digital, workflows intelligents et formation d&apos;équipe:
              un cadre opérationnel pour générer un ROI mesurable.
            </p>

            <div ref={rightCtasRef} className="flex flex-wrap gap-3 pt-1">
              <Button variant="metal" size="lg" href="/pro">
                Voir les offres pro
              </Button>
              <Button variant="outline" size="lg" href="/pro#audit">
                Demander un audit
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center">
              {[
                { label: "Roadmap", value: "90 jours" },
                { label: "Pilotage", value: "KPI clairs" },
                { label: "Support", value: "Continu" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="panel-soft px-3 py-3"
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.16em] text-text-muted font-heading">
                    {item.label}
                  </p>
                  <p className="text-sm font-heading text-text-primary mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={centerCopyRef} className="text-center mt-14 space-y-4 hero-center-copy">
          <h1 className="font-heading text-[2rem] md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
            Deux expertises.
            <span className="block ember-text">Une seule maison.</span>
          </h1>
          <p className="text-text-muted text-[0.72rem] font-heading tracking-[0.18em] uppercase">
            20213 Folelli · Corse
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3 text-[0.64rem] font-heading uppercase tracking-[0.14em] text-text-muted">
            <span className="hero-pill">Diagnostic offert</span>
            <span className="hero-pill">Plan d&apos;action sur mesure</span>
            <span className="hero-pill">Équipe locale et engagée</span>
          </div>
        </div>
      </div>
    </section>
  );
}
