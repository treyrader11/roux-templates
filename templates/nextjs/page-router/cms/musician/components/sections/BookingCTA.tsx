import Link from "next/link";
import GrainOverlay from "@/components/ui/GrainOverlay";

export default function BookingCTA() {
  return (
    <section className="relative overflow-hidden bg-background">
      <GrainOverlay />
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
          Book Us For Your Event
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
          Weddings, festivals, brand films, live sets — tell us what you&apos;re
          dreaming up and we&apos;ll bring the vision to life.
        </p>
        <Link
          href="/booking"
          className="mt-10 inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-4 text-sm font-medium uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90"
        >
          Start a Booking
        </Link>
      </div>
    </section>
  );
}
