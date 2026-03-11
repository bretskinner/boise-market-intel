export default function MarketSegments({ segments }) {
  return (
    <div className="segments-grid">
      {segments.map((s) => (
        <div key={s.name} className="segment-card">
          <div className="segment-header">
            <div className="segment-name">{s.name}</div>
            <div style={{ fontSize: "20px", color: s.iconColor }}>{s.icon}</div>
          </div>
          <div className="bar-track">
            <div className={`bar-fill ${s.barClass}`} style={{ width: s.barWidth }} />
          </div>
          <div className="segment-stats">
            {s.stats.map((stat) => (
              <div key={stat.label} className="seg-stat">
                <div className="seg-stat-val">{stat.val}</div>
                <div className="seg-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
