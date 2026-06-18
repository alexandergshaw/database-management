import type { Product } from "@/lib/store-data";

interface StorefrontProps {
  products: Product[];
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function Storefront({ products }: StorefrontProps) {
  if (products.length === 0) {
    return (
      <section className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
        <h2 className="text-lg font-semibold text-slate-200">No products yet</h2>
        <p className="mt-2 text-sm text-slate-400">
          Complete <span className="font-mono">Week 1</span> — create the{" "}
          <span className="font-mono">products</span> table and seed it — to fill
          the storefront.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-white">Storefront</h2>
        <span className="text-sm text-slate-400">{products.length} products</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="flex flex-col rounded-xl border border-slate-700 bg-slate-900/70 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-white">{product.name}</h3>
              <span className="whitespace-nowrap text-base font-semibold text-emerald-300">
                {priceFormatter.format(product.price)}
              </span>
            </div>
            <p className="mt-2 flex-1 text-sm text-slate-300">{product.description}</p>

            {product.categories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {product.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full bg-sky-500/15 px-2 py-0.5 text-xs font-medium text-sky-300"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${
                  product.stockCount > 0
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-rose-500/15 text-rose-300"
                }`}
              >
                {product.stockCount > 0
                  ? `${product.stockCount} in stock`
                  : "Out of stock"}
              </span>
              {product.supplierName && (
                <span className="text-xs text-slate-400">by {product.supplierName}</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
