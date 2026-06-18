import type { Supplier } from "@/lib/store-data";

interface SuppliersPanelProps {
  suppliers: Supplier[];
}

export function SuppliersPanel({ suppliers }: SuppliersPanelProps) {
  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
      <h2 className="text-lg font-semibold text-white">Suppliers</h2>
      <ul className="mt-3 divide-y divide-slate-800">
        {suppliers.map((supplier) => (
          <li key={supplier.id} className="flex items-center justify-between py-2">
            <span className="text-sm text-slate-200">{supplier.name}</span>
            <span className="text-xs text-slate-400">
              {supplier.country ?? "—"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
