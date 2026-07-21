import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

type Work = {
  title: string;
  type: string;
  year: string;
  client: string;
};

// Placeholder — replace with data from the `projects` table.
const FEATURED: Work[] = [
  { title: "Bayou Nights", type: "Film", year: "2025", client: "A24" },
  { title: "Second Line", type: "Music Video", year: "2024", client: "Independent" },
  { title: "Crescent City", type: "Documentary", year: "2024", client: "PBS" },
  { title: "Golden Hour", type: "Commercial", year: "2023", client: "Nike" },
];

export default function FeaturedWork() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
              Selected Work
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold text-foreground">
              Recent Productions
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent sm:block"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {FEATURED.map((w) => (
            <article
              key={w.title}
              className="group relative aspect-[16/10] overflow-hidden rounded-sm border border-border bg-secondary"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge variant="accent">{w.type}</Badge>
                <h3 className="mt-3 font-heading text-2xl font-bold text-foreground">
                  {w.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {w.client} · {w.year}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
