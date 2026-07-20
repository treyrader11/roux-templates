import type { GetServerSideProps } from "next";
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import SectionEditor from "@/components/admin/SectionEditor";
import ImageUploadSlot from "@/components/admin/ImageUploadSlot";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { createSectionGSSP } from "@/lib/admin-section";
import { useCrud } from "@/hooks/useCrud";
import {
  DEFAULT_HOME_SHOWCASE,
  HOME_SECTION_SLUGS,
  SHOWCASE_AUTOPLAY_OPTIONS,
  type HomeShowcase,
} from "@/lib/home-defaults";
import { Trash2, Pencil } from "lucide-react";

export const getServerSideProps: GetServerSideProps<{ initial: HomeShowcase }> =
  createSectionGSSP(HOME_SECTION_SLUGS.showcase, DEFAULT_HOME_SHOWCASE);

type ShowcaseRow = {
  id: string;
  imageUrl: string;
  publicId: string;
  name: string;
  subtitle: string | null;
  price: string | null;
  href: string | null;
  order: number;
};

const EMPTY = {
  imageUrl: "",
  publicId: "",
  name: "",
  subtitle: "",
  price: "",
  href: "",
  order: 0,
};

export default function AdminHomeShowcase({
  initial,
}: {
  initial: HomeShowcase;
}) {
  const { items, loading, error, create, update, remove } =
    useCrud<ShowcaseRow>("/api/admin/showcase");
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

  const startEdit = (s: ShowcaseRow) => {
    setEditingId(s.id);
    setForm({
      imageUrl: s.imageUrl,
      publicId: s.publicId,
      name: s.name,
      subtitle: s.subtitle ?? "",
      price: s.price ?? "",
      href: s.href ?? "",
      order: s.order,
    });
  };

  return (
    <AdminLayout backHref="/admin/home" backLabel="Home Page">
      <h1 className="mb-2 font-display text-2xl text-foreground">Showcase Carousel</h1>
      <p className="mb-6 max-w-xl text-sm text-muted-foreground">
        The sliding carousel below the hero. Add as many cards as you like — each
        needs an image; name, subtitle, price, and link are optional. The
        carousel updates automatically.
      </p>

      {/* Section title */}
      <div className="mb-8">
        <SectionEditor
          slug={HOME_SECTION_SLUGS.showcase}
          initialData={initial}
          previewHref="/"
        >
          {({ data, update: updateField, inputStyles }) => (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Section title">
                <input
                  className={inputStyles}
                  value={data.title}
                  onChange={(e) => updateField("title", e.target.value)}
                />
              </Field>
              <Field label="Auto-slide every">
                <select
                  className={inputStyles}
                  value={data.autoplaySeconds ?? DEFAULT_HOME_SHOWCASE.autoplaySeconds}
                  onChange={(e) =>
                    updateField("autoplaySeconds", Number(e.target.value))
                  }
                >
                  {SHOWCASE_AUTOPLAY_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s} {s === 1 ? "second" : "seconds"}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          )}
        </SectionEditor>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Form */}
        <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-medium text-foreground">
            {editingId ? "Edit card" : "Add card"}
          </h2>
          <ImageUploadSlot
            label="Card image"
            slug={`showcase-${editingId ?? "new"}`}
            currentImageUrl={form.imageUrl || undefined}
            folder="reverse-gen/showcase"
            onUploadSuccess={(_slug, url, publicId) =>
              setForm((f) => ({ ...f, imageUrl: url, publicId }))
            }
            onDelete={() => setForm((f) => ({ ...f, imageUrl: "", publicId: "" }))}
          />
          <Field label="Name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Subtitle">
              <Input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            </Field>
            <Field label="Price">
              <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="$29" />
            </Field>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Link (optional)">
              <Input value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} placeholder="/services" />
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
            <Button
              onClick={submit}
              disabled={busy || (!editingId && !form.imageUrl)}
            >
              {busy ? "Saving..." : editingId ? "Update" : "Add card"}
            </Button>
            {editingId && (
              <Button variant="ghost" onClick={() => { setEditingId(null); setForm(EMPTY); }}>
                Cancel
              </Button>
            )}
          </div>
          {!editingId && !form.imageUrl && (
            <p className="text-xs text-muted-foreground">
              Upload an image to enable “Add card”.
            </p>
          )}
        </div>

        {/* List */}
        <div>
          {loading && <p className="text-muted-foreground">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-3">
            {items.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.imageUrl}
                    alt={s.name}
                    className="h-14 w-12 shrink-0 rounded object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">
                      {s.name || "Untitled"}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {[s.subtitle, s.price].filter(Boolean).join(" · ") || "—"}
                    </p>
                  </div>
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
              <p className="text-muted-foreground">No cards yet. Add your first one.</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
