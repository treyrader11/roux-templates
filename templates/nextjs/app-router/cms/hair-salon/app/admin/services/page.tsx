import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, formatDuration } from "@/lib/utils";
import { SERVICES } from "@/lib/content";

export default function AdminServicesPage() {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-foreground">Services</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your service menu and pricing.
          </p>
        </div>
        <Button size="sm" className="shrink-0">
          <Plus size={16} /> Add service
        </Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Service</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Duration</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {SERVICES.map((s) => (
              <tr key={s.id}>
                <td className="px-5 py-4 font-medium text-foreground">{s.name}</td>
                <td className="px-5 py-4 text-muted-foreground">{s.category}</td>
                <td className="px-5 py-4 text-muted-foreground">
                  {formatDuration(s.duration)}
                </td>
                <td className="px-5 py-4 text-foreground">{formatPrice(s.price)}</td>
                <td className="px-5 py-4">
                  <Badge variant="success">Active</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
