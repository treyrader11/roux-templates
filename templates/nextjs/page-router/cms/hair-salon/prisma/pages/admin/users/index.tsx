import type { GetServerSideProps } from "next";
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/input";
import { requireAdminSession } from "@/lib/admin-guard";
import { useCrud } from "@/hooks/useCrud";
import { Trash2 } from "lucide-react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = await requireAdminSession(ctx);
  if (redirect) return redirect;
  return { props: {} };
};

type UserRow = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
};

const EMPTY = { name: "", email: "", password: "", role: "USER" };

export default function AdminUsers() {
  const { items, loading, error, create, remove } =
    useCrud<UserRow>("/api/admin/users");
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const submit = async () => {
    setBusy(true);
    setFormError(null);
    try {
      await create(form);
      setForm(EMPTY);
    } catch {
      setFormError("Could not create user (they may already exist).");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminLayout backHref="/admin" backLabel="Dashboard">
      <h1 className="mb-6 font-display text-2xl text-foreground">Users</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-medium text-foreground">Add user</h2>
          <Field label="Name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Email">
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>
          <Field label="Password">
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </Field>
          <Field label="Role">
            <Select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </Select>
          </Field>
          <Button onClick={submit} disabled={busy || !form.email || !form.password}>
            {busy ? "Creating..." : "Add user"}
          </Button>
          {formError && <p className="text-sm text-red-500">{formError}</p>}
        </div>

        <div>
          {loading && <p className="text-muted-foreground">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-3">
            {items.map((u) => (
              <div key={u.id} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
                <div>
                  <p className="font-medium text-foreground">{u.name ?? u.email}</p>
                  <p className="text-sm text-muted-foreground">
                    {u.email} · {u.role}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(u.id)}
                  className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"
                  aria-label="Delete user"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
