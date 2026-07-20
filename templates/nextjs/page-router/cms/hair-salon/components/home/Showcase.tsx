import Image from "next/image";
import { useState, useEffect } from "react";

export interface ShowcaseItem {
  id: string;
  imageUrl: string;
  name: string;
  subtitle?: string | null;
  price?: string | null;
  href?: string | null;
}

interface ShowcaseProps {
  title?: string;
  items: ShowcaseItem[];
  /** Seconds between auto-advances. Defaults to 3 when unset/invalid. */
  autoplaySeconds?: number;
}

const DESKTOP_VISIBLE = 4;
const DEFAULT_AUTOPLAY_SECONDS = 3;
const TRANSITION_MS = 600;
const mod = (n: number, m: number) => ((n % m) + m) % m;

export function Showcase({
  title = "Premium Style, Endless Options",
  items,
  autoplaySeconds,
}: ShowcaseProps) {
  const [index, setIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const [paused, setPaused] = useState(false);

  const total = items.length;
  const intervalMs =
    (autoplaySeconds && autoplaySeconds > 0
      ? autoplaySeconds
      : DEFAULT_AUTOPLAY_SECONDS) * 1000;

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  // Auto-advance.
  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => setIndex((i) => i + 1), intervalMs);
    return () => clearInterval(id);
  }, [paused, total, intervalMs]);

  // Seamless loop: once the track has slid onto the cloned items past either
  // end, snap back to the matching real item with the transition disabled, so
  // the jump is invisible.
  useEffect(() => {
    if (total <= 1) return;
    if (index >= total) {
      const t = setTimeout(() => {
        setWithTransition(false);
        setIndex(0);
      }, TRANSITION_MS);
      return () => clearTimeout(t);
    }
    if (index < 0) {
      const t = setTimeout(() => {
        setWithTransition(false);
        setIndex(total - 1);
      }, TRANSITION_MS);
      return () => clearTimeout(t);
    }
  }, [index, total]);

  // Re-enable the transition on the frame after a snap.
  useEffect(() => {
    if (!withTransition) {
      const r = requestAnimationFrame(() =>
        requestAnimationFrame(() => setWithTransition(true)),
      );
      return () => cancelAnimationFrame(r);
    }
  }, [withTransition]);

  // A sliding track for `visible` cards, with `visible` clones on each end.
  const renderTrack = (visible: number, gapClass: string) => {
    const lead = Array.from({ length: visible }, (_, k) =>
      items[mod(total - visible + k, total)],
    );
    const trail = Array.from({ length: visible }, (_, k) => items[mod(k, total)]);
    const extended = [...lead, ...items, ...trail];
    const step = 100 / visible; // percent of the viewport per card
    const translate = (index + visible) * step;

    return (
      <div className="overflow-hidden px-6 sm:px-12">
        <div
          className="flex"
          style={{
            transform: `translateX(-${translate}%)`,
            transition: withTransition
              ? `transform ${TRANSITION_MS}ms ease`
              : "none",
          }}
        >
          {extended.map((item, k) => (
            <div
              key={k}
              style={{ flex: `0 0 ${step}%` }}
              className={gapClass}
            >
              <ShowcaseCard item={item} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      className="w-full border-t border-border py-8 sm:py-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Header row */}
      <div className="flex items-center justify-between px-6 sm:px-12 mb-6">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-semibold text-foreground whitespace-nowrap">
            {title}
          </h2>
          {/* Decorative rule — matches mock */}
          <div className="flex-1 h-px bg-brand opacity-50 hidden sm:block" />
        </div>

        {/* Prev / Next arrows */}
        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          <button
            onClick={prev}
            aria-label="Previous"
            className="flex h-8 w-8 items-center justify-center border border-border rounded hover:border-brand hover:text-brand transition-colors text-foreground"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="flex h-8 w-8 items-center justify-center border border-border rounded hover:border-brand hover:text-brand transition-colors text-foreground"
          >
            ›
          </button>
        </div>
      </div>

      {/* ── Desktop — 4 cards visible ── */}
      <div className="hidden sm:block">{renderTrack(DESKTOP_VISIBLE, "pr-4")}</div>

      {/* ── Mobile — 1 card visible ── */}
      <div className="sm:hidden">{renderTrack(1, "")}</div>

      {/* Dot indicators — mobile only */}
      <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={[
              "h-1.5 rounded-full transition-all",
              i === mod(index, total) ? "w-5 bg-brand" : "w-1.5 bg-border",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  return (
    <a
      href={item.href ?? "#"}
      className="group flex flex-col border border-border bg-card rounded overflow-hidden hover:border-brand transition-colors"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 25vw"
        />
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4 flex flex-col gap-1">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
          {item.name}
        </h3>
        {item.subtitle && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {item.subtitle}
          </p>
        )}
        {item.price && (
          <p className="text-sm font-semibold text-foreground mt-1">
            {item.price}
          </p>
        )}
        <button className="mt-2 w-full rounded border border-border py-1.5 text-xs font-medium text-foreground hover:border-brand hover:text-brand transition-colors">
          Select options
        </button>
      </div>
    </a>
  );
}
