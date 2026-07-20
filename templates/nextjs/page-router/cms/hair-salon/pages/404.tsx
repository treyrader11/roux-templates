import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-5 py-32 text-center">
      <span className="font-display text-6xl text-brand">404</span>
      <h1 className="mt-4 font-display text-3xl text-foreground">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <LinkButton href="/" className="mt-8">
        Back home
      </LinkButton>
    </div>
  );
}
