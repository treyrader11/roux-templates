import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="max-w-xs">
            <p className="font-display text-lg text-foreground">{SITE.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">{SITE.tagline}</p>
            <div className="mt-4 flex gap-3">
              <a
                href={SITE.social.instagram}
                aria-label="Instagram"
                className="text-muted-foreground hover:text-brand"
              >
                <Instagram size={18} />
              </a>
              <a
                href={SITE.social.facebook}
                aria-label="Facebook"
                className="text-muted-foreground hover:text-brand"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <p className="text-xs font-medium uppercase tracking-widest text-brand">
              Explore
            </p>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p className="text-xs font-medium uppercase tracking-widest text-brand">
              Visit
            </p>
            <p>{SITE.address}</p>
            <p>{SITE.phone}</p>
            <p>{SITE.email}</p>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          © {year} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
