import { useState, useRef, useEffect } from "react";

const API_URL = "/api/analyze";

async function typewriter(setText, text) {
  const words = text.split(" ");
  let current = "";
  for (const word of words) {
    await new Promise((r) => setTimeout(r, 20));
    current += (current ? " " : "") + word;
    setText(current);
  }
}

export default function AIAnalyst({ systemPrompt }) {
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [paragraphs, setParagraphs] = useState([]);
  const [history, setHistory] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const outputRef = useRef(null);

  async function callAPI(userMessage, currentHistory) {
    const nextHistory = [...currentHistory, { role: "user", content: userMessage }];
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: nextHistory, systemPrompt }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return { text: data.text, newHistory: [...nextHistory, { role: "assistant", content: data.text }] };
  }

  async function runAnalysis() {
    setStatus("loading");
    setParagraphs([]);
    setHistory([]);
    try {
      const { text, newHistory } = await callAPI(
        "Give me a sharp weekly market summary for Boise. What should buyers, sellers, and investors know right now?",
        []
      );
      setHistory(newHistory);
      const parts = text.split("\n\n").filter(Boolean);
      const built = [];
      for (let i = 0; i < parts.length; i++) {
        built.push({ type: "para", text: "" });
        const idx = i;
        setParagraphs([...built]);
        await new Promise((resolve) => {
          const words = parts[i].split(" ");
          let current = "";
          let w = 0;
          const tick = setInterval(() => {
            if (w >= words.length) { clearInterval(tick); resolve(); return; }
            current += (current ? " " : "") + words[w++];
            built[idx] = { type: "para", text: current };
            setParagraphs([...built]);
          }, 20);
        });
      }
      setStatus("done");
    } catch (e) {
      setErrorMsg(e.message);
      setStatus("error");
    }
  }

  async function askFollowUp(question) {
    setStatus("loading");
    try {
      const { text, newHistory } = await callAPI(question, history);
      setHistory(newHistory);
      setParagraphs((prev) => {
        const divider = { type: "divider", question };
        const newPara = { type: "para", text: "" };
        return [...prev, divider, newPara];
      });
      const words = text.split(" ");
      let current = "";
      for (const word of words) {
        await new Promise((r) => setTimeout(r, 20));
        current += (current ? " " : "") + word;
        setParagraphs((prev) => {
          const next = [...prev];
          next[next.length - 1] = { type: "para", text: current };
          return next;
        });
      }
      setStatus("done");
    } catch (e) {
      setErrorMsg(e.message);
      setStatus("error");
    }
  }

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [paragraphs]);

  const isLoading = status === "loading";

  return (
    <div className="card ai-panel">
      <div className="ai-panel-header">
        <div className="ai-dot" />
        <div className="ai-panel-label">AI Market Analyst</div>
      </div>

      <div
        className={`ai-output${status === "idle" || isLoading && paragraphs.length === 0 ? " loading" : ""}`}
        ref={outputRef}
        style={{ overflowY: "auto", maxHeight: "420px" }}
      >
        {status === "idle" && (
          <>
            <div className="spinner" style={{ opacity: 0 }} />
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "1px", color: "var(--muted)" }}>
              Click "Generate Analysis" to start
            </div>
          </>
        )}

        {status === "loading" && paragraphs.length === 0 && (
          <>
            <div className="spinner" />
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "1px" }}>
              ANALYZING MARKET DATA…
            </div>
          </>
        )}

        {status === "error" && (
          <p style={{ color: "var(--danger)", fontSize: "13px" }}>
            ⚠ {errorMsg || "Could not reach AI. Check your API key in Netlify environment variables."}
          </p>
        )}

        {paragraphs.map((item, i) => {
          if (item.type === "divider") {
            return (
              <div key={i}>
                <hr />
                <div className="ai-follow-up-label">▸ {item.question}</div>
              </div>
            );
          }
          const html = item.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
          return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />;
        })}
      </div>

      <div className="ai-controls">
        <button className="btn btn-primary" onClick={runAnalysis} disabled={isLoading}>
          {isLoading ? "Thinking…" : "Generate Analysis"}
        </button>
        <button className="btn" onClick={() => askFollowUp("What are the key risks right now?")} disabled={isLoading || status === "idle"}>
          Risks?
        </button>
        <button className="btn" onClick={() => askFollowUp("What's the best play for investors?")} disabled={isLoading || status === "idle"}>
          For investors?
        </button>
      </div>
    </div>
  );
}
