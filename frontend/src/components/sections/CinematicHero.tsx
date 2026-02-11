import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MouseTilt from "@/components/animations/MouseTilt";
import Button from "@/components/ui/Button";

type HeroTone = "flame" | "metal";

type HeroAction = {
  label: string;
  href: string;
  variant?: "flame" | "metal" | "outline";
  target?: string;
  rel?: string;
};

type HeroMetric = {
  label: string;
  value: string;
};

interface CinematicHeroProps {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  tone?: HeroTone;
  mainImage: {
    src: string;
    alt: string;
  };
  sideImage?: {
    src: string;
    alt: string;
  };
  actions?: HeroAction[];
  metrics?: HeroMetric[];
  className?: string;
}

export default function CinematicHero({
  eyebrow,
  title,
  accent,
  description,
  tone = "metal",
  mainImage,
  sideImage,
  actions = [],
  metrics = [],
  className = "",
}: CinematicHeroProps) {
  const accentClass = tone === "flame" ? "ember-text" : "metal-text";
  const markerClass = tone === "flame" ? "bg-flame" : "bg-metal";
  const defaultButtonVariant = tone === "flame" ? "flame" : "metal";

  return (
    <section className={`pt-24 md:pt-28 pb-14 md:pb-20 relative overflow-hidden surface-grid ${className}`}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-0 via-surface-0 to-surface-1" />
      <div
        className={`ambient-orb top-[-18%] left-[-14%] w-[34rem] h-[34rem] ${
          tone === "flame" ? "bg-flame/58" : "bg-metal/58"
        } aurora`}
      />
      <div className="ambient-orb right-[-14%] bottom-[-24%] w-[40rem] h-[40rem] bg-ember/48 aurora" />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8 md:gap-10 items-center">
          <ScrollReveal variant="left" distance={26}>
            <div className="space-y-6 md:space-y-7">
              <div className="hero-pill">
                <span className={`h-1.5 w-1.5 rounded-full ${markerClass} animate-pulse`} />
                <span className="text-[0.62rem] font-heading uppercase tracking-[0.18em] text-text-secondary">
                  {eyebrow}
                </span>
              </div>

              <h1 className="font-heading text-[1.95rem] sm:text-[2.2rem] md:text-6xl font-bold text-text-primary leading-[0.98]">
                {title}
                {accent && <span className={`block ${accentClass}`}>{accent}</span>}
              </h1>

              <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl">
                {description}
              </p>

              {actions.length > 0 && (
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {actions.map((action) => (
                    <Button
                      key={`${action.label}-${action.href}`}
                      variant={action.variant || defaultButtonVariant}
                      size="lg"
                      href={action.href}
                      target={action.target}
                      rel={action.rel}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}

              {metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="metric-chip h-full">
                      <p className="text-[0.62rem] uppercase tracking-[0.16em] text-text-muted font-heading">
                        {metric.label}
                      </p>
                      <p className="text-sm font-heading text-text-primary mt-1">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} variant="right">
            <MouseTilt className="panel card-sheen rounded-3xl p-5 md:p-6 space-y-5" maxTilt={6} scale={1.008}>
              <div className="relative h-56 rounded-2xl overflow-hidden border border-stroke-subtle">
                <Image
                  src={mainImage.src}
                  alt={mainImage.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-0/75 via-surface-0/15 to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative h-32 rounded-2xl overflow-hidden border border-stroke-subtle bg-surface-2/65">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-transparent pointer-events-none" />
                  <div className="h-full w-full flex flex-col justify-end p-3.5">
                    <p className="text-[0.6rem] uppercase tracking-[0.14em] text-text-muted font-heading">
                      Expérience
                    </p>
                    <p className="font-heading text-sm text-text-primary mt-1">
                      Parcours premium fluide
                    </p>
                  </div>
                </div>
                <div className="relative h-32 rounded-2xl overflow-hidden border border-stroke-subtle bg-surface-2/65">
                  {sideImage ? (
                    <>
                      <Image
                        src={sideImage.src}
                        alt={sideImage.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 22vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-0/75 via-surface-0/15 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-transparent" />
                  )}
                </div>
              </div>
            </MouseTilt>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
