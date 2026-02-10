import Button from "@/components/ui/Button";

interface MobileB2CBarProps {
  phone?: string;
  mapHref?: string;
  quoteHref?: string;
}

export default function MobileB2CBar({ phone, mapHref, quoteHref }: MobileB2CBarProps) {
  const phoneHref = phone ? phone.replace(/\s+/g, "") : "+33495311290";
  const maps = mapHref || "https://www.google.com/maps?q=42.4474697,9.5067658";
  const quote = quoteHref || "#contact-b2c";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="glass-panel border-t border-stroke-subtle">
        <div className="mx-auto max-w-7xl px-4 py-3 flex gap-2">
          <Button variant="flame" size="sm" href={`tel:${phoneHref}`} className="flex-1">
            Appeler
          </Button>
          <Button variant="outline" size="sm" href={quote} className="flex-1">
            Devis
          </Button>
          <Button variant="outline" size="sm" href={maps} className="flex-1">
            Itinéraire
          </Button>
        </div>
      </div>
    </div>
  );
}
