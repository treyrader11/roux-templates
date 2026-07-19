import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { SITE, BOOKING_HREF } from "@/lib/content";

// Split-portrait hero — the ReverseGen signature: image column with a brand
// divider rule on the left, editorial content panel on the right.
export function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-muted">
      <div className="flex w-full" style={{ minHeight: "clamp(360px, 55vw, 88vh)" }}>
        <div
          className="relative flex-shrink-0 overflow-hidden"
          style={{ width: "clamp(140px, 40%, 560px)" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&q=80&auto=format&fit=crop"
            alt={`${SITE.name} salon`}
            fill
            priority
            className="object-cover object-center"
            sizes="40vw"
          />
          <div
            className="absolute right-0 top-0 bottom-0 z-10 bg-brand opacity-70"
            style={{ width: 3 }}
          />
        </div>

        <div className="flex flex-1 flex-col justify-center bg-muted px-6 py-10 sm:px-12 lg:px-20">
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
            New Orleans · Est. 2010
          </span>
          <h1 className="mt-4 font-display text-4xl leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Cut. Color.
            <br />
            Care.
          </h1>
          <p className="mt-5 max-w-md text-sm uppercase tracking-[0.16em] text-muted-foreground sm:text-base">
            {SITE.tagline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:max-w-sm sm:flex-row">
            <LinkButton href={BOOKING_HREF} variant="primary" className="w-full sm:w-auto">
              Book an appointment
            </LinkButton>
            <LinkButton href="/services" variant="outlined" className="w-full sm:w-auto">
              View services
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
