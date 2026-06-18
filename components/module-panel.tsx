import type { ModuleProgress } from "@/lib/progress";

interface ModulePanelProps {
  module: ModuleProgress;
}

export function ModulePanel({ module }: ModulePanelProps) {
  return (
    <article className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        Week {module.week} • {module.type}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-white">{module.title}</h3>
      <p className="mt-2 text-sm text-slate-300">{module.summary}</p>
      {module.isUnlocked ? (
        <p className="mt-4 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
          Unlocked —{" "}
          <code className="font-mono">assignments/{module.folder}/test.ts</code>{" "}
          passes.
        </p>
      ) : (
        <p className="mt-4 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
          Locked — make{" "}
          <code className="font-mono">assignments/{module.folder}/test.ts</code>{" "}
          pass to unlock.
        </p>
      )}
    </article>
  );
}
