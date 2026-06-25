import type { CatalogStats } from "@/lib/store-data";

interface StatsBarProps {
  stats: CatalogStats;
}

export function StatsBar({ stats }: StatsBarProps) {
  const cells = [
    { label: "Planets", value: String(stats.planetCount) },
    { label: "Moons", value: String(stats.moonCount) },
    { label: "Missions", value: String(stats.missionCount) },
    { label: "Observations", value: String(stats.observationCount) },
    { label: "Avg radius", value: `${stats.avgRadiusKm.toLocaleString()} km` },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {cells.map((cell) => (
        <div key={cell.label} className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">{cell.label}</p>
          <p className="mt-1 text-xl font-semibold text-white">{cell.value}</p>
        </div>
      ))}
    </section>
  );
}
