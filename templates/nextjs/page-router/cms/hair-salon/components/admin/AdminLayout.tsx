import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
  ChevronLeft,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}

export default function AdminLayout({
  children,
  backHref,
  backLabel,
}: AdminLayoutProps) {
  const router = useRouter();
  const { status } = useSession();
  const [dark, setDark] = useState(false);

  // Client-side auth fallback (middleware + getServerSideProps are primary).
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const stored = localStorage.getItem("rg-admin-theme");
    const isDark = stored ? stored === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("rg-admin-theme", next ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/admin" className="flex items-center gap-2 font-display text-lg">
            <LayoutDashboard size={18} className="text-brand" />
            Reverse Gen CMS
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-lg border border-border p-2 hover:bg-muted transition-colors"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className={cn(
                "flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm",
                "hover:bg-muted transition-colors"
              )}
            >
              <LogOut size={15} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        {backHref && (
          <Link
            href={backHref}
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={16} />
            {backLabel ?? "Back"}
          </Link>
        )}
        {children}
      </main>
    </div>
  );
}
