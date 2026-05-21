"use client";

import { useRef, useState } from "react";
import { useAISidebar } from "@/hooks/use-ai-sidebar";

const QUICK_ACTIONS = ["Explain Simply", "Summarize", "Generate Quiz", "Important Questions", "Revision Notes", "Flashcards"];

export function VedAISidebar() {
  const { open, setOpen, loading, setLoading, messages, setMessages, context } = useAISidebar();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg = { id: crypto.randomUUID(), role: "user" as const, content };
    const botId = crypto.randomUUID();
    setMessages((prev) => [...prev, userMsg, { id: botId, role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, context }),
      });

      if (!res.body) throw new Error("No stream response");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const part = await reader.read();
        done = part.done;
        if (part.value) {
          const chunk = decoder.decode(part.value, { stream: true });
          setMessages((prev) => prev.map((m) => (m.id === botId ? { ...m, content: m.content + chunk } : m)));
          queueMicrotask(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }));
        }
      }
    } catch {
      setMessages((prev) => prev.map((m) => (m.id === botId ? { ...m, content: "Sorry, VedAI is unavailable right now." } : m)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed bottom-5 right-5 z-50 rounded-full bg-blue-600 px-5 py-3 text-white shadow-lg">
        {open ? "Close VedAI" : "Ask VedAI"}
      </button>
      <aside className={`fixed right-4 top-20 z-50 h-[78vh] w-[92vw] max-w-md rounded-2xl border border-blue-100 bg-white/95 shadow-2xl backdrop-blur transition-all dark:bg-slate-900/95 ${open ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}>
        <div className="border-b border-slate-200 p-4 dark:border-slate-700">
          <h3 className="text-lg font-semibold">VedAI Assistant</h3>
          <p className="text-xs text-slate-500">Context: {context.pageType} • {context.pageTitle}</p>
        </div>

        <div className="flex gap-2 overflow-x-auto p-3">
          {QUICK_ACTIONS.map((q) => (
            <button key={q} onClick={() => sendMessage(q)} className="whitespace-nowrap rounded-full border px-3 py-1 text-xs">{q}</button>
          ))}
        </div>

        <div ref={scrollRef} className="h-[48vh] space-y-3 overflow-y-auto px-3 pb-3">
          {messages.length === 0 && <p className="text-sm text-slate-500">Ask doubts while studying videos, notes, PDFs, or dashboard insights.</p>}
          {messages.map((m) => (
            <div key={m.id} className={`rounded-xl p-3 text-sm ${m.role === "user" ? "ml-8 bg-blue-600 text-white" : "mr-8 bg-slate-100 dark:bg-slate-800"}`}>
              <pre className="whitespace-pre-wrap font-sans">{m.content || (loading && m.role === "assistant" ? "Typing..." : "")}</pre>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-3 dark:bg-slate-900">
          <div className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Explain this topic simply..." className="w-full rounded-lg border px-3 py-2 text-sm" />
            <button onClick={() => sendMessage()} disabled={loading} className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white disabled:opacity-50">Send</button>
          </div>
        </div>
      </aside>
    </>
  );
}
