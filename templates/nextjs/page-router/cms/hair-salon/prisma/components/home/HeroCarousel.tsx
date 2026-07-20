import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { CollectionImage } from "@/lib/collections";

const AUTO_DELAY = 5000;
const DRAG_BUFFER = 50;

const SPRING = { type: "spring", mass: 3, stiffness: 400, damping: 50 } as const;

// Same clip-path wipe the marcella-simien preloader uses to reveal its images.
const HIDDEN_CLIP = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
const SHOWN_CLIP = "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)";

interface HeroCarouselProps {
  images: CollectionImage[];
}

/**
 * Full-width, draggable image carousel (ported from the marcella-simien slider).
 * Auto-advances and supports swipe/drag. Images are CMS-managed. The image box
 * carries marcella's p-12 padding and clip-reveals + scales as it enters view.
 */
export function HeroCarousel({ images }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const dragX = useMotionValue(0);
  const total = images.length;

  const revealRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => {
      if (dragX.get() === 0) {
        setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
      }
    }, AUTO_DELAY);
    return () => clearInterval(id);
  }, [dragX, total]);

  // Marcella-style entrance: clip-path wipe + slow scale when the box enters
  // view. Cleans up its ScrollTriggers on unmount.
  useEffect(() => {
    if (total === 0) return;
    const el = revealRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      tl.fromTo(
        el,
        { clipPath: HIDDEN_CLIP },
        { clipPath: SHOWN_CLIP, duration: 1, ease: "power4.inOut" }
      ).fromTo(
        scaleRef.current,
        { scale: 1 },
        { scale: 1.3, duration: 3, ease: "power3.inOut" },
        0
      );
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [total]);

  if (total === 0) return null;

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_BUFFER && index < total - 1) setIndex((p) => p + 1);
    else if (x >= DRAG_BUFFER && index > 0) setIndex((p) => p - 1);
  };

  return (
    <section className="w-full border-t border-border bg-muted">
      <div className="p-6 md:p-12">
        {/* Reveal wrapper — clip-path wipe; overflow-hidden = slider viewport */}
        <div
          ref={revealRef}
          className="relative overflow-hidden"
          style={{ clipPath: HIDDEN_CLIP }}
        >
          {/* Scale wrapper — Ken-Burns zoom; kept off the dots so they don't distort */}
          <div ref={scaleRef}>
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              style={{ x: dragX }}
              animate={{ translateX: `-${index * 100}%` }}
              transition={SPRING}
              onDragEnd={onDragEnd}
              className="flex cursor-grab active:cursor-grabbing"
            >
              {images.map((img) => (
                <div
                  key={img.id}
                  className="relative h-[45vh] w-full shrink-0 sm:h-[60vh] lg:h-[72vh]"
                >
                  <Image
                    src={img.url}
                    alt={img.alt ?? ""}
                    fill
                    sizes="100vw"
                    className="pointer-events-none select-none object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {total > 1 && (
            <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={cn(
                    "h-2.5 rounded-full transition-all",
                    i === index ? "w-6 bg-brand" : "w-2.5 bg-white/70"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
