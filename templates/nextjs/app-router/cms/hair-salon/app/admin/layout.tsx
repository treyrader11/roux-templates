import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/layout/AdminSidebar";

// Admin is protected: in production an unauthenticated visitor is redirected to
// sign in. In development the guard is relaxed so you can preview the CMS before
// wiring up an auth provider (add one with `rouxui create`).
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session && process.env.NODE_ENV === "production") {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
