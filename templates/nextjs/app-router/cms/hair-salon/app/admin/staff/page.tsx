import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { STYLISTS } from "@/lib/content";

export default function AdminStaffPage() {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-foreground">Staff</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your stylist profiles.
          </p>
        </div>
        <Button size="sm" className="shrink-0">
          <Plus size={16} /> Add stylist
        </Button>
      </div>

      <div className="mt-8 space-y-3">
        {STYLISTS.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-muted">
              <Image src={s.image} alt={s.name} fill className="object-cover" sizes="56px" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground">{s.name}</p>
              <p className="text-sm text-brand">{s.role}</p>
              <p className="truncate text-sm text-muted-foreground">{s.bio}</p>
            </div>
            <Badge variant="success">Active</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
