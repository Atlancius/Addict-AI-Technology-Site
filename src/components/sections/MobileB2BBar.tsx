"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

interface MobileB2BBarProps {
  phone?: string;
  auditHref?: string;
}

export default function MobileB2BBar({
  phone,
  auditHref = "#contact-pro",
}: MobileB2BBarProps) {
  const phoneHref = phone ? phone.replace(/\s+/g, "") : "+33495311290";
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previousY = window.scrollY;
    let raf = 0;

    const update = () => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;

      if (currentY < 80 || delta < -10) {
        setHidden(false);
      } else if (delta > 16) {
        setHidden(true);
      }

      previousY = currentY;
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden transition-transform duration-300 ${
        hidden ? "translate-y-[calc(100%+1rem)]" : "translate-y-0"
      }`}
    >
      <div className="bg-surface-0/88 backdrop-blur-xl border-t border-stroke-subtle shadow-[0_-0.8rem_2.6rem_rgba(0,0,0,0.3)]">
        <div className="mx-auto max-w-7xl px-4 pt-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] grid grid-cols-2 gap-2">
          <Button
            variant="metal"
            size="sm"
            href={auditHref}
            className="w-full"
            onClick={() => trackEvent("click_audit_b2b", { placement: "mobile_bar" })}
          >
            Audit
          </Button>
          <Button
            variant="outline"
            size="sm"
            href="/contact#contact-b2b"
            className="w-full"
            onClick={() => trackEvent("click_contact_b2b", { placement: "mobile_bar" })}
          >
            Contact
          </Button>
          <Button
            variant="outline"
            size="sm"
            href={`tel:${phoneHref}`}
            className="col-span-2 w-full"
            onClick={() => trackEvent("click_call_b2b", { placement: "mobile_bar" })}
          >
            Appeler
          </Button>
        </div>
      </div>
    </div>
  );
}
