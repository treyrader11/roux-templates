import type { GetServerSideProps } from "next";
import { useState } from "react";
import { desc } from "drizzle-orm";
import AdminLayout from "@/components/admin/AdminLayout";
import { requireAdminSession } from "@/lib/admin-guard";
import { db } from "@/lib/db";
import { booking } from "@/db/schema";
import { cn } from "@/lib/utils";

type BookingRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  stylist: string | null;
  date: string | null;
  time: string | null;
  notes: string | null;
  status: string;
  createdAt: string;
};

export const getServerSideProps: GetServerSideProps<{ bookings: BookingRow[] }> =
  async (ctx) => {
    const redirect = await requireAdminSession(ctx);
    if (redirect) return redirect;

    let bookings: BookingRow[] = [];
    try {
      const rows = await db
        .select()
        .from(booking)
        .orderBy(desc(booking.createdAt));
      bookings = rows.map((b) => ({
        id: b.id,
        name: b.name,
        email: b.email,
        phone: b.phone,
        service: b.service,
        stylist: b.stylist,
        date: b.date,
        time: b.time,
        notes: b.notes,
        status: b.status,
        createdAt: b.createdAt.toISOString(),
      }));
    } catch {
      bookings = [];
    }

    return { props: { bookings } };
  };

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-600",
  CONFIRMED: "bg-emerald-500/10 text-emerald-600",
  CANCELLED: "bg-red-500/10 text-red-500",
};

export default function AdminBookingRequests({
  bookings: initial,
}: {
  bookings: BookingRow[];
}) {
  const [bookings, setBookings] = useState(initial);

  const updateStatus = async (id: string, status: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  return (
    <AdminLayout backHref="/admin/booking" backLabel="Booking">
      <h1 className="mb-6 font-display text-2xl text-foreground">Booking Requests</h1>
      {bookings.length === 0 ? (
        <p className="text-muted-foreground">No booking requests yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-foreground">{b.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {b.email}
                    {b.phone ? ` · ${b.phone}` : ""}
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    STATUS_STYLES[b.status]
                  )}
                >
                  {b.status}
                </span>
              </div>
              <dl className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                <div>Service: {b.service ?? "—"}</div>
                <div>Stylist: {b.stylist ?? "—"}</div>
                <div>
                  Preferred: {b.date ?? "—"} {b.time ?? ""}
                </div>
                <div>Requested: {new Date(b.createdAt).toLocaleDateString()}</div>
              </dl>
              {b.notes && (
                <p className="mt-2 text-sm text-muted-foreground">Notes: {b.notes}</p>
              )}
              <div className="mt-4 flex gap-2">
                {["PENDING", "CONFIRMED", "CANCELLED"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => updateStatus(b.id, s)}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs transition-colors",
                      b.status === s
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-border text-muted-foreground hover:border-brand/40"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
