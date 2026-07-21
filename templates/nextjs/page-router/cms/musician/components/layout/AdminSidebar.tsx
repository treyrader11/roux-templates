import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  CalendarCheck,
  Images,
  Settings,
  LogOut,
} from "lucide-react";
import { SITE_NAME } from "@/lib/content";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Dashboard", href: "/admin", Icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", Icon: FolderKanban },
  { label: "Bookings", href: "/admin/bookings", Icon: CalendarCheck },
  { label: "Media", href: "/admin/media", Icon: Images },
  { label: "Settings", href: "/admin/settings", Icon: Settings },
];

export default function AdminSidebar() {
  const router = useRouter();
  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-card">
      <div className="border-b border-border px-6 py-5">
        <Link href="/" className="font-heading text-lg font-bold text-foreground">
          {SITE_NAME}
        </Link>
        <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
          Admin
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {LINKS.map(({ label, href, Icon }) => {
          const active = router.pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-accent/15 text-accent"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-3 border-t border-border px-6 py-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <LogOut size={18} />
        Sign Out
      </button>
    </aside>
  );
}
