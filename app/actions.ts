"use server";

import { sql } from "@/lib/db";

export async function getUsers() {
  try {
    const rows = await sql`SELECT id, email, full_name, created_at FROM users ORDER BY created_at DESC LIMIT 100`;
    return { ok: true, data: rows };
  } catch (error) {
    console.error("getUsers failed", error);
    return { ok: false, error: "Failed to fetch users." };
  }
}

export async function saveChat(input: { userId: string; role: "user" | "assistant"; message: string }) {
  try {
    const rows = await sql`
      INSERT INTO ai_chats (user_id, role, message)
      VALUES (${input.userId}, ${input.role}, ${input.message})
      RETURNING id, user_id, role, message, created_at
    `;
    return { ok: true, data: rows[0] };
  } catch (error) {
    console.error("saveChat failed", error);
    return { ok: false, error: "Failed to save chat." };
  }
}

export async function getBookmarks(userId: string) {
  try {
    const rows = await sql`
      SELECT id, user_id, title, resource_type, resource_url, created_at
      FROM bookmarks
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;
    return { ok: true, data: rows };
  } catch (error) {
    console.error("getBookmarks failed", error);
    return { ok: false, error: "Failed to fetch bookmarks." };
  }
}

export async function saveStudyProgress(input: {
  userId: string;
  subject: string;
  topic: string;
  progressPercent: number;
  minutesSpent: number;
}) {
  try {
    const rows = await sql`
      INSERT INTO study_progress (user_id, subject, topic, progress_percent, minutes_spent)
      VALUES (${input.userId}, ${input.subject}, ${input.topic}, ${input.progressPercent}, ${input.minutesSpent})
      ON CONFLICT (user_id, subject, topic)
      DO UPDATE SET
        progress_percent = EXCLUDED.progress_percent,
        minutes_spent = study_progress.minutes_spent + EXCLUDED.minutes_spent,
        updated_at = NOW()
      RETURNING id, user_id, subject, topic, progress_percent, minutes_spent, updated_at
    `;
    return { ok: true, data: rows[0] };
  } catch (error) {
    console.error("saveStudyProgress failed", error);
    return { ok: false, error: "Failed to save study progress." };
  }
}
