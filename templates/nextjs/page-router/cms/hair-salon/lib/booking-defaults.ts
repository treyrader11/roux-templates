// Booking page CMS content.

export type BookingHero = {
  kicker: string;
  title: string;
  subtitle: string;
  services: string[];
  successMessage: string;
};

export const DEFAULT_BOOKING_HERO: BookingHero = {
  kicker: "Booking",
  title: "Book your appointment",
  subtitle:
    "Tell us what you're after and your preferred time. We'll confirm by email within one business day.",
  services: [
    "Cut & Style",
    "Color / Balayage",
    "Gloss & Toner",
    "Treatment",
    "Consultation",
  ],
  successMessage:
    "Thanks! Your request is in. We'll be in touch shortly to confirm your appointment.",
};

export const BOOKING_SECTION_SLUGS = {
  hero: "booking:hero",
} as const;
