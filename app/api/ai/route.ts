import { NextRequest } from "next/server";
import { streamGeminiResponse } from "@/lib/gemini";

export const runtime = "edge";

function parseGeminiSSE(chunk: string): string {
  const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));
  let out = "";
  for (const line of lines) {
    const payload = line.slice(6).trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      const json = JSON.parse(payload);
      const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (typeof text === "string") out += text;
    } catch {}
  }
  return out;
}

export async function POST(req: NextRequest) {
  try {
    const { message, context } = await req.json();
    if (!message || typeof message !== "string") return new Response("Invalid message", { status: 400 });

    const geminiStream = await streamGeminiResponse({ message, context });
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const reader = geminiStream.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const parsed = parseGeminiSSE(decoder.decode(value, { stream: true }));
            if (parsed) controller.enqueue(encoder.encode(parsed));
          }
        } finally {
          controller.close();
          reader.releaseLock();
        }
      },
    });

    return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" } });
  } catch (error) {
    console.error("/api/ai failed", error);
    return new Response("Failed to generate response", { status: 500 });
  }
}
