import { CalendarCheck, Scissors, Users, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BOOKINGS, SERVICES, STYLISTS } from "@/lib/content";

const STATUS_VARIANT = {
  pending: "warning",
  confirmed: "success",
  completed: "muted",
  cancelled: "danger",
} as const;

const CARDS = [
  { label: "Bookings this week", value: String(BOOKINGS.length), icon: CalendarCheck },
  { label: "Active services", value: String(SERVICES.length), icon: Scissors },
  { label: "Staff members", value: String(STYLISTS.length), icon: Users },
  { label: "Revenue (est.)", value: "$4,280", icon: DollarSign },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        An overview of your studio at a glance.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="rounded-2xl border border-border bg-card p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Icon size={18} />
              </span>
              <p className="mt-4 font-display text-2xl text-foreground">{c.value}</p>
              <p className="text-sm text-muted-foreground">{c.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-medium text-foreground">Recent bookings</h2>
        </div>
        <div className="divide-y divide-border">
          {BOOKINGS.map((b) => (
            <div
              key={b.id}
              className="flex items-center justify-between gap-4 px-5 py-4 text-sm"
            >
              <div>
                <p className="font-medium text-foreground">{b.clientName}</p>
                <p className="text-muted-foreground">
                  {b.service} · {b.stylist}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden text-muted-foreground sm:block">{b.date}</span>
                <Badge variant={STATUS_VARIANT[b.status]}>{b.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
