import { getStore } from "@netlify/blobs";

const LIMITS = {
  unauthenticated: 1,
  free: 5,
  pro: 20,
};

function getTodayKey() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

async function getRateLimit(identifier, tier) {
  const store = getStore("rate-limits");
  const key = `${identifier}:${getTodayKey()}`;
  const limit = LIMITS[tier] ?? LIMITS.free;

  let count = 0;
  try {
    const val = await store.get(key);
    if (val) count = parseInt(val, 10);
  } catch {
    count = 0;
  }

  if (count >= limit) {
    return { allowed: false, count, limit };
  }

  // Increment count
  await store.set(key, String(count + 1), { expirationTTL: 60 * 60 * 24 * 2 }); // expires in 2 days
  return { allowed: true, count: count + 1, limit };
}

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { messages, systemPrompt, userId, userTier } = await req.json();

    // Determine identifier and tier
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const identifier = userId ?? `ip:${ip}`;
    const tier = userId ? (userTier === "pro" ? "pro" : "free") : "unauthenticated";

    // Check rate limit
    const { allowed, count, limit } = await getRateLimit(identifier, tier);

    if (!allowed) {
      return new Response(
        JSON.stringify({
          error: `${
            tier === "unauthenticated"
              ? "Please login to use the AI Analysis Tool."
              : tier === "free"
              ? `Daily limit reached. You've used ${count}/${limit} analyses today. Upgrade to Pro for 20/day.`
              : "Daily limit reached. Resets tomorrow."
          }`,
          rateLimited: true,
          tier,
          limit,
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    // Call Claude API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemPrompt,
        messages,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return new Response(JSON.stringify({ error: data.error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const text = data.content.map((b) => b.text || "").join("");
    return new Response(
      JSON.stringify({ text, remaining: limit - count }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = { path: "/api/analyze" };