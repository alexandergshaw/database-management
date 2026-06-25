import type { ObservationRow } from "@/lib/store-data";

interface ObservationLogProps {
  observations: ObservationRow[];
}

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

export function ObservationLog({ observations }: ObservationLogProps) {
  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
      <h2 className="text-lg font-semibold text-white">Observation log</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="py-2 pr-4 font-medium">Astronomer</th>
              <th className="py-2 pr-4 font-medium">Planet</th>
              <th className="py-2 pr-4 font-medium">Magnitude</th>
              <th className="py-2 pr-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {observations.map((obs) => (
              <tr key={obs.id}>
                <td className="py-2 pr-4 text-slate-200">{obs.astronomer}</td>
                <td className="py-2 pr-4 text-slate-300">{obs.planet}</td>
                <td className="py-2 pr-4 text-slate-300">{obs.magnitude}</td>
                <td className="py-2 pr-4 text-slate-400">
                  {dateFormatter.format(new Date(obs.observedAt))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
