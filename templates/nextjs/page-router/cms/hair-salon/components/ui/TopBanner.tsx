import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { DEFAULT_SITE_BANNER, type SiteBanner } from "@/lib/site-defaults";

interface TopBannerProps {
  storageKey?: string;
}

/**
 * Dismissible site-wide announcement bar. Fetches its copy from the CMS
 * (`/api/site-banner`) on mount and persists dismissal in localStorage so it
 * stays gone across navigations and refreshes until storage is cleared.
 */
export function TopBanner({ storageKey = "top-banner-dismissed" }: TopBannerProps) {
  const [banner, setBanner] = useState<SiteBanner | null>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(localStorage.getItem(storageKey) === "true");

    let active = true;
    fetch("/api/site-banner")
      .then((res) => (res.ok ? res.json() : DEFAULT_SITE_BANNER))
      .then((data: SiteBanner) => {
        if (active) setBanner(data);
      })
      .catch(() => {
        if (active) setBanner(DEFAULT_SITE_BANNER);
      });

    return () => {
      active = false;
    };
  }, [storageKey]);

  const dismiss = () => {
    localStorage.setItem(storageKey, "true");
    setDismissed(true);
  };

  if (!banner || !banner.enabled || !banner.message || dismissed) return null;

  return (
    <div className="relative w-full bg-brand px-10 py-3 text-center text-sm font-semibold uppercase tracking-widest text-white">
      <span>{banner.message}</span>
      <button
        onClick={dismiss}
        aria-label="Dismiss banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 hover:opacity-80 transition-opacity"
      >
        <X size={16} />
      </button>
    </div>
  );
}
