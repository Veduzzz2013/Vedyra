"use client";
import { useState } from "react";

export default function VedAIPage() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("Ask VedAI anything about NCERT.");

  function send() {
    if (!prompt.trim()) {
      setOutput("Please enter a question first.");
      return;
    }
    setOutput("VedAI API layer is intentionally disabled for now. Clerk auth is active and ready.");
  }

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="text-4xl font-bold">VedAI Workspace</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-[280px,1fr]">
        <aside className="glass rounded-2xl p-4">Chat AI<br/>Doc Generator<br/>PPT Generator<br/>Image Generator</aside>
        <section className="glass rounded-2xl p-4">
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="h-28 w-full rounded-xl border p-3" placeholder="Ask doubts, create quiz, summarize chapter..." />
          <button onClick={send} className="mt-3 rounded-xl bg-primary px-4 py-2 text-white">Run VedAI</button>
          <pre className="mt-4 whitespace-pre-wrap">{output}</pre>
        </section>
      </div>
    </main>
  );
}
