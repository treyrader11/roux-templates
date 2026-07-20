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

type PackageRow = {
  id: string;
  name: string;
  price: string;
  description: string | null;
  features: string; // JSON string from API
  featured: boolean;
  order: number;
};

const EMPTY = {
  name: "",
  price: "",
  description: "",
  featuresText: "",
  featured: false,
  order: 0,
};

function parseFeatures(raw: string): string[] {
  try {
    const p = JSON.parse(raw);
    return Array.isArray(p) ? p.map(String) : [];
  } catch {
    return [];
  }
}

export default function AdminPricingPackages() {
  const { items, loading, error, create, update, remove } =
    useCrud<PackageRow>("/api/admin/pricing");
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    const payload = {
      name: form.name,
      price: form.price,
      description: form.description,
      features: form.featuresText.split("\n").map((f) => f.trim()).filter(Boolean),
      featured: form.featured,
      order: form.order,
    };
    try {
      if (editingId) await update(editingId, payload as unknown as Partial<PackageRow>);
      else await create(payload as unknown as Partial<PackageRow>);
      setForm(EMPTY);
      setEditingId(null);
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (p: PackageRow) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      price: p.price,
      description: p.description ?? "",
      featuresText: parseFeatures(p.features).join("\n"),
      featured: p.featured,
      order: p.order,
    });
  };

  return (
    <AdminLayout backHref="/admin/pricing" backLabel="Pricing">
      <h1 className="mb-6 font-display text-2xl text-foreground">Packages</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-medium text-foreground">
            {editingId ? "Edit package" : "Add package"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name">
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Price">
              <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="$120" />
            </Field>
          </div>
          <Field label="Description">
            <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <Field label="Features (one per line)">
            <Textarea
              value={form.featuresText}
              onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Featured
            </label>
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
              <Button variant="ghost" onClick={() => { setEditingId(null); setForm(EMPTY); }}>
                Cancel
              </Button>
            )}
          </div>
        </div>

        <div>
          {loading && <p className="text-muted-foreground">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-3">
            {items.map((p) => (
              <div key={p.id} className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4">
                <div>
                  <p className="font-medium text-foreground">
                    {p.name} <span className="text-sm text-muted-foreground">{p.price}</span>
                    {p.featured && <span className="ml-2 rounded-full bg-brand/10 px-2 py-0.5 text-xs text-brand">Featured</span>}
                  </p>
                  <ul className="mt-1 text-sm text-muted-foreground">
                    {parseFeatures(p.features).map((f) => (
                      <li key={f}>· {f}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button type="button" onClick={() => startEdit(p)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Edit">
                    <Pencil size={15} />
                  </button>
                  <button type="button" onClick={() => remove(p.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-500/10" aria-label="Delete">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
            {!loading && items.length === 0 && (
              <p className="text-muted-foreground">No packages yet.</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
