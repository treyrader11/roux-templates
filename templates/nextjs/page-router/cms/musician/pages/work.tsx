import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Our Work</title>
      </Head>
      <main className="min-h-screen bg-background px-6 pb-24 pt-32">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
            Portfolio
          </p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-foreground">
            Our Work
          </h1>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-sm border border-border bg-secondary"
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
