"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function ScrollDepthTracker() {
  useEffect(() => {
    let tracked = false;

    const onScroll = () => {
      if (tracked) return;

      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const ratio = scrollTop / maxScroll;
      if (ratio >= 0.5) {
        tracked = true;
        trackEvent("scroll_depth_50", {
          page_path: window.location.pathname,
        });
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
