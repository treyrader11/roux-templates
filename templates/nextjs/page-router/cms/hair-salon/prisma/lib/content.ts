// Placeholder salon content. Swap these for live Prisma queries as you wire up
// the CMS — the shapes mirror the models in prisma/schema.prisma.

export const SITE = {
  name: "Lumière Hair Studio",
  tagline: "A boutique hair studio for cut, color & care.",
  phone: "(504) 555-0142",
  email: "hello@lumierestudio.co",
  address: "812 Magazine St, New Orleans, LA 70130",
  hours: [
    { day: "Tue – Fri", time: "9:00 AM – 7:00 PM" },
    { day: "Saturday", time: "9:00 AM – 5:00 PM" },
    { day: "Sun – Mon", time: "Closed" },
  ],
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const BOOKING_HREF = "/booking";

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
};

export const SERVICES: Service[] = [
  { id: "1", name: "Precision Cut & Style", description: "A tailored cut with a wash and finished blow-dry.", price: 75, duration: 60, category: "Cuts" },
  { id: "2", name: "Restyle Consultation", description: "A full reshape with expert guidance on your new look.", price: 95, duration: 90, category: "Cuts" },
  { id: "3", name: "Single Process Color", description: "All-over color to cover greys or refresh your shade.", price: 110, duration: 90, category: "Color" },
  { id: "4", name: "Balayage", description: "Hand-painted, sun-kissed dimension with a soft grow-out.", price: 210, duration: 180, category: "Color" },
  { id: "5", name: "Full Highlights", description: "Bright, blended highlights from root to end.", price: 180, duration: 150, category: "Color" },
  { id: "6", name: "Gloss & Tone", description: "A shine-boosting glaze to neutralize or enrich tone.", price: 55, duration: 45, category: "Color" },
  { id: "7", name: "Keratin Smoothing", description: "Frizz-taming treatment for smooth, manageable hair.", price: 250, duration: 150, category: "Treatments" },
  { id: "8", name: "Deep Repair Mask", description: "Intensive bond-building treatment for stressed hair.", price: 45, duration: 30, category: "Treatments" },
  { id: "9", name: "Bridal Updo", description: "An elegant, long-wearing style for your big day.", price: 130, duration: 90, category: "Occasions" },
];

export type Stylist = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
};

export const STYLISTS: Stylist[] = [
  { id: "1", name: "Camille Fontaine", role: "Founder & Master Stylist", bio: "Fifteen years shaping signature cuts and lived-in color.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80&auto=format&fit=crop" },
  { id: "2", name: "Théo Baptiste", role: "Color Director", bio: "Balayage specialist with an eye for dimensional blondes.", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80&auto=format&fit=crop" },
  { id: "3", name: "Noor Haddad", role: "Senior Stylist", bio: "Textured cuts and curl-forward styling for every pattern.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&auto=format&fit=crop" },
];

export type GalleryItem = { id: string; url: string; alt: string };

export const GALLERY: GalleryItem[] = [
  { id: "1", url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80&auto=format&fit=crop", alt: "Balayage blonde" },
  { id: "2", url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80&auto=format&fit=crop", alt: "Salon interior" },
  { id: "3", url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80&auto=format&fit=crop", alt: "Styling chair" },
  { id: "4", url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80&auto=format&fit=crop", alt: "Color application" },
  { id: "5", url: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&q=80&auto=format&fit=crop", alt: "Finished blowout" },
  { id: "6", url: "https://images.unsplash.com/photo-1552642986-ccb41e7059e7?w=600&q=80&auto=format&fit=crop", alt: "Wavy lob" },
  { id: "7", url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&q=80&auto=format&fit=crop", alt: "Updo detail" },
  { id: "8", url: "https://images.unsplash.com/photo-1470259078422-826894b933ad?w=600&q=80&auto=format&fit=crop", alt: "Warm brunette" },
];

export type Testimonial = { id: string; clientName: string; rating: number; content: string };

export const TESTIMONIALS: Testimonial[] = [
  { id: "1", clientName: "Amelia R.", rating: 5, content: "Camille gave me the best balayage of my life. The studio feels like a warm hug." },
  { id: "2", clientName: "Jordan P.", rating: 5, content: "Théo nailed the exact blonde I'd been chasing for years. Obsessed." },
  { id: "3", clientName: "Sofia M.", rating: 5, content: "Finally a stylist who understands my curls. Noor is a genius." },
];

export const STATS = [
  { label: "Years in business", value: "15+" },
  { label: "Five-star reviews", value: "1,200+" },
  { label: "Expert stylists", value: "8" },
  { label: "Happy clients", value: "9k+" },
] as const;

export type BookingRow = {
  id: string;
  clientName: string;
  service: string;
  stylist: string;
  date: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
};

export const BOOKINGS: BookingRow[] = [
  { id: "1", clientName: "Amelia Ross", service: "Balayage", stylist: "Théo Baptiste", date: "2025-08-14 10:00", status: "confirmed" },
  { id: "2", clientName: "Jordan Pace", service: "Precision Cut & Style", stylist: "Camille Fontaine", date: "2025-08-14 13:30", status: "pending" },
  { id: "3", clientName: "Sofia Marin", service: "Gloss & Tone", stylist: "Noor Haddad", date: "2025-08-15 09:00", status: "confirmed" },
  { id: "4", clientName: "Priya Nair", service: "Keratin Smoothing", stylist: "Camille Fontaine", date: "2025-08-15 15:00", status: "pending" },
  { id: "5", clientName: "Dana Wolfe", service: "Full Highlights", stylist: "Théo Baptiste", date: "2025-08-12 11:00", status: "completed" },
];
