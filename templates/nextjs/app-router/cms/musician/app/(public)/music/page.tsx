export default function Page() {
  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-32">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
          Discography
        </p>
        <h1 className="mt-3 font-heading text-5xl font-bold text-foreground">
          Music
        </h1>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {["Live at Tipitina\x27s", "Bayou Sessions Vol. 2", "Second Line EP"].map(
            (album) => (
              <div
                key={album}
                className="flex items-center justify-between py-5"
              >
                <span className="font-heading text-xl text-foreground">
                  {album}
                </span>
                <span className="text-sm uppercase tracking-wider text-accent">
                  Listen
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </main>
  );
}
