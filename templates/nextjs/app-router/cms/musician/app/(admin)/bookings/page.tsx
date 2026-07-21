import AdminHeader from "@/components/admin/AdminHeader";

export default function Page() {
  return (
    <div>
      <AdminHeader title="Bookings" description="View and manage booking requests." />
      <div className="overflow-hidden rounded-sm border border-border">
        <table className="w-full text-sm">
          <thead className="bg-card">
            <tr>
          <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">Client</th>
          <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">Event</th>
          <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">Date</th>
          <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={4}
                className="px-4 py-16 text-center text-muted-foreground"
              >
                No records yet — connect your database and add some.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
