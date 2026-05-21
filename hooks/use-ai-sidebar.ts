"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

export function useAISidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const context = useMemo(() => {
    const pageTitle = pathname?.replace("/", "") || "Home";
    const subject = /science|math|sst|history|english/i.test(pageTitle) ? pageTitle : "General";
    const pageType = pathname?.toLowerCase().includes("video")
      ? "video"
      : pathname?.toLowerCase().includes("note")
      ? "notes"
      : pathname?.toLowerCase().includes("dashboard")
      ? "dashboard"
      : "learning";
    return { pageTitle, subject, pageType };
  }, [pathname]);

  return { open, setOpen, loading, setLoading, messages, setMessages, context };
}
