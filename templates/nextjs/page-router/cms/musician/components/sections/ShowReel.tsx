import { PlayCircle } from "lucide-react";
import GrainOverlay from "@/components/ui/GrainOverlay";

export default function ShowReel() {
  return (
    <section className="relative overflow-hidden bg-background">
      <GrainOverlay />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
            Show Reel
          </p>
          <h2 className="mt-3 font-heading text-4xl font-bold text-foreground">
            See It In Motion
          </h2>
        </div>

        <div className="group relative mx-auto flex aspect-video max-w-4xl items-center justify-center overflow-hidden rounded-sm border border-border bg-secondary">
          {/* Replace with an <iframe> / <video> embed of your reel. */}
          <button
            className="flex flex-col items-center gap-3 text-foreground transition-colors hover:text-accent"
            aria-label="Play reel"
          >
            <PlayCircle size={64} strokeWidth={1} />
            <span className="text-sm uppercase tracking-wider">Play Reel</span>
          </button>
        </div>
      </div>
    </section>
  );
}
