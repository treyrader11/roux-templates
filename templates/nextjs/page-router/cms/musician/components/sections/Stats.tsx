import { STATS } from "@/lib/content";

export default function Stats() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-16 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-heading text-4xl font-bold text-accent md:text-5xl">
              {s.value}
            </p>
            <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
