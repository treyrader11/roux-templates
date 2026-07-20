import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitleCase(str: string): string {
  return str
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

/** Parse a JSON-stringified CMS record, falling back to defaults on any error. */
export function parseCms<T>(record: { content: string } | null, fallback: T): T {
  if (!record) return fallback;
  try {
    return JSON.parse(record.content) as T;
  } catch {
    return fallback;
  }
}
