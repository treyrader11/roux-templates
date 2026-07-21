import { cn } from "@/lib/utils";

type Variant = "default" | "accent" | "outline";

const VARIANTS: Record<Variant, string> = {
  default: "bg-secondary text-secondary-foreground",
  accent: "bg-accent/15 text-accent",
  outline: "border border-border text-muted-foreground",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider",
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}
