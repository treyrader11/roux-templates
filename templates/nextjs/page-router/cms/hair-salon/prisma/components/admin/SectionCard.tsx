import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

interface SectionCardProps {
  name: string;
  description: string;
  href: string;
  icon?: ReactNode;
}

/** Reusable card used across admin hub pages. */
export default function SectionCard({
  name,
  description,
  href,
  icon,
}: SectionCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6",
        "transition-all hover:border-brand/40 hover:shadow-md"
      )}
    >
      {icon && (
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
          {icon}
        </span>
      )}
      <div>
        <h3 className="font-display text-lg text-foreground group-hover:text-brand transition-colors">
          {name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
