interface SecurityPanelProps {
  rlsOnCustomers: boolean;
  hasPublicCatalog: boolean;
}

function Badge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <span
        className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${
          ok ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-700 text-slate-400"
        }`}
      >
        {ok ? "✓" : "•"}
      </span>
      <span className="text-slate-200">{label}</span>
    </li>
  );
}

export function SecurityPanel({ rlsOnCustomers, hasPublicCatalog }: SecurityPanelProps) {
  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
      <h2 className="text-lg font-semibold text-white">Security posture</h2>
      <ul className="mt-3 space-y-2">
        <Badge ok={rlsOnCustomers} label="Row-level security enabled on customers" />
        <Badge ok={hasPublicCatalog} label="public_catalog view exposes only safe columns" />
      </ul>
    </section>
  );
}
