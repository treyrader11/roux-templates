import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { BOOKING_HREF } from "@/lib/content";

// Full-bleed brand CTA — ReverseGen's rounded-3xl bg-brand panel.
export function BookingCTA() {
  return (
    <Section className="border-t border-border">
      <div className="rounded-3xl bg-brand px-8 py-16 text-center text-brand-foreground">
        <h2 className="font-display text-3xl sm:text-4xl">Ready for a fresh look?</h2>
        <p className="mx-auto mt-3 max-w-md opacity-90">
          Book your next cut, color, or treatment in just a few taps.
        </p>
        <LinkButton
          href={BOOKING_HREF}
          variant="outlined"
          className="mt-8 border-brand-foreground text-brand-foreground hover:bg-brand-foreground/10"
        >
          Book an appointment
        </LinkButton>
      </div>
    </Section>
  );
}
