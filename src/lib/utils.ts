import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

/**
 * Merge class names with Tailwind-aware deduplication.
 *
 * Combines `clsx` (conditional class joining) with `tailwind-merge`
 * (resolves Tailwind class conflicts like `px-2 px-4` -> `px-4`).
 *
 * @example
 * cn("px-2 py-1", isActive && "bg-gipp-orange text-white", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format an ISO date string into a human-readable form.
 *
 * @param date  ISO-8601 date string (e.g. "2024-11-15")
 * @param fmt   date-fns format token (default: "MMMM d, yyyy")
 * @returns     Formatted string, e.g. "November 15, 2024"
 *
 * @example
 * formatDate("2024-11-15")           // "November 15, 2024"
 * formatDate("2024-11-15", "MMM d")  // "Nov 15"
 */
export function formatDate(date: string, fmt: string = "MMMM d, yyyy"): string {
  try {
    return format(parseISO(date), fmt);
  } catch {
    // If parsing fails, return the raw string so the UI doesn't explode.
    return date;
  }
}

/**
 * Convert arbitrary text into a URL-safe slug.
 *
 * @example
 * slugify("Match Day 7: The Reckoning!") // "match-day-7-the-reckoning"
 * slugify("  Lots   Of   Spaces  ")      // "lots-of-spaces"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // spaces -> hyphens
    .replace(/[^\w-]+/g, "")     // strip non-word chars (except hyphens)
    .replace(/--+/g, "-")        // collapse multiple hyphens
    .replace(/^-+/, "")          // trim leading hyphens
    .replace(/-+$/, "");         // trim trailing hyphens
}
