import Link from "next/link";
import { Instagram, Youtube, Music2, Video } from "lucide-react";
import {
  SITE_NAME,
  NAV_LINKS,
  FOOTER_TAGLINE,
  FOOTER_EMAIL,
  FOOTER_PHONE,
  SOCIAL_LINKS,
} from "@/lib/content";

const SOCIALS = [
  { href: SOCIAL_LINKS.instagram, Icon: Instagram, label: "Instagram" },
  { href: SOCIAL_LINKS.youtube, Icon: Youtube, label: "YouTube" },
  { href: SOCIAL_LINKS.spotify, Icon: Music2, label: "Spotify" },
  { href: SOCIAL_LINKS.vimeo, Icon: Video, label: "Vimeo" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-heading text-2xl font-bold text-foreground">
              {SITE_NAME}
            </p>
            <p className="mt-3 text-sm italic text-muted-foreground">
              {FOOTER_TAGLINE}
            </p>
            <div className="mt-6 flex gap-4">
              {SOCIALS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <nav className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Explore
              </p>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground/80 transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Contact
              </p>
              <a
                href={`mailto:${FOOTER_EMAIL}`}
                className="text-sm text-foreground/80 transition-colors hover:text-accent"
              >
                {FOOTER_EMAIL}
              </a>
              <a
                href={`tel:${FOOTER_PHONE}`}
                className="text-sm text-foreground/80 transition-colors hover:text-accent"
              >
                {FOOTER_PHONE}
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-border pt-8 text-xs text-muted-foreground">
          © {year} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
