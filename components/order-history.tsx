import type { OrderHistoryRow } from "@/lib/store-data";

interface OrderHistoryProps {
  orders: OrderHistoryRow[];
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

export function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
      <h2 className="text-lg font-semibold text-white">Order history</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="py-2 pr-4 font-medium">Customer</th>
              <th className="py-2 pr-4 font-medium">Date</th>
              <th className="py-2 pr-4 font-medium">Items</th>
              <th className="py-2 pr-4 font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 pr-4 text-slate-200">{order.customer}</td>
                <td className="py-2 pr-4 text-slate-400">
                  {dateFormatter.format(new Date(order.createdAt))}
                </td>
                <td className="py-2 pr-4 text-slate-300">{order.itemCount}</td>
                <td className="py-2 pr-4 font-medium text-emerald-300">
                  {currency.format(order.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
