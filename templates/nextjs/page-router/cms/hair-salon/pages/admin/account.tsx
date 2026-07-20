import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { requireAdminSession } from "@/lib/admin-guard";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps<{
  email: string;
  name: string;
}> = async (ctx) => {
  const redirect = await requireAdminSession(ctx);
  if (redirect) return redirect;
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  return {
    props: {
      email: session?.user?.email ?? "",
      name: session?.user?.name ?? "",
    },
  };
};

export default function AdminAccount({
  email,
  name: initialName,
}: {
  email: string;
  name: string;
}) {
  const [name, setName] = useState(initialName);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [busy, setBusy] = useState(false);

  const save = async () => {
    setBusy(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password: password || undefined }),
      });
      if (!res.ok) throw new Error();
      setPassword("");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminLayout backHref="/admin" backLabel="Dashboard">
      <h1 className="mb-6 font-display text-2xl text-foreground">Account</h1>
      <div className="max-w-md space-y-4 rounded-2xl border border-border bg-card p-6">
        <Field label="Email">
          <Input value={email} disabled />
        </Field>
        <Field label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="New password (leave blank to keep current)">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </Field>
        <Button onClick={save} disabled={busy}>
          {busy ? "Saving..." : "Save changes"}
        </Button>
        {status === "success" && (
          <p className="text-sm text-emerald-500">Saved.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-500">Something went wrong.</p>
        )}
      </div>
    </AdminLayout>
  );
}
