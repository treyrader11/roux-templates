import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function StatsCard({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon: LucideIcon;
}) {
  return (
    <Card className="flex items-center gap-4 p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-accent/15 text-accent">
        <Icon size={20} />
      </span>
      <div>
        <p className="font-heading text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      </div>
    </Card>
  );
}
