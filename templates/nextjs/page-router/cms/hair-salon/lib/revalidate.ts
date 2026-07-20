import type { NextApiResponse } from "next";

// Maps a content slug prefix (e.g. "home:") to the public paths that render it.
const SLUG_PREFIX_PATHS: Array<[string, string[]]> = [
  ["home:", ["/"]],
  ["services:", ["/services"]],
  ["stylists:", ["/stylists", "/", "/booking"]],
  ["gallery:", ["/gallery", "/"]],
  ["pricing:", ["/pricing"]],
  ["contact:", ["/contact"]],
  ["booking:", ["/booking"]],
];

/** Public paths that render a given CMS content slug. */
export function pathsForSlug(slug: string): string[] {
  const match = SLUG_PREFIX_PATHS.find(([prefix]) => slug.startsWith(prefix));
  return match ? match[1] : [];
}

/**
 * Trigger on-demand ISR revalidation for the given public paths so admin
 * changes appear immediately instead of after the time-based window.
 * Failures (e.g. in `next dev`, where pages aren't statically cached) are
 * swallowed — the save still succeeds.
 */
export async function revalidatePaths(
  res: NextApiResponse,
  paths: string[]
): Promise<void> {
  const unique = Array.from(new Set(paths));
  await Promise.all(unique.map((path) => res.revalidate(path).catch(() => {})));
}
