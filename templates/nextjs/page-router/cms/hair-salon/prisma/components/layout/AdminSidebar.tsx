import Link from "next/link";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  Scissors,
  ImageIcon,
  CalendarCheck,
  Users,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/content";

const ADMIN_LINKS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Services", href: "/admin/services", icon: Scissors },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { label: "Staff", href: "/admin/staff", icon: Users },
];

export default function AdminSidebar() {
  const router = useRouter();

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-card">
      <div className="border-b border-border px-6 py-5">
        <Link href="/admin" className="font-display text-lg text-foreground">
          {SITE.name}
        </Link>
        <p className="mt-0.5 text-xs text-muted-foreground">Admin</p>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {ADMIN_LINKS.map((link) => {
          const active =
            link.href === "/admin"
              ? router.pathname === "/admin"
              : router.pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-brand/10 text-brand"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft size={18} />
          Back to site
        </Link>
      </div>
    </aside>
  );
}
