"use client";

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

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="glass-panel border-t border-stroke-subtle">
        <div className="mx-auto max-w-7xl px-4 py-3 flex gap-2">
          <Button
            variant="metal"
            size="sm"
            href={auditHref}
            className="flex-1"
            onClick={() => trackEvent("click_audit_b2b", { placement: "mobile_bar" })}
          >
            Audit
          </Button>
          <Button
            variant="outline"
            size="sm"
            href="/contact#contact-b2b"
            className="flex-1"
            onClick={() => trackEvent("click_contact_b2b", { placement: "mobile_bar" })}
          >
            Contact
          </Button>
          <Button
            variant="outline"
            size="sm"
            href={`tel:${phoneHref}`}
            className="flex-1"
            onClick={() => trackEvent("click_call_b2b", { placement: "mobile_bar" })}
          >
            Appeler
          </Button>
        </div>
      </div>
    </div>
  );
}
