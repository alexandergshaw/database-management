import Link from "next/link";

import { CategoryChart } from "@/components/category-chart";
import { ModulePanel } from "@/components/module-panel";
import { OrderHistory } from "@/components/order-history";
import { ProgressTracker } from "@/components/progress-tracker";
import { SecurityPanel } from "@/components/security-panel";
import { StatsBar } from "@/components/stats-bar";
import { Storefront } from "@/components/storefront";
import { SuppliersPanel } from "@/components/suppliers-panel";
import { getDb } from "@/lib/db";
import { resolveModuleProgress } from "@/lib/progress";
import { getStoreData } from "@/lib/store-data";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const source = process.env.SUPABASE_DB_URL ? "supabase" : "local";
  const db = await getDb();

  let data;
  let modules;
  try {
    [data, modules] = await Promise.all([getStoreData(db, source), resolveModuleProgress(db)]);
  } finally {
    await db.dispose?.();
  }

  const storeName = data.settings?.storeName ?? "Your Storefront";
  const tagline = data.settings?.tagline ?? "Run Week 0's SQL to name your store.";
  const showSecurity = data.security.rls || data.security.publicCatalog;
  const showChart = data.categoryRevenue.some((row) => row.revenue > 0);

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
          <h1 className="mt-2 text-3xl font-semibold text-white">{storeName}</h1>
          <p className="mt-2 text-slate-300">{tagline}</p>
        </header>

        {data.stats && <StatsBar stats={data.stats} />}

        <Storefront products={data.products} />

        {data.suppliers.length > 0 && <SuppliersPanel suppliers={data.suppliers} />}

        {data.normalization && (
          <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
            <h2 className="text-lg font-semibold text-white">Normalization</h2>
            <p className="mt-2 text-sm text-slate-300">
              {data.normalization.importRows} denormalized import rows normalized
              into {data.normalization.brands} brands (3NF) — no repeated country
              data.
            </p>
          </section>
        )}

        {showChart && <CategoryChart data={data.categoryRevenue} />}

        {data.orderHistory.length > 0 && <OrderHistory orders={data.orderHistory} />}

        {showSecurity && (
          <SecurityPanel rls={data.security.rls} publicCatalog={data.security.publicCatalog} />
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
