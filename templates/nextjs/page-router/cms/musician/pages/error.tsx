import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import GrainOverlay from "@/components/ui/GrainOverlay";

const MESSAGES: Record<string, string> = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The sign-in link is no longer valid.",
  Default: "Something went wrong while signing you in.",
};

export default function AuthErrorPage() {
  const router = useRouter();
  const error =
    typeof router.query.error === "string" ? router.query.error : "Default";
  const message = MESSAGES[error] ?? MESSAGES.Default;

  return (
    <>
      <Head>
        <title>Authentication Error</title>
      </Head>
      <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
        <GrainOverlay />
        <div className="relative z-10 w-full max-w-md text-center">
          <p className="font-heading text-6xl font-bold text-accent">!</p>
          <h1 className="mt-4 font-heading text-3xl font-bold text-foreground">
            Authentication Error
          </h1>
          <p className="mt-3 text-muted-foreground">{message}</p>
          <Link
            href="/sign-in"
            className="mt-8 inline-flex rounded-sm bg-accent px-6 py-3 text-sm font-medium uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </>
  );
}
