"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

interface MouseTiltProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  disabled?: boolean;
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export default function MouseTilt({
  children,
  className = "",
  maxTilt = 7,
  scale = 1.012,
  disabled = false,
}: MouseTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frame.current) {
        window.cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  const canTilt = () => {
    if (disabled || typeof window === "undefined") return false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    return !reduceMotion && finePointer;
  };

  const reset = () => {
    const node = ref.current;
    if (!node) return;
    node.classList.remove("tilt-active");
    node.style.setProperty("--tilt-rotate-x", "0deg");
    node.style.setProperty("--tilt-rotate-y", "0deg");
    node.style.setProperty("--tilt-scale", "1");
    node.style.setProperty("--tilt-spot-x", "50%");
    node.style.setProperty("--tilt-spot-y", "50%");
  };

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!canTilt()) return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    const rotateY = (x - 0.5) * 2 * maxTilt;
    const rotateX = (0.5 - y) * 2 * maxTilt;

    if (frame.current) window.cancelAnimationFrame(frame.current);
    frame.current = window.requestAnimationFrame(() => {
      node.classList.add("tilt-active");
      node.style.setProperty("--tilt-rotate-x", `${rotateX.toFixed(2)}deg`);
      node.style.setProperty("--tilt-rotate-y", `${rotateY.toFixed(2)}deg`);
      node.style.setProperty("--tilt-scale", scale.toFixed(3));
      node.style.setProperty("--tilt-spot-x", `${(x * 100).toFixed(2)}%`);
      node.style.setProperty("--tilt-spot-y", `${(y * 100).toFixed(2)}%`);
    });
  };

  return (
    <div
      ref={ref}
      className={`tilt-shell ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
    >
      <span className="tilt-spotlight" aria-hidden="true" />
      {children}
    </div>
  );
}
