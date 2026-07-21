import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { SITE_NAME } from "@/lib/content";
import GrainOverlay from "@/components/ui/GrainOverlay";

export default function SignInPage() {
  const router = useRouter();
  const callbackUrl =
    typeof router.query.callbackUrl === "string"
      ? router.query.callbackUrl
      : "/admin";
  const [error, setError] = useState<string | null>(
    typeof router.query.error === "string" ? router.query.error : null,
  );
  const [pending, setPending] = useState(false);

  async function onCredentials(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const data = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });
    setPending(false);
    if (res?.error) setError("CredentialsSignin");
    else router.push(callbackUrl);
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="min-h-screen bg-background flex items-center justify-center relative px-4">
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
              Sign in to continue
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-sm mb-6">
              Authentication failed. Check your details and try again.
            </div>
          )}

          <div className="bg-card border border-border rounded-sm p-8 space-y-4">
            <button
              onClick={() => signIn("google", { callbackUrl })}
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

            <button
              onClick={() => signIn("apple", { callbackUrl })}
              className="w-full flex items-center justify-center gap-3 bg-secondary hover:bg-secondary/80 text-foreground border border-border px-4 py-3 rounded-sm text-sm transition-colors uppercase tracking-wider"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Continue with Apple
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <form onSubmit={onCredentials} className="space-y-4">
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
                  className="w-full bg-secondary border border-border text-foreground px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={pending}
                className="w-full bg-accent text-accent-foreground px-4 py-3 rounded-sm text-sm font-medium hover:bg-accent/90 transition-colors uppercase tracking-wider disabled:opacity-50"
              >
                {pending ? "Signing in…" : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground pt-4">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-accent hover:text-accent/80 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
