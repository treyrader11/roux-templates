import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
}

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl container-px">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      {kicker && (
        <span className="text-sm font-medium uppercase tracking-widest text-brand">
          {kicker}
        </span>
      )}
      <h2 className="mt-3 font-display text-3xl sm:text-4xl text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
