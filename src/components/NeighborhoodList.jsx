export default function NeighborhoodList({ neighborhoods, weekLabel }) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Neighborhoods to Watch</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--muted)", marginTop: "4px" }}>
            {weekLabel}
          </div>
        </div>
      </div>

      {neighborhoods.map((n) => (
        <div key={n.rank} className="neighborhood-item">
          <div className={`rank-badge rank-${n.rank}`}>#{n.rank}</div>
          <div>
            <div className="neighborhood-name">{n.name}</div>
            <div className="neighborhood-type">{n.type}</div>
            <div className="neighborhood-stats">
              <div className="mini-stat">
                <div className="mini-stat-val">{n.stats.medianPrice}</div>
                <div className="mini-stat-label">Median</div>
              </div>
              <div className="mini-stat">
                <div className="mini-stat-val">{n.stats.dom}</div>
                <div className="mini-stat-label">DOM</div>
              </div>
              <div className="mini-stat">
                <div className="mini-stat-val">{n.stats.newListings}</div>
                <div className="mini-stat-label">New</div>
              </div>
              <div className="mini-stat">
                <div className="mini-stat-val" style={{ color: "var(--accent3)" }}>{n.stats.priceChange}</div>
                <div className="mini-stat-label">WoW</div>
              </div>
            </div>
          </div>
          <div>
            <span className={`signal-tag signal-${n.signal}`}>● {n.signalLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
