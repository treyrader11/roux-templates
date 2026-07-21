import AdminHeader from "@/components/admin/AdminHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function SettingsPage() {
  return (
    <div>
      <AdminHeader title="Settings" description="Manage site configuration." />
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Site Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Row label="Site name" value="Lemon Kelly" />
            <Row label="Tagline" value="Film. Music. Vision." />
            <Row label="Contact email" value="hello@lemonkelly.com" />
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground">
          Placeholder — persist these to a `settings` table or your CMS.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
