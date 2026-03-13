import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const HISTORY = {
  "Harris Ranch": [
    { month: "Apr", price: 498, dom: 18, listings: 11 },
    { month: "May", price: 505, dom: 16, listings: 13 },
    { month: "Jun", price: 512, dom: 14, listings: 15 },
    { month: "Jul", price: 519, dom: 15, listings: 14 },
    { month: "Aug", price: 524, dom: 13, listings: 16 },
    { month: "Sep", price: 521, dom: 14, listings: 12 },
    { month: "Oct", price: 518, dom: 16, listings: 10 },
    { month: "Nov", price: 522, dom: 15, listings: 9 },
    { month: "Dec", price: 528, dom: 13, listings: 11 },
    { month: "Jan", price: 534, dom: 12, listings: 13 },
    { month: "Feb", price: 541, dom: 11, listings: 14 },
    { month: "Mar", price: 548, dom: 11, listings: 14 },
  ],
  "Downtown / North End": [
    { month: "Apr", price: 558, dom: 24, listings: 7 },
    { month: "May", price: 564, dom: 22, listings: 8 },
    { month: "Jun", price: 571, dom: 20, listings: 9 },
    { month: "Jul", price: 578, dom: 21, listings: 8 },
    { month: "Aug", price: 582, dom: 19, listings: 10 },
    { month: "Sep", price: 579, dom: 20, listings: 8 },
    { month: "Oct", price: 575, dom: 22, listings: 7 },
    { month: "Nov", price: 581, dom: 21, listings: 7 },
    { month: "Dec", price: 588, dom: 19, listings: 8 },
    { month: "Jan", price: 596, dom: 18, listings: 9 },
    { month: "Feb", price: 604, dom: 17, listings: 9 },
    { month: "Mar", price: 612, dom: 16, listings: 9 },
  ],
  "Southeast Boise": [
    { month: "Apr", price: 348, dom: 31, listings: 18 },
    { month: "May", price: 352, dom: 29, listings: 20 },
    { month: "Jun", price: 357, dom: 27, listings: 22 },
    { month: "Jul", price: 361, dom: 28, listings: 21 },
    { month: "Aug", price: 364, dom: 26, listings: 23 },
    { month: "Sep", price: 362, dom: 27, listings: 20 },
    { month: "Oct", price: 359, dom: 29, listings: 19 },
    { month: "Nov", price: 363, dom: 27, listings: 18 },
    { month: "Dec", price: 368, dom: 25, listings: 20 },
    { month: "Jan", price: 374, dom: 24, listings: 21 },
    { month: "Feb", price: 381, dom: 23, listings: 22 },
    { month: "Mar", price: 389, dom: 22, listings: 23 },
  ],
};

const NEIGHBORHOODS = Object.keys(HISTORY);

const ACCENT_COLORS = {
  "Harris Ranch": { stroke: "#e8b86d", fill: "rgba(232,184,109,0.08)" },
  "Downtown / North End": { stroke: "#6d9ee8", fill: "rgba(109,158,232,0.08)" },
  "Southeast Boise": { stroke: "#6de8b8", fill: "rgba(109,232,184,0.08)" },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#181c25",
      border: "1px solid #252a37",
      borderRadius: "6px",
      padding: "10px 14px",
      fontFamily: "'DM Mono', monospace",
      fontSize: "11px",
    }}>
      <div style={{ color: "#7a8099", marginBottom: "6px", letterSpacing: "1px" }}>{label}</div>
      <div style={{ color: "#e8eaf0", marginBottom: "3px" }}>
        Median: <span style={{ color: payload[0]?.stroke }}>${payload[0]?.value}K</span>
      </div>
      {payload[0]?.payload && (
        <>
          <div style={{ color: "#7a8099" }}>DOM: {payload[0].payload.dom} days</div>
          <div style={{ color: "#7a8099" }}>Listings: {payload[0].payload.listings}</div>
        </>
      )}
    </div>
  );
};

export default function PriceHistoryChart({ isPro }) {
  const [active, setActive] = useState(NEIGHBORHOODS[0]);
  const data = HISTORY[active];
  const colors = ACCENT_COLORS[active];

  const first = data[0].price;
  const last = data[data.length - 1].price;
  const change = (((last - first) / first) * 100).toFixed(1);
  const isUp = change > 0;

  return (
    <div className="card" style={{ marginBottom: "32px", position: "relative" }}>
      {/* Header */}
      <div className="card-header">
        <div>
          <div className="card-title">Price History</div>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--muted)",
            marginTop: "4px",
          }}>
            12-month median list price · Boise Metro
          </div>
        </div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: isUp ? "var(--accent3)" : "var(--danger)",
          background: isUp ? "rgba(109,232,184,0.08)" : "rgba(232,109,109,0.08)",
          border: `1px solid ${isUp ? "rgba(109,232,184,0.2)" : "rgba(232,109,109,0.2)"}`,
          padding: "4px 10px",
          borderRadius: "4px",
        }}>
          {isUp ? "↑" : "↓"} {Math.abs(change)}% YoY
        </div>
      </div>

      {/* Neighborhood tabs */}
      <div style={{
        display: "flex",
        gap: "4px",
        padding: "14px 26px",
        borderBottom: "1px solid var(--border)",
      }}>
        {NEIGHBORHOODS.map((n) => {
          const c = ACCENT_COLORS[n];
          const isActive = active === n;
          return (
            <button
              key={n}
              onClick={() => isPro && setActive(n)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                padding: "5px 12px",
                borderRadius: "4px",
                border: isActive ? `1px solid ${c.stroke}33` : "1px solid transparent",
                background: isActive ? `${c.stroke}10` : "transparent",
                color: isActive ? c.stroke : "var(--muted)",
                cursor: isPro ? "pointer" : "default",
                transition: "all 0.15s",
                letterSpacing: "0.3px",
              }}
            >
              {n}
            </button>
          );
        })}
      </div>

      {/* Chart area */}
      <div style={{ padding: "24px 26px 16px", position: "relative" }}>
        {/* Stats row */}
        <div style={{
          display: "flex",
          gap: "28px",
          marginBottom: "20px",
        }}>
          {[
            { label: "Current Median", val: `$${last}K`, color: colors.stroke },
            { label: "12mo Low", val: `$${Math.min(...data.map(d => d.price))}K`, color: "var(--muted)" },
            { label: "12mo High", val: `$${Math.max(...data.map(d => d.price))}K`, color: "var(--muted)" },
            { label: "Avg DOM", val: `${Math.round(data.reduce((s, d) => s + d.dom, 0) / data.length)} days`, color: "var(--muted)" },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>
              <div style={{ color: "var(--muted)", marginBottom: "3px", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase" }}>{label}</div>
              <div style={{ color, fontSize: "15px" }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ filter: isPro ? "none" : "blur(6px)", pointerEvents: isPro ? "auto" : "none" }}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.stroke} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={colors.stroke} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#252a37" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fill: "#7a8099" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fill: "#7a8099" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}K`}
                width={52}
                domain={["auto", "auto"]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke={colors.stroke}
                strokeWidth={2}
                fill="url(#chartGrad)"
                dot={false}
                activeDot={{ r: 4, fill: colors.stroke, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pro lock overlay */}
        {!isPro && (
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            background: "rgba(13,15,20,0.5)",
            backdropFilter: "blur(2px)",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}>
              Pro Feature
            </div>
            <div style={{
              fontFamily: "var(--font-serif)",
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--text)",
            }}>
              12-Month Price History
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--muted)",
              textAlign: "center",
              maxWidth: "260px",
              lineHeight: 1.6,
            }}>
              Unlock historical trends, neighborhood comparisons, and DOM tracking.
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--accent)",
              background: "rgba(232,184,109,0.08)",
              border: "1px solid rgba(232,184,109,0.2)",
              padding: "6px 16px",
              borderRadius: "4px",
              marginTop: "4px",
            }}>
              Upgrade to Pro →
            </div>
          </div>
        )}
      </div>

      {/* Footer note */}
      <div style={{
        padding: "10px 26px 14px",
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        color: "var(--muted)",
        borderTop: "1px solid var(--border)",
        letterSpacing: "0.3px",
      }}>
        Representative data · Updated weekly · Boise Metro Area
      </div>
    </div>
  );
}