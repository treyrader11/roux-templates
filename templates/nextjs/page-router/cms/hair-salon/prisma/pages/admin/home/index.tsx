import type { GetServerSideProps } from "next";
import AdminLayout from "@/components/admin/AdminLayout";
import SectionCard from "@/components/admin/SectionCard";
import { requireAdminSession } from "@/lib/admin-guard";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = await requireAdminSession(ctx);
  if (redirect) return redirect;
  return { props: {} };
};

const SECTIONS = [
  { name: "Splash Screen", description: "Intro animation images revealed on page load", href: "/admin/home/splash" },
  { name: "Hero", description: "Headline, subheadline, and CTA buttons", href: "/admin/home/hero" },
  { name: "Hero Carousel", description: "Full-width sliding images below the hero", href: "/admin/home/hero-carousel" },
  { name: "Showcase Carousel", description: "Sliding image cards below the hero", href: "/admin/home/showcase" },
  { name: "Services Overview", description: "Section title and highlight cards", href: "/admin/home/services-overview" },
  { name: "Featured Stylists", description: "Heading for the featured team section", href: "/admin/home/featured-stylists" },
  { name: "Gallery Preview", description: "Heading for the gallery preview section", href: "/admin/home/gallery-preview" },
  { name: "Call to Action", description: "Closing CTA banner copy and button", href: "/admin/home/cta" },
];

export default function AdminHomeHub() {
  return (
    <AdminLayout backHref="/admin" backLabel="Dashboard">
      <h1 className="font-display text-3xl text-foreground">Home Page</h1>
      <p className="mt-2 text-muted-foreground">Edit each section of the homepage.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <SectionCard key={s.href} {...s} />
        ))}
      </div>
    </AdminLayout>
  );
}
