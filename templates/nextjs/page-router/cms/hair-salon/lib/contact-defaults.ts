// Contact page CMS content.
import type { SectionHero } from "@/lib/services-defaults";

export type ContactInfo = {
  address: string;
  phone: string;
  email: string;
  hours: { day: string; hours: string }[];
  social: { label: string; href: string }[];
  mapEmbedUrl: string;
};

export const DEFAULT_CONTACT_HERO: SectionHero = {
  kicker: "Contact",
  title: "Come say hello",
  subtitle: "Questions, consultations, or just to chat about your hair — we'd love to hear from you.",
};

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  address: "123 Studio Lane, Suite 4, Brooklyn, NY 11201",
  phone: "(555) 012-3456",
  email: "hello@reversegen.salon",
  hours: [
    { day: "Tuesday – Friday", hours: "10am – 8pm" },
    { day: "Saturday", hours: "9am – 6pm" },
    { day: "Sunday – Monday", hours: "Closed" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "TikTok", href: "https://tiktok.com" },
  ],
  mapEmbedUrl: "",
};

export const CONTACT_SECTION_SLUGS = {
  hero: "contact:hero",
  info: "contact:info",
} as const;
