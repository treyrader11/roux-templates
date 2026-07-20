import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import CustomEase from "gsap/CustomEase";
import { cn } from "@/lib/utils";
import { NAV_LINKS, BOOKING_HREF, SITE_NAME } from "@/constants/site";
import { LinkButton } from "@/components/ui/button";
import { FlipLink } from "@/components/ui/FlipLink";
import { ThemeToggle } from "@/components/layout/theme-toggle";

// The signature marcella-simien menu reveal: a custom "hop" ease + a vertical
// clip-path wipe, with links/details staggering in.
const HOP = "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1";
const OPEN_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const CLOSING_CLIP = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
const HIDDEN_CLIP = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";

/**
 * Mobile navigation ported from the marcella-simien Nav: a circular morphing
 * menu button and a full-screen clip-path menu with staggered links. Rendered
 * only below `md`; the desktop inline nav stays untouched.
 */
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    if (!CustomEase.get("hop")) CustomEase.create("hop", HOP);
  }, []);

  // Prime the hidden state so nothing flashes before the first open.
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const items = menu.querySelectorAll(".reveal-item");
    gsap.set(items, { y: 30, opacity: 0 });
    initializedRef.current = true;
  }, []);

  const animateMenu = useCallback((open: boolean) => {
    const menu = menuRef.current;
    if (!menu) return;
    const items = menu.querySelectorAll(".reveal-item");
    setIsAnimating(true);

    if (open) {
      gsap.to(menu, {
        clipPath: OPEN_CLIP,
        ease: "hop",
        duration: 1.25,
        onStart: () => {
          menu.style.pointerEvents = "all";
        },
        onComplete: () => setIsAnimating(false),
      });
      gsap.to(items, {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        delay: 0.55,
        duration: 0.9,
        ease: "power3.out",
      });
    } else {
      gsap.to(menu, {
        clipPath: CLOSING_CLIP,
        ease: "hop",
        duration: 1.25,
        onComplete: () => {
          menu.style.pointerEvents = "none";
          gsap.set(menu, { clipPath: HIDDEN_CLIP });
          gsap.set(items, { y: 30, opacity: 0 });
          setIsAnimating(false);
        },
      });
    }
  }, []);

  useEffect(() => {
    if (initializedRef.current) animateMenu(isOpen);
  }, [isOpen, animateMenu]);

  // Close on route change, and lock body scroll while open.
  useEffect(() => setIsOpen(false), [router.asPath]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Clean up tweens on unmount.
  useEffect(() => {
    const menu = menuRef.current;
    return () => {
      if (menu) {
        gsap.killTweensOf(menu);
        gsap.killTweensOf(menu.querySelectorAll(".reveal-item"));
      }
    };
  }, []);

  const toggleMenu = () => {
    if (!isAnimating) setIsOpen((v) => !v);
  };

  return (
    <div className="md:hidden">
      <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />

      <div
        ref={menuRef}
        style={{ clipPath: HIDDEN_CLIP }}
        className={cn(
          "menu pointer-events-none fixed inset-0 z-40 flex h-[100dvh] flex-col justify-between",
          "bg-neutral-900 px-8 pb-10 pt-24 text-white"
        )}
      >
        <nav>
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="overflow-hidden">
                <FlipLink
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="reveal-item font-display text-4xl leading-tight text-white"
                >
                  {link.label}
                </FlipLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-5">
          <LinkButton
            href={BOOKING_HREF}
            className="reveal-item w-full justify-center"
          >
            Book now
          </LinkButton>
          <div className="reveal-item flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">
              {SITE_NAME} — Modern hair studio
            </p>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

type MenuBtnProps = { isOpen: boolean; toggleMenu: () => void };

function MenuBtn({ isOpen, toggleMenu }: MenuBtnProps) {
  return (
    <button
      type="button"
      onClick={toggleMenu}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      className="menu-toggle group/menu-btn relative z-50 flex h-[52px] w-[52px] cursor-pointer items-center justify-center"
    >
      {/* Circle */}
      <span
        className={cn(
          "flex size-[52px] items-center justify-center overflow-hidden rounded-full bg-brand",
          "transition-transform duration-500 ease-custom",
          isOpen && "scale-[1.08]"
        )}
      >
        {/* Hamburger → X */}
        <span className="relative flex size-[26px] items-center justify-center">
          <span
            className={cn(
              "absolute h-[1.5px] w-[16px] bg-white transition-all duration-300 ease-out",
              isOpen ? "rotate-45" : "-translate-y-[3px]"
            )}
          />
          <span
            className={cn(
              "absolute h-[1.5px] w-[16px] bg-white transition-all duration-300 ease-out",
              isOpen ? "-rotate-45" : "translate-y-[3px]"
            )}
          />
        </span>
      </span>
    </button>
  );
}
