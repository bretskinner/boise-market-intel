export default function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>Built to answer one question: where should I focus this week?</h1>
        <p>
          The Boise real estate market moves fast. Data exists — on Redfin, Zillow, MLS feeds — but
          it's scattered and rarely answers the question buyers and investors actually ask. This
          dashboard consolidates market signals and adds an AI interpretation layer, turning raw
          numbers into actionable intelligence in plain English.
        </p>
      </div>

      <div className="about-section">
        <h2>About the Builder</h2>
        <p>
          Bret Skinner is an aspiring AI agent builder with a passion for sports, live events, and
          the four seasons that Boise does better than most. Husband, father of two, and committed
          San Diego sports fan — building tools at the intersection of AI and real-world data.
        </p>
        <p style={{ marginTop: "12px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a href="https://github.com/bretskinner/boise-market-intel" target="_blank" rel="noreferrer"
            style={{ color: "var(--accent2)", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
            GitHub →
          </a>
          <a href="https://www.linkedin.com/in/bret-skinner-11761682/" target="_blank" rel="noreferrer"
            style={{ color: "var(--accent2)", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
            LinkedIn →
          </a>
        </p>
      </div>

      <div className="about-section">
        <h2>Key Product Decisions</h2>
        <div className="decision-grid">
          <div className="decision-card">
            <h3>AI narrative over charts</h3>
            <p>
              Charts require the user to interpret data themselves. Prioritizing AI-written summaries
              delivers the "so what" directly — closer to talking to a knowledgeable local agent.
            </p>
          </div>
          <div className="decision-card">
            <h3>Conversational follow-ups</h3>
            <p>
              A single AI summary has limited value. Maintaining conversation history turns the tool
              into a dialogue, not just a report.
            </p>
          </div>
          <div className="decision-card">
            <h3>Hyperlocal Boise focus</h3>
            <p>
              A specific focus makes the product more credible and useful than a generic real estate
              AI. Specificity builds trust.
            </p>
          </div>
          <div className="decision-card">
            <h3>Serverless backend</h3>
            <p>
              Netlify Functions over a standalone Express server — zero infrastructure overhead, and
              keeps the API key securely server-side.
            </p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>Tech Stack</h2>
        <table className="stack-table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Technology</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Frontend</td><td>React + Vite</td><td>Fast dev experience, component reuse</td></tr>
            <tr><td>Backend</td><td>Netlify Functions (Node.js)</td><td>Serverless, no infra to manage</td></tr>
            <tr><td>AI</td><td>Anthropic Claude API</td><td>Best-in-class reasoning on market data</td></tr>
            <tr><td>Routing</td><td>React Router v6</td><td>Clean multi-page navigation</td></tr>
            <tr><td>Hosting</td><td>Netlify</td><td>CI/CD from GitHub, free tier</td></tr>
          </tbody>
        </table>
      </div>

      <div className="about-section">
        <h2>What I'd Build Next</h2>
        <ul className="next-list">
          <li>Connect a live data API (Rentcast or ATTOM) to replace representative data with real MLS feeds</li>
          <li>Add a neighborhood map with heatmap overlay using Mapbox</li>
          <li>Weekly email digest via scheduled Netlify Functions</li>
          <li>User-defined alerts — e.g. "notify me when SE Boise DOM drops below 14 days"</li>
          <li>Historical trend charts showing price/sqft over 12 months by neighborhood</li>
          <li>Expand coverage to Nampa, Meridian, and Eagle sub-markets</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>About This Project</h2>
        <p>
          Built as a portfolio project demonstrating AI API integration, React component architecture,
          and product thinking applied to a real-world use case. Market data is representative of
          actual Boise metro patterns as of early 2026.
        </p>
      </div>
    </div>
  );
}