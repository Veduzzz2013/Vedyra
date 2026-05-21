import { DashboardStats } from "@/types";
const stats: DashboardStats = { streak: 21, completedHours: 126, savedPdfs: 43, aiQueries: 289 };
export default function DashboardPage(){return <main className="mx-auto max-w-7xl p-6"><h1 className="text-4xl font-bold">Student Dashboard</h1><div className="mt-6 grid gap-4 md:grid-cols-4">{Object.entries(stats).map(([k,v])=><article key={k} className="glass rounded-2xl p-4"><p className="text-sm text-slate-500">{k}</p><p className="text-2xl font-bold">{v}</p></article>)}</div></main>}
