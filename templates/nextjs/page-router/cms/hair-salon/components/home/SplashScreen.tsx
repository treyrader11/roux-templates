import { forwardRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { CollectionImage } from "@/lib/collections";

const SEEN_KEY = "rg-splash-seen";

const HIDDEN_CLIP = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
const SHOWN_CLIP = "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)";

// The intro length is DRIVEN BY THE IMAGE COUNT: each uploaded image is
// "featured" for ~`per` seconds (clamped so a big set never runs away), the
// counter ticks across the whole span, and the overlay lifts the instant the
// last image lands — so it never hangs on the final frame.
const FEATURE_SECONDS = 0.7; // target seconds each image is featured
const MIN_FEATURE = 0.3; // floor when there are many images
const MAX_FLICKER = 8; // cap on the total flicker phase (seconds)
const LEAD_IN = 0.8; // brief counter ramp before images start flickering
const HOLD = 0.8; // hold the final image before lifting away
const BANNER = 0.8; // page-in wipe duration

interface SplashScreenProps {
  images: CollectionImage[];
  /**
   * When true, the intro plays once per visitor (remembered in localStorage).
   * When false, it plays on every home-page visit.
   */
  showOnce?: boolean;
}

/**
 * Full-screen intro faithfully ported from the marcella-simien Preloader:
 * a dark page-in banner translates down to reveal a coloured counter panel that
 * ticks to 100% while a padded stack of CMS images clip-reveals and scales
 * behind it; then the panel fades and the whole overlay lifts to expose the
 * page. Only the palette differs from the original.
 */
export default function SplashScreen({
  images,
  showOnce = true,
}: SplashScreenProps) {
  const [show, setShow] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const digit1Ref = useRef<HTMLDivElement>(null);
  const digit2Ref = useRef<HTMLDivElement>(null);
  const digit3Ref = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Decide (client-only) whether to play — matches SSR (null) to avoid mismatch.
  useEffect(() => {
    if (showOnce) {
      if (localStorage.getItem(SEEN_KEY)) return; // already seen — skip.
      localStorage.setItem(SEEN_KEY, "1");
    }
    setShow(true);
  }, [showOnce]);

  useEffect(() => {
    if (!show) return;

    const ctx = gsap.context(() => {
      // Page-in banner: starts covering the screen, then slides down to reveal
      // the counter panel underneath (marcella's #banner-1 / animatePageIn).
      gsap.set(bannerRef.current, { yPercent: 0 });
      gsap.to(bannerRef.current, {
        yPercent: 100,
        duration: BANNER,
        ease: "power4.inOut",
      });

      // Build the extra rolling numbers for the third (units) digit so it lands
      // on a final "0" → the three columns read 1 · 0 · 0 = 100%.
      if (digit3Ref.current) {
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 10; j++) {
            const div = document.createElement("div");
            div.className = "num";
            div.textContent = j.toString();
            digit3Ref.current.appendChild(div);
          }
        }
        const finalDigit = document.createElement("div");
        finalDigit.className = "num";
        finalDigit.textContent = "0";
        digit3Ref.current.appendChild(finalDigit);
      }

      // Derive the whole timeline from the image count.
      const n = Math.max(1, images.length);
      const per = Math.max(MIN_FEATURE, Math.min(FEATURE_SECONDS, MAX_FLICKER / n));
      const flickerDur = per * n; // total time the images flicker through
      const revealStart = LEAD_IN;
      const countEnd = revealStart + flickerDur; // last image lands + count done
      const liftAt = countEnd + HOLD;
      // marcella's counter timeline is authored to finish (bar fully faded) at
      // ~10.5s; scale it so the counter reaches 100% exactly as the last image
      // lands, whatever the image count.
      const sc = countEnd / 10.5;

      const animate = (
        digit: HTMLDivElement | null,
        duration: number,
        delay = 1
      ) => {
        if (!digit) return;
        const numHeight =
          digit.querySelector<HTMLDivElement>(".num")?.clientHeight || 0;
        const totalDistance =
          (digit.querySelectorAll(".num").length - 1) * numHeight;
        gsap.to(digit, {
          y: -totalDistance,
          duration: duration * sc,
          delay: delay * sc,
          ease: "power2.inOut",
        });
      };

      // Marcella's cadence, scaled to land on 100% at `countEnd`.
      animate(digit3Ref.current, 5);
      animate(digit2Ref.current, 6);
      animate(digit1Ref.current, 2, 5);

      // Flicker the padded image stack — each image featured for `per` seconds,
      // clip-revealing over the one before it and ending on the last upload.
      if (imagesRef.current) {
        gsap.to(imagesRef.current.querySelectorAll("img"), {
          clipPath: SHOWN_CLIP,
          duration: per * 0.95,
          ease: "power4.inOut",
          stagger: per,
          delay: revealStart,
        });
      }
      // Ken-Burns zoom that runs across the WHOLE flicker (padding frame stays
      // fixed; only the images inside it scale).
      gsap.to(imagesRef.current, {
        scale: 1.3,
        duration: flickerDur,
        ease: "power2.out",
        delay: revealStart,
      });

      gsap.to(progressBarRef.current, {
        width: "30%",
        duration: 2 * sc,
        ease: "power4.inOut",
        delay: 7 * sc,
      });
      gsap.to(progressBarRef.current, {
        width: "100%",
        opacity: 0,
        duration: 2 * sc,
        ease: "power3.out",
        delay: 8.5 * sc,
        onComplete: () => {
          if (panelRef.current) gsap.set(panelRef.current, { display: "none" });
        },
      });

      // Lift the overlay away the instant the last image lands (+ a short hold).
      gsap.to(rootRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        delay: liftAt,
        onComplete: () => setShow(false),
      });
    }, rootRef);

    return () => ctx.revert();
  }, [show, images.length]);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] overflow-hidden bg-brand"
      aria-hidden="true"
    >
      {/* Padded image frame (marcella's p-12 hero). Sits ABOVE the counter
          panel so the clip-reveal wipes in over it (as in marcella), while the
          fixed frame keeps the padding and the inner layer zooms inside it. */}
      <div className="absolute inset-0 z-20 p-6 md:p-12">
        <div className="relative h-full w-full overflow-hidden">
          <div ref={imagesRef} className="absolute inset-0">
            {images.map((img) => (
              <Image
                key={img.id}
                src={img.url}
                alt=""
                fill
                priority
                sizes="100vw"
                style={{ clipPath: HIDDEN_CLIP }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Counter panel — coloured overlay, bottom-right (marcella bg-primary-300) */}
      <div
        ref={panelRef}
        className={cn(
          "fixed right-0 top-0 z-10 flex h-full w-[200%] items-end justify-end gap-2 overflow-hidden p-[2em]",
          "bg-brand font-display text-brand-foreground"
        )}
      >
        <p className="w-max text-4xl uppercase leading-[60px] md:text-6xl">
          Loading
        </p>
        <div
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100px, 0 100px)" }}
          className="counter flex h-[100px] text-6xl leading-[160px] md:text-8xl md:leading-[80px]"
        >
          <Digit ref={digit1Ref} range={[0, 1]} />
          <Digit ref={digit2Ref} range={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]} />
          <Digit ref={digit3Ref} range={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} />
          <div className="-mt-4 md:mt-0">%</div>
        </div>
        <div
          ref={progressBarRef}
          className="progress-bar relative top-[-15px] h-1 w-0 bg-neutral-950"
        />
      </div>

      {/* Page-in banner — dark, slides down to reveal the counter panel */}
      <div ref={bannerRef} className="fixed inset-0 z-30 bg-neutral-950" />
    </div>
  );
}

type DigitProps = { range: number[] };

const Digit = forwardRef<HTMLDivElement, DigitProps>(({ range }, ref) => (
  <div ref={ref} className="digit relative -top-3.5 md:top-3.5">
    {range.map((num, i) => (
      <div key={i} className="num">
        {num}
      </div>
    ))}
  </div>
));

Digit.displayName = "Digit";
