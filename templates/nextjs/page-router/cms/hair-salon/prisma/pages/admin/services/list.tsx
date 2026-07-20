import type { GetServerSideProps } from "next";
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import { requireAdminSession } from "@/lib/admin-guard";
import { useCrud } from "@/hooks/useCrud";
import { Trash2, Pencil } from "lucide-react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = await requireAdminSession(ctx);
  if (redirect) return redirect;
  return { props: {} };
};

type ServiceRow = {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  category: string | null;
  order: number;
};

const EMPTY = { name: "", description: "", duration: "", price: "", category: "", order: 0 };

export default function AdminServicesList() {
  const { items, loading, error, create, update, remove } =
    useCrud<ServiceRow>("/api/admin/services");
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    try {
      if (editingId) await update(editingId, form);
      else await create(form);
      setForm(EMPTY);
      setEditingId(null);
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (s: ServiceRow) => {
    setEditingId(s.id);
    setForm({
      name: s.name,
      description: s.description,
      duration: s.duration,
      price: s.price,
      category: s.category ?? "",
      order: s.order,
    });
  };

  return (
    <AdminLayout backHref="/admin/services" backLabel="Services">
      <h1 className="mb-6 font-display text-2xl text-foreground">Service Menu</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Form */}
        <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-medium text-foreground">
            {editingId ? "Edit service" : "Add service"}
          </h2>
          <Field label="Name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Description">
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Duration">
              <Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="45 min" />
            </Field>
            <Field label="Price">
              <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="$85+" />
            </Field>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Category">
              <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Color" />
            </Field>
            <Field label="Order">
              <Input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              />
            </Field>
          </div>
          <div className="flex gap-2">
            <Button onClick={submit} disabled={busy || !form.name}>
              {busy ? "Saving..." : editingId ? "Update" : "Add"}
            </Button>
            {editingId && (
              <Button
                variant="ghost"
                onClick={() => {
                  setEditingId(null);
                  setForm(EMPTY);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>

        {/* List */}
        <div>
          {loading && <p className="text-muted-foreground">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-3">
            {items.map((s) => (
              <div
                key={s.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {s.name}{" "}
                    <span className="text-sm text-muted-foreground">{s.price}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => startEdit(s)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                    aria-label="Edit"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(s.id)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"
                    aria-label="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
            {!loading && items.length === 0 && (
              <p className="text-muted-foreground">No services yet. Add your first one.</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
