/**
 * Represents a single running activity record.
 */
export interface Run {
  /** Unique identifier for the run (UUID). */
  id: string;

  /** Date of the run in ISO 8601 format: YYYY-MM-DD (e.g. "2024-03-15"). */
  date: string;

  /** Distance covered in kilometres. Must be a positive number. */
  distanceKm: number;

  /** Duration of the run in minutes. Must be a positive number. */
  durationMin: number;
}
