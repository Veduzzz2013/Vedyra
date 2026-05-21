import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { HomeSections } from "@/components/home-sections";

export default async function HomePage() {
  const { userId } = await auth();

  if (!userId) return <HomeSections />;

  return (
    <main className="mx-auto max-w-7xl space-y-10 p-6">
      <section className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-white">
        <p className="text-sm">Welcome back to Vedyra</p>
        <h1 className="mt-2 text-4xl font-bold">Your learning dashboard is ready</h1>
        <p className="mt-3 text-blue-50">Track progress, resume videos, open Complete Book Notes, and use VedAI tools.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/dashboard" className="rounded-xl bg-white px-4 py-2 font-semibold text-blue-700">Open Dashboard</Link>
          <Link href="/VedAI" className="rounded-xl border border-white/70 px-4 py-2">Launch VedAI</Link>
          <Link href="/Notes" className="rounded-xl border border-white/70 px-4 py-2">Open Notes</Link>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Study Streak", "21 days"],
          ["Saved PDFs", "43"],
          ["AI Queries", "289"],
          ["Completion", "74%"],
        ].map(([k, v]) => (
          <article key={k} className="glass rounded-2xl p-4">
            <p className="text-sm text-slate-500">{k}</p>
            <p className="text-2xl font-bold">{v}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
