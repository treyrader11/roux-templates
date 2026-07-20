import type { GetServerSideProps } from "next";
import AdminHub from "@/components/admin/AdminHub";
import { requireAdminSession } from "@/lib/admin-guard";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = await requireAdminSession(ctx);
  if (redirect) return redirect;
  return { props: {} };
};

export default function AdminBookingHub() {
  return (
    <AdminHub
      title="Booking"
      description="Edit the booking page copy and review incoming requests."
      sections={[
        { name: "Page Settings", description: "Heading, services list, and success message", href: "/admin/booking/settings" },
        { name: "Requests", description: "Review and manage booking requests", href: "/admin/booking/requests" },
      ]}
    />
  );
}
