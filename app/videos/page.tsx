"use client";
import { useEffect, useMemo, useState } from "react";

type Course = { id: string; title: string; classLevel: "Class 8" | "Class 9"; section: "notes" | "videos" };
const STORAGE_KEY = "vedyra_courses";

export default function VideosPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const all: Course[] = saved ? JSON.parse(saved) : [];
    setCourses(all.filter((c) => c.section === "videos"));
  }, []);

  const grouped = useMemo(
    () => ({
      class8: courses.filter((c) => c.classLevel === "Class 8"),
      class9: courses.filter((c) => c.classLevel === "Class 9"),
    }),
    [courses]
  );

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="text-4xl font-bold">Videos</h1>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">Class 8</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {grouped.class8.map((c) => (
            <article key={c.id} className="rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500 p-4 text-white">
              <h3>{c.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Class 9</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {grouped.class9.map((c) => (
            <article key={c.id} className="rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500 p-4 text-white">
              <h3>{c.title}</h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}