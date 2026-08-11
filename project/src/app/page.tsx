type Run = { date: string; distanceKm: number; durationMin: number };

const runs: Run[] = [
  { date: "2026-08-05", distanceKm: 5, durationMin: 28 },
  { date: "2026-08-08", distanceKm: 8, durationMin: 44 },
];

export default function Home() {
  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 600, margin: "2rem auto", padding: "0 1rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>🏃 PaceKeeper</h1>
      <p style={{ color: "#555", marginBottom: "1.5rem" }}>
        Track your runs, distance, and pace over time.
      </p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {runs.map((r) => (
          <li
            key={r.date}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              padding: "0.75rem 1rem",
              marginBottom: "0.75rem",
            }}
          >
            <strong>{r.date}</strong> — {r.distanceKm} km in {r.durationMin} min{" "}
            <span style={{ color: "#666" }}>
              ({(r.durationMin / r.distanceKm).toFixed(2)} min/km)
            </span>
          </li>
        ))}
      </ul>
      <p style={{ marginTop: "2rem", color: "#888", fontSize: "0.9rem" }}>
        Log a new run to get started.
      </p>
    </main>
  );
}
