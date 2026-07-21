import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { signIn, auth } from "@/auth";
import { db, isDbConnected } from "@/lib/db";
import { users } from "@/db/schema";
import { SITE_NAME } from "@/lib/content";
import GrainOverlay from "@/components/ui/GrainOverlay";

const ERRORS: Record<string, string> = {
  "no-db": "Database not configured. Add DATABASE_URL to enable sign-up.",
  mismatch: "Passwords do not match.",
  exists: "An account with that email already exists.",
  failed: "Could not create your account. Please try again.",
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const session = await auth();
  if (session) redirect("/dashboard");

  async function register(formData: FormData) {
    "use server";
    if (!isDbConnected) redirect("/sign-up?error=no-db");

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();
    const password = String(formData.get("password") ?? "");
    const confirm = String(formData.get("confirm") ?? "");
    if (password !== confirm) redirect("/sign-up?error=mismatch");

    const [existing] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (existing) redirect("/sign-up?error=exists");

    try {
      const hashed = await bcrypt.hash(password, 10);
      await db.insert(users).values({ name, email, password: hashed });
    } catch {
      redirect("/sign-up?error=failed");
    }

    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative px-4 py-16">
      <GrainOverlay />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            {SITE_NAME}
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-wider">
            Create your account
          </p>
        </div>

        {params.error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-sm mb-6">
            {ERRORS[params.error] ?? ERRORS.failed}
          </div>
        )}

        <div className="bg-card border border-border rounded-sm p-8 space-y-4">
          {/* Google */}
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
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
          </form>

          {/* Apple */}
          <form
            action={async () => {
              "use server";
              await signIn("apple", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-secondary hover:bg-secondary/80 text-foreground border border-border px-4 py-3 rounded-sm text-sm transition-colors uppercase tracking-wider"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Continue with Apple
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <form action={register} className="space-y-4">
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
              className="w-full bg-accent text-accent-foreground px-4 py-3 rounded-sm text-sm font-medium hover:bg-accent/90 transition-colors uppercase tracking-wider"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground pt-4">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
