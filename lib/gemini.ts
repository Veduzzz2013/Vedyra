const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse";

function getGeminiKey() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("Missing GEMINI_API_KEY");
  return key;
}

export async function streamGeminiResponse(input: {
  message: string;
  context?: {
    pageTitle?: string;
    subject?: string;
    pageType?: string;
    metadata?: Record<string, unknown>;
  };
}) {
  const key = getGeminiKey();

  const systemPrompt = `You are VedAI, a student-friendly CBSE/NCERT learning assistant.
Be concise, clear, and exam-focused.
Use markdown when helpful.
If context is provided, tailor the answer based on page title/subject/page type.`;

  const contextText = JSON.stringify(input.context ?? {});

  const res = await fetch(`${GEMINI_URL}&key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemPrompt}\n\nContext:\n${contextText}\n\nStudent question:\n${input.message}` },
          ],
        },
      ],
    }),
  });

  if (!res.ok || !res.body) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Gemini request failed: ${res.status} ${txt}`);
  }

  return res.body;
}
