import { NotesPackage } from "@/types";
const data: NotesPackage[] = [
  { id: "1", subject: "Science Complete Notes", progress: 88, updated: "2026-05-01" },
  { id: "2", subject: "Mathematics Complete Notes", progress: 80, updated: "2026-05-04" },
  { id: "3", subject: "SST Complete Notes", progress: 91, updated: "2026-05-06" },
  { id: "4", subject: "English Complete Notes", progress: 74, updated: "2026-05-10" }
];
export default function NotesPage(){return <main className="mx-auto max-w-7xl p-6"><h1 className="text-4xl font-bold">Complete Book Notes</h1><p className="mt-2 text-slate-600">Full-book notes, not chapter-wise fragments.</p><div className="mt-6 grid gap-4 md:grid-cols-2">{data.map(n=><article key={n.id} className="glass rounded-2xl p-5"><h3 className="font-semibold">{n.subject}</h3><p className="text-sm text-slate-500">Updated: {n.updated}</p></article>)}</div></main>}
