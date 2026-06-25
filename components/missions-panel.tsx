import type { Mission } from "@/lib/store-data";

interface MissionsPanelProps {
  missions: Mission[];
}

export function MissionsPanel({ missions }: MissionsPanelProps) {
  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
      <h2 className="text-lg font-semibold text-white">Missions</h2>
      <ul className="mt-3 divide-y divide-slate-800">
        {missions.map((mission) => (
          <li key={mission.id} className="flex items-center justify-between py-2">
            <span className="text-sm text-slate-200">
              {mission.name}
              <span className="ml-2 text-xs text-slate-400">{mission.agency}</span>
            </span>
            <span className="text-xs text-slate-400">
              {mission.targetCount === 1 ? "1 planet" : `${mission.targetCount} planets`}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
