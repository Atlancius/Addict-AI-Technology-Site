"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MouseTilt from "@/components/animations/MouseTilt";
import Button from "@/components/ui/Button";

type OfferTone = "flame" | "metal";

type OfferCard = {
  label: string;
  title: string;
  description: string;
  points: string[];
  href: string;
  cta: string;
  tone: OfferTone;
  image: string;
};

const OFFER_CARDS: OfferCard[] = [
  {
    label: "B2C",
    title: "Réparation Premium",
    description:
      "Interventions rapides en atelier avec diagnostic offert et procédure de test complète.",
    points: ["Écran, batterie, connecteur", "Devis validé avant action", "Garantie 6 mois"],
    href: "/addict-2-0#tarifs",
    cta: "Voir les tarifs réparation",
    tone: "flame",
    image: "/images/stock/repair-phone.jpg",
  },
  {
    label: "B2C",
    title: "Boutique & Café Manga",
    description:
      "Un espace local agréable pour patienter, découvrir les accessoires tech et échanger avec l’équipe.",
    points: ["Accessoires sélectionnés", "Conseil en boutique", "Ambiance café manga"],
    href: "/addict-2-0",
    cta: "Découvrir l’univers Addict 2.0",
    tone: "flame",
    image: "/images/stock/cafe-cozy.jpg",
  },
  {
    label: "B2B",
    title: "Audit & Roadmap 90 jours",
    description:
      "Un cadrage opérationnel pour prioriser vos gains rapides et structurer votre transformation.",
    points: ["Cartographie process", "Priorisation ROI", "Plan d’action concret"],
    href: "/pro#audit",
    cta: "Demander un audit",
    tone: "metal",
    image: "/images/stock/team-meeting.jpg",
  },
  {
    label: "B2B",
    title: "Automatisation IA",
    description:
      "Conception de workflows robustes pour réduire les tâches répétitives et accélérer vos équipes.",
    points: ["Workflows no-code/API", "Agents IA utiles", "Suivi & amélioration continue"],
    href: "/services",
    cta: "Voir les services pro",
    tone: "metal",
    image: "/images/stock/data-center.jpg",
  },
  {
    label: "B2B",
    title: "Formations Actionnables",
    description:
      "Montée en compétence interne sur no-code, IA et automatisation pour rendre vos équipes autonomes.",
    points: ["Parcours adaptés", "Mises en situation", "Support post-formation"],
    href: "/formations",
    cta: "Voir les formations",
    tone: "metal",
    image: "/images/stock/pro-workspace.jpg",
  },
];

type StackState = {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  blur: number;
  brightness: number;
  opacity: number;
  zIndex: number;
  interactive: boolean;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function smoothstep(progress: number) {
  const t = clamp(progress, 0, 1);
  return t * t * (3 - 2 * t);
}

const STACK_CONFIG = {
  stageBaseVh: 158,
  stagePerCardVh: 46,
  progressTrimStart: 0.03,
  progressTrimLength: 0.94,
  entering: {
    x: 22,
    y: 134,
    scale: 0.9,
    rotate: -4.6,
  },
  waitingStep: {
    x: 10,
    y: 30,
    scaleDrop: 0.035,
    rotate: 1.1,
  },
  stackedStep: {
    x: 10,
    y: -22,
    scaleDrop: 0.048,
    rotate: 1.45,
  },
  minScale: 0.78,
};

function computeSectionProgress(rect: DOMRect, viewportHeight: number) {
  const startOffset = viewportHeight * 0.16;
  const endOffset = viewportHeight * 0.72;
  const distance = Math.max(rect.height + startOffset - endOffset, 1);
  const rawProgress = (startOffset - rect.top) / distance;
  return clamp(rawProgress, 0, 1);
}

function computeStackState(index: number, count: number, activeFloat: number): StackState {
  const delta = index - activeFloat;

  if (count <= 1) {
    return {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      blur: 0,
      brightness: 1,
      opacity: 1,
      zIndex: 10,
      interactive: true,
    };
  }

  if (delta >= 1) {
    const tail = delta - 1;
    return {
      x: STACK_CONFIG.entering.x + tail * STACK_CONFIG.waitingStep.x,
      y: STACK_CONFIG.entering.y + tail * STACK_CONFIG.waitingStep.y,
      scale: Math.max(
        STACK_CONFIG.minScale,
        STACK_CONFIG.entering.scale - tail * STACK_CONFIG.waitingStep.scaleDrop
      ),
      rotate: STACK_CONFIG.entering.rotate - tail * STACK_CONFIG.waitingStep.rotate,
      blur: Math.min(0.45, tail * 0.18),
      brightness: Math.max(0.82, 0.94 - tail * 0.04),
      opacity: Math.max(0.78, 0.94 - tail * 0.06),
      zIndex: 440 - Math.round(delta * 16),
      interactive: false,
    };
  }

  if (delta > 0) {
    const enteringProgress = smoothstep(1 - delta);
    return {
      x: lerp(STACK_CONFIG.entering.x, 0, enteringProgress),
      y: lerp(STACK_CONFIG.entering.y, 0, enteringProgress),
      scale: lerp(STACK_CONFIG.entering.scale, 1, enteringProgress),
      rotate: lerp(STACK_CONFIG.entering.rotate, 0, enteringProgress),
      blur: lerp(0.22, 0, enteringProgress),
      brightness: lerp(0.92, 1, enteringProgress),
      opacity: 1,
      zIndex: 470 + Math.round(enteringProgress * 18),
      interactive: false,
    };
  }

  const depth = -delta;
  return {
    x: depth * STACK_CONFIG.stackedStep.x,
    y: depth * STACK_CONFIG.stackedStep.y,
    scale: Math.max(STACK_CONFIG.minScale, 1 - depth * STACK_CONFIG.stackedStep.scaleDrop),
    rotate: depth * STACK_CONFIG.stackedStep.rotate,
    blur: Math.min(0.4, depth * 0.12),
    brightness: Math.max(0.8, 1 - depth * 0.05),
    opacity: Math.max(0.82, 1 - depth * 0.06),
    zIndex: 500 - Math.round(depth * 22),
    interactive: depth < 0.06,
  };
}

export default function BentoGrid() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let scrollRaf = 0;

    const measure = () => {
      const node = stageRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      setProgress(computeSectionProgress(rect, vh));
    };

    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = 0;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf);
    };
  }, [reducedMotion]);

  const effectiveProgress = reducedMotion ? 1 : progress;

  const stackStates = useMemo(() => {
    const count = OFFER_CARDS.length;
    const normalizedProgress = clamp(
      (effectiveProgress - STACK_CONFIG.progressTrimStart) /
        STACK_CONFIG.progressTrimLength,
      0,
      1
    );
    const activeFloat = normalizedProgress * (count - 1);
    return OFFER_CARDS.map((_, index) => computeStackState(index, count, activeFloat));
  }, [effectiveProgress]);

  const stageHeightVh =
    STACK_CONFIG.stageBaseVh + (OFFER_CARDS.length - 1) * STACK_CONFIG.stagePerCardVh;

  return (
    <section className="py-24 bg-surface-1 section-shell surface-grid">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal variant="up" distance={24}>
          <div className="mb-12 space-y-3">
            <p className="eyebrow">Offres animées</p>
            <h2 className="section-title">
              Cartes d’offres en
              <span className="block ember-text">empilement au scroll.</span>
            </h2>
            <p className="section-lead">
              Descends: chaque offre vient au premier plan, pendant que les
              précédentes se replient proprement en arrière-plan.
            </p>
          </div>
        </ScrollReveal>

        <div className="md:hidden grid grid-cols-1 gap-7">
          {OFFER_CARDS.map((offer, index) => (
            <ScrollReveal key={offer.title} delay={index * 80} variant="zoom" distance={20}>
              <MouseTilt className="panel rounded-2xl p-5 space-y-5" maxTilt={5} scale={1.006}>
                <div className="relative h-40 rounded-xl overflow-hidden border border-stroke-subtle">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-0/70 via-surface-0/10 to-transparent" />
                </div>
                <p
                  className={`text-[0.64rem] font-heading uppercase tracking-[0.18em] ${
                    offer.tone === "flame" ? "text-flame" : "text-metal"
                  }`}
                >
                  {offer.label}
                </p>
                <h3 className="font-heading text-2xl text-text-primary leading-tight">{offer.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{offer.description}</p>
                <ul className="space-y-1.5 text-sm text-text-secondary">
                  {offer.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className={offer.tone === "flame" ? "text-flame" : "text-metal"}>✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={offer.tone} size="md" href={offer.href} className="w-full">
                  {offer.cta}
                </Button>
              </MouseTilt>
            </ScrollReveal>
          ))}
        </div>

        <div ref={stageRef} className="hidden md:block stack-stage">
          <div style={{ height: `${stageHeightVh}vh` }}>
            <div className="sticky top-28 h-[34rem]">
              <div className="relative h-full stack-deck px-3 md:px-5">
                {OFFER_CARDS.map((offer, index) => {
                  const state = stackStates[index];
                  return (
                    <article
                      key={offer.title}
                      className="stack-card absolute inset-y-0 inset-x-1 md:inset-x-2 panel rounded-3xl p-6 md:p-7 grid grid-cols-[0.95fr_1.05fr] gap-8"
                      style={{
                        transform: `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.scale}) rotate(${state.rotate}deg)`,
                        filter: `blur(${state.blur}px) brightness(${state.brightness})`,
                        opacity: state.opacity,
                        zIndex: state.zIndex,
                        pointerEvents: state.interactive ? "auto" : "none",
                      }}
                    >
                      <div className="relative rounded-2xl overflow-hidden border border-stroke-subtle">
                        <Image
                          src={offer.image}
                          alt={offer.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1200px) 45vw, 36vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-0/72 via-surface-0/10 to-transparent" />
                      </div>
                      <div className="flex flex-col">
                        <p
                          className={`text-[0.64rem] font-heading uppercase tracking-[0.18em] ${
                            offer.tone === "flame" ? "text-flame" : "text-metal"
                          }`}
                        >
                          {offer.label}
                        </p>
                        <h3 className="font-heading text-4xl text-text-primary mt-3 leading-[1.02]">
                          {offer.title}
                        </h3>
                        <p className="text-base text-text-secondary leading-relaxed mt-4">
                          {offer.description}
                        </p>
                        <ul className="space-y-2.5 text-sm text-text-secondary mt-5">
                          {offer.points.map((point) => (
                            <li key={point} className="flex items-start gap-2">
                              <span className={offer.tone === "flame" ? "text-flame" : "text-metal"}>
                                ✓
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto pt-6">
                          <Button variant={offer.tone} size="md" href={offer.href}>
                            {offer.cta}
                          </Button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Expérience animation", value: "Empilement progressif" },
            { label: "Parcours mobile", value: "Cards verticales fluides" },
            { label: "Parcours desktop", value: "Stack sticky immersif" },
          ].map((item, index) => (
            <ScrollReveal key={item.label} delay={index * 60} variant="soft" distance={14}>
              <div className="metric-chip h-full text-center">
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-text-muted font-heading">
                  {item.label}
                </p>
                <p className="text-sm md:text-base font-heading text-text-primary mt-1">{item.value}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
