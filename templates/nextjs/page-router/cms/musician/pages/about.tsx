import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>About Lemon Kelly</title>
      </Head>
      <main className="min-h-screen bg-background px-6 pb-24 pt-32">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
            Who We Are
          </p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-foreground">
            About Lemon Kelly
          </h1>
          <div className="mt-8 max-w-2xl space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Lemon Kelly is a film production and live music collective rooted
              in New Orleans. For over a decade we have told stories through the
              lens and the score.
            </p>
            <p>
              Placeholder copy — edit it in{" "}
              <code className="text-foreground">pages/about.tsx</code>.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
