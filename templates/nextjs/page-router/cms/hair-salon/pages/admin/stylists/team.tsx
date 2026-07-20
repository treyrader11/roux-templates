import type { GetServerSideProps } from "next";
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import ImageUploadSlot from "@/components/admin/ImageUploadSlot";
import { requireAdminSession } from "@/lib/admin-guard";
import { useCrud } from "@/hooks/useCrud";
import { Trash2, Pencil } from "lucide-react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = await requireAdminSession(ctx);
  if (redirect) return redirect;
  return { props: {} };
};

type StylistRow = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string | null;
  instagram: string | null;
  order: number;
};

const EMPTY = { name: "", role: "", bio: "", imageUrl: "", instagram: "", order: 0 };

export default function AdminStylistsTeam() {
  const { items, loading, error, create, update, remove } =
    useCrud<StylistRow>("/api/admin/stylists");
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

  const startEdit = (s: StylistRow) => {
    setEditingId(s.id);
    setForm({
      name: s.name,
      role: s.role,
      bio: s.bio,
      imageUrl: s.imageUrl ?? "",
      instagram: s.instagram ?? "",
      order: s.order,
    });
  };

  return (
    <AdminLayout backHref="/admin/stylists" backLabel="Stylists">
      <h1 className="mb-6 font-display text-2xl text-foreground">Team</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-medium text-foreground">
            {editingId ? "Edit stylist" : "Add stylist"}
          </h2>
          <ImageUploadSlot
            label="Photo"
            slug={`stylist-${editingId ?? "new"}`}
            currentImageUrl={form.imageUrl || undefined}
            folder="reverse-gen/stylists"
            onUploadSuccess={(_slug, url) => setForm((f) => ({ ...f, imageUrl: url }))}
            onDelete={() => setForm((f) => ({ ...f, imageUrl: "" }))}
          />
          <Field label="Name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Role">
            <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Senior Colorist" />
          </Field>
          <Field label="Bio">
            <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Instagram URL">
              <Input value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
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
            {items.map((s) => (
              <div key={s.id} className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4">
                <div>
                  <p className="font-medium text-foreground">{s.name}</p>
                  <p className="text-sm text-brand">{s.role}</p>
                  <p className="text-sm text-muted-foreground">{s.bio}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button type="button" onClick={() => startEdit(s)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Edit">
                    <Pencil size={15} />
                  </button>
                  <button type="button" onClick={() => remove(s.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-500/10" aria-label="Delete">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
            {!loading && items.length === 0 && (
              <p className="text-muted-foreground">No stylists yet.</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
