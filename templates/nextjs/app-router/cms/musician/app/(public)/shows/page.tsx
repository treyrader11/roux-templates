export default function Page() {
  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-32">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
          Live Dates
        </p>
        <h1 className="mt-3 font-heading text-5xl font-bold text-foreground">
          Shows
        </h1>
        <div className="mt-12 space-y-4">
          {["Aug 14 · New Orleans, LA", "Sep 02 · Austin, TX", "Oct 19 · Nashville, TN"].map(
            (show) => (
              <div
                key={show}
                className="flex items-center justify-between rounded-sm border border-border bg-card px-6 py-5"
              >
                <span className="text-foreground">{show}</span>
                <span className="text-sm uppercase tracking-wider text-accent">
                  Tickets
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </main>
  );
}
