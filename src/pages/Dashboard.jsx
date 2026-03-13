import MetricsRow from "../components/MetricsRow";
import NeighborhoodList from "../components/NeighborhoodList";
import AIAnalyst from "../components/AIAnalyst";
import MarketSegments from "../components/MarketSegments";
import PriceHistoryChart from "../components/PriceHistoryChart";

import { useUser } from "@clerk/clerk-react";

const MARKET_DATA = {
  metrics: [
    { label: "Median List Price", value: "$489K", delta: "↑ 2.1% vs last week", type: "up" },
    { label: "Avg Days on Market", value: "18", delta: "↓ 3 days vs last week", type: "down" },
    { label: "Active Listings", value: "1,247", delta: "→ +0.4% vs last week", type: "neutral" },
    { label: "Price / SqFt", value: "$231", delta: "↑ 1.3% vs last week", type: "warn" },
  ],
  neighborhoods: [
    {
      rank: 1,
      name: "Harris Ranch",
      type: "Established / Family",
      signal: "hot",
      signalLabel: "High Demand",
      stats: { medianPrice: "$548K", dom: "11 days", newListings: 14, priceChange: "+3.2%" },
    },
    {
      rank: 2,
      name: "Downtown / North End",
      type: "Urban / Walkable",
      signal: "rising",
      signalLabel: "Rising Fast",
      stats: { medianPrice: "$612K", dom: "16 days", newListings: 9, priceChange: "+2.7%" },
    },
    {
      rank: 3,
      name: "Southeast Boise",
      type: "Emerging / Investor",
      signal: "opportunity",
      signalLabel: "Opportunity",
      stats: { medianPrice: "$389K", dom: "22 days", newListings: 23, priceChange: "+1.4%" },
    },
  ],
  segments: [
    {
      name: "Starter Homes",
      icon: "🔥",
      iconColor: "var(--danger)",
      barClass: "bar-hot",
      barWidth: "88%",
      stats: [
        { val: "$320–$420K", label: "Price range" },
        { val: "9 days", label: "Avg DOM" },
        { val: "4.2x", label: "Offers avg" },
        { val: "+3.8%", label: "Price WoW" },
      ],
    },
    {
      name: "Move-Up Market",
      icon: "↑",
      iconColor: "var(--accent)",
      barClass: "bar-warm",
      barWidth: "62%",
      stats: [
        { val: "$450–$700K", label: "Price range" },
        { val: "21 days", label: "Avg DOM" },
        { val: "1.8x", label: "Offers avg" },
        { val: "+1.2%", label: "Price WoW" },
      ],
    },
    {
      name: "Luxury / $1M+",
      icon: "◎",
      iconColor: "var(--accent3)",
      barClass: "bar-cool",
      barWidth: "38%",
      stats: [
        { val: "$1M–$2.4M", label: "Price range" },
        { val: "44 days", label: "Avg DOM" },
        { val: "1.1x", label: "Offers avg" },
        { val: "–0.5%", label: "Price WoW" },
      ],
    },
  ],
};

const SYSTEM_PROMPT = `You are a sharp, data-driven real estate market analyst for the Boise, Idaho metro area.

This week's market snapshot:
- Median list price: $489K (+2.1% WoW)
- Avg days on market: 18 (-3 days WoW)
- Active listings: 1,247 (+0.4%)
- Price per sqft: $231 (+1.3%)
- Segments: Starter homes (under $420K) extremely hot, 9-day DOM, 4.2 avg offers; Move-up $450–700K rising; Luxury $1M+ cooling slightly
- Top 3 neighborhoods: Harris Ranch (#1, $548K median, +3.2%), Downtown/North End (#2, $612K, +2.7%), Southeast Boise (#3, $389K, +1.4%, emerging)

Write in a professional but conversational tone. Be specific and direct. Use actual numbers. 2-3 short paragraphs max. No bullet points.`;

export default function Dashboard() {
  const { user } = useUser();
  const isPro = user?.publicMetadata?.tier === 'pro';
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - 6);
  const weekLabel = `Week of ${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  return (
    <>
      <div className="section-label">Weekly Snapshot</div>
      <MetricsRow metrics={MARKET_DATA.metrics} />
      <PriceHistoryChart isPro={isPro} />
      <div className="content-grid">
        <NeighborhoodList neighborhoods={MARKET_DATA.neighborhoods} weekLabel={weekLabel} />
        <AIAnalyst systemPrompt={SYSTEM_PROMPT} />
      </div>

      <div className="section-label">Market Segments</div>
      <MarketSegments segments={MARKET_DATA.segments} />
    </>
  );
}
