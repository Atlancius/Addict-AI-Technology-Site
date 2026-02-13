"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type RevealVariant = "up" | "down" | "left" | "right" | "zoom" | "soft";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  variant?: RevealVariant;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

function getVariants(variant: RevealVariant, distance: number): Variants {
  const d = distance;
  const base = { opacity: 0, filter: "blur(4px)" };
  const visible = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };

  switch (variant) {
    case "up":
      return { hidden: { ...base, y: d }, visible };
    case "down":
      return { hidden: { ...base, y: -d }, visible };
    case "left":
      return { hidden: { ...base, x: -d }, visible };
    case "right":
      return { hidden: { ...base, x: d }, visible };
    case "zoom":
      return { hidden: { ...base, scale: 0.95, y: d * 0.3 }, visible };
    case "soft":
      return { hidden: { opacity: 0, y: d * 0.5, filter: "blur(2px)" }, visible };
    default:
      return { hidden: { ...base, y: d }, visible };
  }
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  distance = 24,
  variant = "up",
  duration,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      variants={getVariants(variant, distance)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-8%" }}
      transition={{
        duration: duration ? duration / 1000 : 0.5,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      variants={{ visible: { transition: { staggerChildren: staggerDelay } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5%" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
