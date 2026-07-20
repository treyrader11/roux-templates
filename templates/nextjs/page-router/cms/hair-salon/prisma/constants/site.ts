export const SITE_NAME = "Reverse Gen";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Stylists", href: "/stylists" },
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
] as const;

export const BOOKING_HREF = "/booking";

// Admin dashboard page groups.
export const ADMIN_PAGES = [
  { name: "Home", href: "/admin/home", description: "Hero, services overview, featured stylists, gallery preview, CTA" },
  { name: "Services", href: "/admin/services", description: "Services hero and the service menu" },
  { name: "Stylists", href: "/admin/stylists", description: "Stylists hero and team profiles" },
  { name: "Gallery", href: "/admin/gallery", description: "Gallery hero and portfolio images" },
  { name: "Pricing", href: "/admin/pricing", description: "Pricing hero and packages" },
  { name: "Contact", href: "/admin/contact", description: "Contact hero and salon info" },
  { name: "Booking", href: "/admin/booking", description: "Booking page settings and requests" },
  { name: "Brand", href: "/admin/brand", description: "Logos and brand assets" },
  { name: "Banner", href: "/admin/banner", description: "Site-wide announcement bar" },
  { name: "Users", href: "/admin/users", description: "Manage admin users" },
] as const;
