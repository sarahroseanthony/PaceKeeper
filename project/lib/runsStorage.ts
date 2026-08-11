import fs from 'fs';
import path from 'path';
import { Run } from '../types/run';

/** Absolute path to the JSON persistence file. */
const DATA_FILE = path.join(process.cwd(), 'data', 'runs.json');

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Write the full runs array to disk, formatted for human readability.
 */
function writeRuns(runs: Run[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(runs, null, 2), 'utf-8');
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Return all stored runs.
 *
 * - Returns an empty array when the file does not yet exist.
 * - Logs a console error and returns an empty array when the file contains
 *   malformed JSON.
 */
export function getRuns(): Run[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw) as Run[];
  } catch (err: unknown) {
    // File not found – treat as empty storage.
    if (
      err instanceof Error &&
      (err as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      return [];
    }
    // Malformed JSON or any other read error.
    console.error('[runsStorage] Failed to read or parse runs.json:', err);
    return [];
  }
}

/**
 * Persist a new run and return the saved record (including its generated id).
 *
 * @param runData - All run fields except `id`, which is generated here.
 */
export function addRun(runData: Omit<Run, 'id'>): Run {
  const newRun: Run = {
    id: crypto.randomUUID(),
    ...runData,
  };

  const runs = getRuns();
  runs.push(newRun);
  writeRuns(runs);

  return newRun;
}

/**
 * Delete the run with the given id.
 *
 * @returns `true` when the run was found and removed, `false` when no run
 *          with that id existed.
 */
export function deleteRun(id: string): boolean {
  const runs = getRuns();
  const filtered = runs.filter((run) => run.id !== id);

  if (filtered.length === runs.length) {
    // Nothing was removed.
    return false;
  }

  writeRuns(filtered);
  return true;
}
