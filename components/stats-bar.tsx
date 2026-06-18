import type { StoreStats } from "@/lib/store-data";

interface StatsBarProps {
  stats: StoreStats;
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function StatsBar({ stats }: StatsBarProps) {
  const cells = [
    { label: "Products", value: String(stats.productCount) },
    { label: "Orders", value: String(stats.orderCount) },
    { label: "Customers", value: String(stats.customerCount) },
    { label: "Revenue", value: currency.format(stats.revenue) },
    { label: "Avg price", value: currency.format(stats.avgPrice) },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="rounded-xl border border-slate-700 bg-slate-900/70 p-4"
        >
          <p className="text-xs uppercase tracking-wide text-slate-400">{cell.label}</p>
          <p className="mt-1 text-xl font-semibold text-white">{cell.value}</p>
        </div>
      ))}
    </section>
  );
}
