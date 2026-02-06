import { promises as fs } from "node:fs";
import path from "node:path";
import type { AmbassadorSubmission } from "@/types";

/**
 * Directory where submission JSON files are persisted.
 *
 * In production you'd replace this with a real database.
 * For now, JSON-file storage keeps the prototype simple.
 */
const SUBMISSIONS_DIR = path.join(
  process.cwd(),
  "src",
  "data",
  "submissions"
);

/**
 * Derive the full path for a submission type's JSON file.
 */
function filePath(type: string): string {
  return path.join(SUBMISSIONS_DIR, `${type}.json`);
}

/**
 * Ensure the submissions directory exists.
 */
async function ensureDir(): Promise<void> {
  await fs.mkdir(SUBMISSIONS_DIR, { recursive: true });
}

/**
 * Read all submissions of a given type from disk.
 *
 * Returns an empty array if the file does not yet exist.
 *
 * @typeParam T - The submission shape (e.g. AmbassadorSubmission).
 * @param type  - A label that maps to `src/data/submissions/{type}.json`.
 *
 * @example
 * const ambassadors = await readSubmissions<AmbassadorSubmission>("ambassadors");
 */
export async function readSubmissions<T>(type: string): Promise<T[]> {
  await ensureDir();

  const fp = filePath(type);

  try {
    const raw = await fs.readFile(fp, "utf-8");
    return JSON.parse(raw) as T[];
  } catch (err: unknown) {
    // File doesn't exist yet — return empty list.
    if (
      err instanceof Error &&
      "code" in err &&
      (err as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      return [];
    }
    throw err;
  }
}

/**
 * Append a single submission to the JSON file for the given type.
 *
 * Creates the file (with an array containing only this item) if it
 * doesn't already exist. Uses a simple read-then-write strategy;
 * for production use you'd want proper locking or a database.
 *
 * @typeParam T - The submission shape.
 * @param type - A label that maps to `src/data/submissions/{type}.json`.
 * @param data - The submission payload to append.
 *
 * @example
 * await appendSubmission<AmbassadorSubmission>("ambassadors", {
 *   id: "abc123",
 *   name: "Jane Doe",
 *   ...
 * });
 */
export async function appendSubmission<T>(
  type: string,
  data: T
): Promise<void> {
  const existing = await readSubmissions<T>(type);
  existing.push(data);

  const fp = filePath(type);
  await fs.writeFile(fp, JSON.stringify(existing, null, 2), "utf-8");
}

/**
 * Get all *approved* ambassador submissions.
 *
 * Convenience wrapper around `readSubmissions` that filters on
 * the `approved` flag and sorts newest-first.
 */
export async function getApprovedAmbassadors(): Promise<
  AmbassadorSubmission[]
> {
  const all =
    await readSubmissions<AmbassadorSubmission>("ambassadors");

  return all
    .filter((a) => a.approved)
    .sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() -
        new Date(a.submittedAt).getTime()
    );
}

/**
 * Mark an ambassador submission as approved (or rejected).
 *
 * @param id       - The submission's unique ID.
 * @param approved - Whether to approve (`true`) or reject (`false`).
 * @returns `true` if the submission was found and updated, `false` otherwise.
 */
export async function setAmbassadorApproval(
  id: string,
  approved: boolean
): Promise<boolean> {
  const all =
    await readSubmissions<AmbassadorSubmission>("ambassadors");

  const index = all.findIndex((a) => a.id === id);
  if (index === -1) return false;

  all[index] = { ...all[index], approved };

  const fp = filePath("ambassadors");
  await fs.writeFile(fp, JSON.stringify(all, null, 2), "utf-8");

  return true;
}
