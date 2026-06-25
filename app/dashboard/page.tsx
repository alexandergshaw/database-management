import Link from "next/link";

import { Catalog } from "@/components/catalog";
import { MissionsPanel } from "@/components/missions-panel";
import { ModulePanel } from "@/components/module-panel";
import { ObservationLog } from "@/components/observation-log";
import { ProgressTracker } from "@/components/progress-tracker";
import { SecurityPanel } from "@/components/security-panel";
import { StatsBar } from "@/components/stats-bar";
import { TypeChart } from "@/components/type-chart";
import { getDb } from "@/lib/db";
import { resolveModuleProgress } from "@/lib/progress";
import { getCatalogData } from "@/lib/store-data";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const source = process.env.SUPABASE_DB_URL ? "supabase" : "local";
  const db = await getDb();

  let data;
  let modules;
  try {
    [data, modules] = await Promise.all([getCatalogData(db, source), resolveModuleProgress(db)]);
  } finally {
    await db.dispose?.();
  }

  const catalogName = data.settings?.name ?? "Your Catalog";
  const tagline = data.settings?.tagline ?? "Run Week 0's SQL to name your catalog.";
  const showSecurity = data.security.rls || data.security.publicView;
  const showChart = data.typeBreakdown.length > 0;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row lg:items-start">
      <ProgressTracker modules={modules} />
      <section className="grid flex-1 gap-6">
        <header className="rounded-xl border border-slate-700 bg-slate-900/80 p-6">
          <Link href="/" className="text-xs font-medium text-sky-300 transition hover:text-sky-200">
            ← Course map
          </Link>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">
            {source === "supabase" ? "Live from Supabase" : "Local preview (reference SQL)"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">{catalogName}</h1>
          <p className="mt-2 text-slate-300">{tagline}</p>
        </header>

        {data.stats && <StatsBar stats={data.stats} />}

        <Catalog planets={data.planets} />

        {data.missions.length > 0 && <MissionsPanel missions={data.missions} />}

        {data.normalization && (
          <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
            <h2 className="text-lg font-semibold text-white">Normalization</h2>
            <p className="mt-2 text-sm text-slate-300">
              {data.normalization.importRows} denormalized import rows normalized
              into {data.normalization.stars} stars (3NF) — no repeated star-class
              data.
            </p>
          </section>
        )}

        {showChart && <TypeChart data={data.typeBreakdown} />}

        {data.observationLog.length > 0 && <ObservationLog observations={data.observationLog} />}

        {showSecurity && (
          <SecurityPanel rls={data.security.rls} publicView={data.security.publicView} />
        )}

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Build roadmap</h2>
          <p className="text-sm text-slate-400">
            Each week you run one SQL script in Supabase. When its objects exist,
            the feature it powers goes live above.
          </p>
          <div className="grid gap-4">
            {modules.map((module) => (
              <ModulePanel key={module.slug} module={module} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
