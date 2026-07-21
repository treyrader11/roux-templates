import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { SITE_NAME } from "@/lib/content";
import GrainOverlay from "@/components/ui/GrainOverlay";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (password !== data.get("confirm")) {
      setError("Passwords do not match.");
      return;
    }

    setPending(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.get("name"), email, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not create your account.");
      }
      // Auto sign-in after registration.
      await signIn("credentials", { email, password, redirect: false });
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="min-h-screen bg-background flex items-center justify-center relative px-4 py-16">
        <GrainOverlay />
        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="font-heading text-3xl font-bold text-foreground"
            >
              {SITE_NAME}
            </Link>
            <p className="text-muted-foreground text-sm uppercase tracking-wider mt-2">
              Create your account
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-sm mb-6">
              {error}
            </div>
          )}

          <div className="bg-card border border-border rounded-sm p-8 space-y-4">
            <button
              onClick={() => signIn("google", { callbackUrl: "/admin" })}
              className="w-full flex items-center justify-center gap-3 bg-secondary hover:bg-secondary/80 text-foreground border border-border px-4 py-3 rounded-sm text-sm transition-colors uppercase tracking-wider"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full bg-secondary border border-border text-foreground px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-secondary border border-border text-foreground px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  className="w-full bg-secondary border border-border text-foreground px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                  Confirm Password
                </label>
                <input
                  name="confirm"
                  type="password"
                  required
                  minLength={8}
                  className="w-full bg-secondary border border-border text-foreground px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={pending}
                className="w-full bg-accent text-accent-foreground px-4 py-3 rounded-sm text-sm font-medium hover:bg-accent/90 transition-colors uppercase tracking-wider disabled:opacity-50"
              >
                {pending ? "Creating…" : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground pt-4">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-accent hover:text-accent/80 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
