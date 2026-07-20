import { cn } from "@/lib/utils";
import { BOOKING_HREF, NAV_LINKS, SITE_NAME } from "@/constants/site";
import { LinkButton } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import MobileMenu from "@/components/layout/MobileMenu";
import NavLogo from "@/components/ui/NavLogo";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" aria-label={SITE_NAME} className="inline-flex items-center">
          <NavLogo size={40} alt="" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => {
            const active = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-brand",
                  active ? "text-brand" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LinkButton href={BOOKING_HREF} size="sm" className="hidden sm:inline-flex">
            Book now
          </LinkButton>
          {/* Mobile: marcella-style morphing button + full-screen clip-path menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
