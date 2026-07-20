import type { GetServerSideProps } from "next";
import AdminLayout from "@/components/admin/AdminLayout";
import SectionCard from "@/components/admin/SectionCard";
import { requireAdminSession } from "@/lib/admin-guard";
import { ADMIN_PAGES } from "@/constants/site";
import {
  Home,
  Scissors,
  Users,
  Image as ImageIcon,
  Tag,
  Mail,
  Calendar,
  Shield,
  Megaphone,
  Palette,
} from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  Home: <Home size={18} />,
  Services: <Scissors size={18} />,
  Stylists: <Users size={18} />,
  Gallery: <ImageIcon size={18} />,
  Pricing: <Tag size={18} />,
  Contact: <Mail size={18} />,
  Booking: <Calendar size={18} />,
  Brand: <Palette size={18} />,
  Banner: <Megaphone size={18} />,
  Users: <Shield size={18} />,
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = await requireAdminSession(ctx);
  if (redirect) return redirect;
  return { props: {} };
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="font-display text-3xl text-foreground">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Manage every part of your site from one place.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ADMIN_PAGES.map((page) => (
          <SectionCard
            key={page.href}
            name={page.name}
            description={page.description}
            href={page.href}
            icon={ICONS[page.name]}
          />
        ))}
      </div>
    </AdminLayout>
  );
}
