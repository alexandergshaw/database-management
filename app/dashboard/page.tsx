import Link from "next/link";

import { CategoryChart } from "@/components/category-chart";
import { ModulePanel } from "@/components/module-panel";
import { OrderHistory } from "@/components/order-history";
import { ProgressTracker } from "@/components/progress-tracker";
import { SecurityPanel } from "@/components/security-panel";
import { StatsBar } from "@/components/stats-bar";
import { Storefront } from "@/components/storefront";
import { SuppliersPanel } from "@/components/suppliers-panel";
import { courseModules } from "@/lib/course-modules";
import { resolveModuleProgress } from "@/lib/progress";
import { getStoreData } from "@/lib/store-data";
import { getModuleTestStatus } from "@/lib/test-status";

// Always reflect the current database state (live Supabase, or local migrations).
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const data = await getStoreData();
  const modules = resolveModuleProgress(courseModules, getModuleTestStatus());

  const storeName = data.settings?.storeName ?? "Your Storefront";
  const tagline = data.settings?.tagline ?? "Complete Week 0 to name your store.";

  const showSecurity = data.security.rlsOnCustomers || data.security.hasPublicCatalog;
  const showChart = data.categoryRevenue.some((row) => row.revenue > 0);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row lg:items-start">
      <ProgressTracker modules={modules} />
      <section className="grid flex-1 gap-6">
        <header className="rounded-xl border border-slate-700 bg-slate-900/80 p-6">
          <Link
            href="/"
            className="text-xs font-medium text-sky-300 transition hover:text-sky-200"
          >
            ← Course map
          </Link>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">
            {data.source === "supabase"
              ? "Live from Supabase"
              : "Local preview (migrations replayed)"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">{storeName}</h1>
          <p className="mt-2 text-slate-300">{tagline}</p>
        </header>

        {data.stats && <StatsBar stats={data.stats} />}

        <Storefront products={data.products} />

        {data.suppliers.length > 0 && <SuppliersPanel suppliers={data.suppliers} />}

        {showChart && <CategoryChart data={data.categoryRevenue} />}

        {data.orderHistory.length > 0 && <OrderHistory orders={data.orderHistory} />}

        {showSecurity && (
          <SecurityPanel
            rlsOnCustomers={data.security.rlsOnCustomers}
            hasPublicCatalog={data.security.hasPublicCatalog}
          />
        )}

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Build roadmap</h2>
          <p className="text-sm text-slate-400">
            Each week you write one SQL migration. When it lands, the feature it
            powers goes live above.
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
