import type { Db, Row } from "@/lib/db";

export interface StoreSettings {
  storeName: string;
  tagline: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockCount: number;
  supplierName: string | null;
  categories: string[];
}

export interface Supplier {
  id: string;
  name: string;
  country: string | null;
}

export interface StoreStats {
  productCount: number;
  orderCount: number;
  customerCount: number;
  revenue: number;
  avgPrice: number;
}

export interface OrderHistoryRow {
  id: string;
  customer: string;
  itemCount: number;
  total: number;
  createdAt: string;
}

export interface CategoryRevenue {
  category: string;
  revenue: number;
}

export interface StoreData {
  source: "supabase" | "local";
  settings: StoreSettings | null;
  products: Product[];
  suppliers: Supplier[];
  normalization: { importRows: number; brands: number } | null;
  customerCount: number;
  orderCount: number;
  stats: StoreStats | null;
  orderHistory: OrderHistoryRow[];
  categoryRevenue: CategoryRevenue[];
  hasCheckout: boolean;
  security: { rls: boolean; publicCatalog: boolean };
}

const num = (v: unknown) => Number(v ?? 0);

async function sq(db: Db, sql: string): Promise<Row[]> {
  try {
    return await db.query(sql);
  } catch {
    return [];
  }
}

const one = async (db: Db, sql: string): Promise<Row | null> => (await sq(db, sql))[0] ?? null;

export async function getStoreData(db: Db, source: StoreData["source"]): Promise<StoreData> {
  const settingsRow = await one(db, "select store_name, tagline from store_settings limit 1");

  const productRows = await sq(
    db,
    "select id, name, description, price, stock_count from products order by name"
  );
  const supplierLinks = await sq(
    db,
    "select ps.product_id, s.name from product_suppliers ps join suppliers s on s.id = ps.supplier_id"
  );
  const categoryLinks = await sq(
    db,
    "select pc.product_id, c.name from product_categories pc join categories c on c.id = pc.category_id order by c.name"
  );
  const supplierRows = await sq(db, "select id, name, country from suppliers order by name");
  const importRow = await one(db, "select count(*)::int as n from catalog_import");
  const brandRow = await one(db, "select count(*)::int as n from nf_brands");
  const customerRow = await one(db, "select count(*)::int as n from customers");
  const orderRow = await one(db, "select count(*)::int as n from orders");
  const statsRow = await one(
    db,
    "select product_count, order_count, customer_count, revenue, avg_price from store_stats"
  );
  const historyRows = await sq(
    db,
    "select id, customer, item_count, total, created_at from order_history limit 10"
  );
  const catRevRows = await sq(db, "select category, revenue from category_revenue");
  const checkoutRow = await one(
    db,
    "select to_regprocedure('place_order(text,integer)') is not null as ok"
  );
  const rlsRow = await one(db, "select relrowsecurity as rls from pg_class where relname = 'customer_pii'");
  const publicCatalogRow = await one(
    db,
    "select to_regclass('public.public_catalog') is not null as ok"
  );

  const supplierByProduct = new Map<string, string>();
  for (const link of supplierLinks) {
    const key = String(link.product_id);
    if (!supplierByProduct.has(key)) supplierByProduct.set(key, String(link.name));
  }
  const categoriesByProduct = new Map<string, string[]>();
  for (const link of categoryLinks) {
    const key = String(link.product_id);
    const list = categoriesByProduct.get(key) ?? [];
    list.push(String(link.name));
    categoriesByProduct.set(key, list);
  }

  const products: Product[] = productRows.map((r) => ({
    id: String(r.id),
    name: String(r.name),
    description: String(r.description),
    price: num(r.price),
    stockCount: num(r.stock_count),
    supplierName: supplierByProduct.get(String(r.id)) ?? null,
    categories: categoriesByProduct.get(String(r.id)) ?? [],
  }));

  return {
    source,
    settings: settingsRow
      ? { storeName: String(settingsRow.store_name), tagline: String(settingsRow.tagline) }
      : null,
    products,
    suppliers: supplierRows.map((r) => ({
      id: String(r.id),
      name: String(r.name),
      country: r.country == null ? null : String(r.country),
    })),
    normalization: brandRow ? { importRows: num(importRow?.n), brands: num(brandRow.n) } : null,
    customerCount: num(customerRow?.n),
    orderCount: num(orderRow?.n),
    stats: statsRow
      ? {
          productCount: num(statsRow.product_count),
          orderCount: num(statsRow.order_count),
          customerCount: num(statsRow.customer_count),
          revenue: num(statsRow.revenue),
          avgPrice: num(statsRow.avg_price),
        }
      : null,
    orderHistory: historyRows.map((r) => ({
      id: String(r.id),
      customer: String(r.customer),
      itemCount: num(r.item_count),
      total: num(r.total),
      createdAt: String(r.created_at),
    })),
    categoryRevenue: catRevRows.map((r) => ({
      category: String(r.category),
      revenue: num(r.revenue),
    })),
    hasCheckout: Boolean(checkoutRow?.ok),
    security: {
      rls: Boolean(rlsRow?.rls),
      publicCatalog: Boolean(publicCatalogRow?.ok),
    },
  };
}
