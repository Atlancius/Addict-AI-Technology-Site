"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
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
  y: number;
  scale: number;
  blur: number;
  brightness: number;
  zIndex: number;
  interactive: boolean;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function computeStackState(
  index: number,
  count: number,
  active: number,
  between: number
): StackState {
  if (count <= 1) {
    return {
      y: 0,
      scale: 1,
      blur: 0,
      brightness: 1,
      zIndex: 10,
      interactive: true,
    };
  }

  if (index < active) {
    const depth = active - index;
    return {
      y: -depth * 18 - between * 10,
      scale: 1 - Math.min(0.2, depth * 0.05 + between * 0.02),
      blur: Math.min(1.15, depth * 0.34 + between * 0.14),
      brightness: Math.max(0.72, 0.95 - depth * 0.08 - between * 0.03),
      zIndex: count - depth - 1,
      interactive: false,
    };
  }

  if (index === active) {
    return {
      y: -between * 8,
      scale: 1 - between * 0.018,
      blur: 0,
      brightness: 1,
      zIndex: count + 10,
      interactive: true,
    };
  }

  if (index === active + 1) {
    return {
      y: 92 - between * 92,
      scale: 0.93 + between * 0.07,
      blur: Math.max(0, 0.58 - between * 0.58),
      brightness: 0.9 + between * 0.1,
      zIndex: count + 9,
      interactive: between > 0.88,
    };
  }

  const depth = index - active - 1;
  return {
    y: 120 + depth * 24,
    scale: Math.max(0.8, 0.9 - depth * 0.028),
    blur: Math.min(1.55, 0.88 + depth * 0.22),
    brightness: Math.max(0.64, 0.84 - depth * 0.055),
    zIndex: count - depth - 2,
    interactive: false,
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

    let raf = 0;
    const update = () => {
      const node = stageRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const startOffset = vh * 0.18;
      const scrollDistance = Math.max(rect.height - vh * 0.55, 1);
      const rawProgress = (startOffset - rect.top) / scrollDistance;
      setProgress(clamp(rawProgress, 0, 1));
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  const effectiveProgress = reducedMotion ? 1 : progress;

  const stackStates = useMemo(() => {
    const count = OFFER_CARDS.length;
    const activeFloat = effectiveProgress * (count - 1);
    const active = Math.min(count - 1, Math.max(0, Math.floor(activeFloat)));
    const between = clamp(activeFloat - active, 0, 1);

    return OFFER_CARDS.map((_, index) =>
      computeStackState(index, count, active, between)
    );
  }, [effectiveProgress]);

  return (
    <section className="py-24 bg-surface-1 section-shell surface-grid">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
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

        <div className="md:hidden grid grid-cols-1 gap-5">
          {OFFER_CARDS.map((offer, index) => (
            <ScrollReveal key={offer.title} delay={index * 80}>
              <article className="panel rounded-2xl p-4 space-y-4">
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
              </article>
            </ScrollReveal>
          ))}
        </div>

        <div ref={stageRef} className="hidden md:block stack-stage">
          <div className="h-[205vh]">
            <div className="sticky top-28 h-[33rem]">
              <div className="relative h-full stack-deck">
                {OFFER_CARDS.map((offer, index) => {
                  const state = stackStates[index];
                  return (
                    <article
                      key={offer.title}
                      className="stack-card absolute inset-0 panel rounded-3xl p-5 md:p-6 grid grid-cols-[0.95fr_1.05fr] gap-6"
                      style={{
                        transform: `translate3d(0, ${state.y}px, 0) scale(${state.scale})`,
                        filter: `blur(${state.blur}px) brightness(${state.brightness})`,
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

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Expérience animation", value: "Empilement progressif" },
            { label: "Parcours mobile", value: "Cards verticales fluides" },
            { label: "Parcours desktop", value: "Stack sticky immersif" },
          ].map((item, index) => (
            <ScrollReveal key={item.label} delay={index * 60}>
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
