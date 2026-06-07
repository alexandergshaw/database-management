import Link from "next/link";

import type { ModuleProgress } from "@/lib/progress";

interface ProgressTrackerProps {
  modules: ModuleProgress[];
}

export function ProgressTracker({ modules }: ProgressTrackerProps) {
  return (
    <aside className="w-full rounded-xl border border-slate-700 bg-slate-900/70 p-4 lg:w-80">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
        Progress Tracker
      </h2>
      <ul className="mt-4 space-y-2">
        {modules.map((module) => (
          <li key={module.slug}>
            <Link
              href={`/week/${module.slug}`}
              className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 transition hover:border-slate-500"
            >
              <span className="text-sm text-slate-100">
                Week {module.week}: {module.title}
              </span>
              <span
                className={`rounded px-2 py-0.5 text-xs font-semibold ${
                  module.isUnlocked
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-amber-500/20 text-amber-300"
                }`}
              >
                {module.statusLabel}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
