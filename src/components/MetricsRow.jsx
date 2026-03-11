export default function MetricsRow({ metrics }) {
  return (
    <div className="metrics-grid">
      {metrics.map((m) => (
        <div key={m.label} className={`metric-card ${m.type}`}>
          <div className="metric-label">{m.label}</div>
          <div className="metric-value">{m.value}</div>
          <div className={`metric-delta delta-${m.type === "warn" ? "neutral" : m.type}`}>
            {m.delta}
          </div>
        </div>
      ))}
    </div>
  );
}
