import { Badge } from "@/components/ui/Badge";
import { BOOKINGS } from "@/lib/content";

const STATUS_VARIANT = {
  pending: "warning",
  confirmed: "success",
  completed: "muted",
  cancelled: "danger",
} as const;

export default function AdminBookingsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-foreground">Bookings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Review and manage appointment requests.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Service</th>
              <th className="px-5 py-3 font-medium">Stylist</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {BOOKINGS.map((b) => (
              <tr key={b.id}>
                <td className="px-5 py-4 font-medium text-foreground">{b.clientName}</td>
                <td className="px-5 py-4 text-muted-foreground">{b.service}</td>
                <td className="px-5 py-4 text-muted-foreground">{b.stylist}</td>
                <td className="px-5 py-4 text-muted-foreground">{b.date}</td>
                <td className="px-5 py-4">
                  <Badge variant={STATUS_VARIANT[b.status]}>{b.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
