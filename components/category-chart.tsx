import type { CategoryRevenue } from "@/lib/store-data";

interface CategoryChartProps {
  data: CategoryRevenue[];
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function CategoryChart({ data }: CategoryChartProps) {
  const max = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
      <h2 className="text-lg font-semibold text-white">Revenue by category</h2>
      <ul className="mt-4 space-y-3">
        {data.map((row) => (
          <li key={row.category}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-200">{row.category}</span>
              <span className="text-slate-400">{currency.format(row.revenue)}</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-500/70"
                style={{ width: `${Math.max((row.revenue / max) * 100, 2)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
