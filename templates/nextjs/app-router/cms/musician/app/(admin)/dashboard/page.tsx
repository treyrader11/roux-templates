import { Film, CalendarCheck, Images, Users } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCard from "@/components/admin/StatsCard";

const CARDS = [
  { label: "Projects", value: "15", Icon: Film },
  { label: "Bookings", value: "8", Icon: CalendarCheck },
  { label: "Media Assets", value: "124", Icon: Images },
  { label: "Team Members", value: "6", Icon: Users },
];

export default function DashboardPage() {
  return (
    <div>
      <AdminHeader
        title="Dashboard"
        description="Overview of your studio at a glance."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c) => (
          <StatsCard key={c.label} {...c} />
        ))}
      </div>
      <p className="mt-10 text-sm text-muted-foreground">
        Placeholder data — wire these to your Drizzle queries.
      </p>
    </div>
  );
}
