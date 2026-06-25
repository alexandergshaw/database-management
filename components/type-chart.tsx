import type { TypeRow } from "@/lib/store-data";

interface TypeChartProps {
  data: TypeRow[];
}

export function TypeChart({ data }: TypeChartProps) {
  const max = Math.max(...data.map((d) => d.planets), 1);

  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
      <h2 className="text-lg font-semibold text-white">Planets by type</h2>
      <ul className="mt-4 space-y-3">
        {data.map((row) => (
          <li key={row.type}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-200">{row.type}</span>
              <span className="text-slate-400">
                {row.planets} · avg {row.avgRadiusKm.toLocaleString()} km
              </span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-sky-500/70"
                style={{ width: `${Math.max((row.planets / max) * 100, 4)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
