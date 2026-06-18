import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase } from "@/lib/migrations-harness";

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
  status: string;
  createdAt: string;
}

export interface CategoryRevenue {
  category: string;
  revenue: number;
}

export interface StoreData {
  /** "supabase" when reading the live project, "local" when replaying migrations. */
  source: "supabase" | "local";
  settings: StoreSettings | null;
  products: Product[];
  suppliers: Supplier[];
  categories: string[];
  customerCount: number;
  orderCount: number;
  stats: StoreStats | null;
  orderHistory: OrderHistoryRow[];
  categoryRevenue: CategoryRevenue[];
  hasCheckout: boolean;
  security: { rlsOnCustomers: boolean; hasPublicCatalog: boolean };
}

type Row = Record<string, unknown>;

interface Db {
  query: (sql: string) => Promise<Row[]>;
  dispose?: () => Promise<void>;
}

// The homepage and tests run the same SQL. In production a Postgres connection
// string (SUPABASE_DB_URL) points at the student's live Supabase database — the
// one their pushed migrations modified. Without it, we replay the migration
// files into in-process Postgres so the homepage still mirrors the SQL locally.

let pool: { query: (sql: string) => Promise<{ rows: Row[] }> } | null = null;

async function getProdDb(connectionString: string): Promise<Db> {
  if (!pool) {
    const { Pool } = await import("pg");
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 3,
    });
  }
  return { query: async (sql) => (await pool!.query(sql)).rows };
}

async function getLocalDb(): Promise<Db> {
  const db: PGlite = await buildDatabase();
  return {
    query: async (sql) => (await db.query<Row>(sql)).rows,
    dispose: () => db.close(),
  };
}

export async function getStoreData(): Promise<StoreData> {
  const url = process.env.SUPABASE_DB_URL;
  const source: StoreData["source"] = url ? "supabase" : "local";
  const db = url ? await getProdDb(url) : await getLocalDb();

  try {
    return await readAll(db, source);
  } finally {
    await db.dispose?.();
  }
}

// Every feature is read defensively: a table or view a later week hasn't created
// yet simply yields nothing, which is what drives the progressive homepage.
async function sq(db: Db, sql: string): Promise<Row[]> {
  try {
    return await db.query(sql);
  } catch {
    return [];
  }
}

async function one(db: Db, sql: string): Promise<Row | null> {
  return (await sq(db, sql))[0] ?? null;
}

async function readAll(db: Db, source: StoreData["source"]): Promise<StoreData> {
  const settingsRow = await one(
    db,
    "select store_name, tagline from store_settings limit 1"
  );

  const productRows = await sq(
    db,
    "select id, name, description, price, stock_count from products order by name"
  );
  const supplierLinks = await sq(
    db,
    "select p.id as product_id, s.name as supplier_name from products p join suppliers s on s.id = p.supplier_id"
  );
  const categoryLinks = await sq(
    db,
    "select pc.product_id, c.name as category from product_categories pc join categories c on c.id = pc.category_id order by c.name"
  );

  let supplierRows = await sq(db, "select id, name, country from suppliers order by name");
  if (supplierRows.length === 0) {
    // Before Week 4 the country column doesn't exist yet.
    supplierRows = await sq(db, "select id, name, null::text as country from suppliers order by name");
  }

  const categoryRows = await sq(db, "select name from categories order by name");
  const customerCountRow = await one(db, "select count(*)::int as n from customers");
  const orderCountRow = await one(db, "select count(*)::int as n from orders");
  const statsRow = await one(
    db,
    "select product_count, order_count, customer_count, revenue, avg_price from store_stats"
  );
  const historyRows = await sq(
    db,
    "select id, customer, item_count, total, status, created_at from order_history limit 10"
  );
  const catRevRows = await sq(db, "select category, revenue from category_revenue");
  const checkoutRow = await one(
    db,
    "select to_regprocedure('place_order(uuid,uuid,integer)') is not null as ok"
  );
  const rlsRow = await one(db, "select relrowsecurity as rls from pg_class where relname = 'customers'");
  const publicCatalogRow = await one(
    db,
    "select to_regclass('public.public_catalog') is not null as ok"
  );

  const supplierByProduct = new Map(
    supplierLinks.map((l) => [String(l.product_id), String(l.supplier_name)])
  );
  const categoriesByProduct = new Map<string, string[]>();
  for (const link of categoryLinks) {
    const key = String(link.product_id);
    const list = categoriesByProduct.get(key) ?? [];
    list.push(String(link.category));
    categoriesByProduct.set(key, list);
  }

  const products: Product[] = productRows.map((r) => ({
    id: String(r.id),
    name: String(r.name),
    description: String(r.description),
    price: Number(r.price),
    stockCount: Number(r.stock_count),
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
    categories: categoryRows.map((r) => String(r.name)),
    customerCount: Number(customerCountRow?.n ?? 0),
    orderCount: Number(orderCountRow?.n ?? 0),
    stats: statsRow
      ? {
          productCount: Number(statsRow.product_count),
          orderCount: Number(statsRow.order_count),
          customerCount: Number(statsRow.customer_count),
          revenue: Number(statsRow.revenue),
          avgPrice: Number(statsRow.avg_price),
        }
      : null,
    orderHistory: historyRows.map((r) => ({
      id: String(r.id),
      customer: String(r.customer),
      itemCount: Number(r.item_count),
      total: Number(r.total),
      status: String(r.status),
      createdAt: String(r.created_at),
    })),
    categoryRevenue: catRevRows.map((r) => ({
      category: String(r.category),
      revenue: Number(r.revenue),
    })),
    hasCheckout: Boolean(checkoutRow?.ok),
    security: {
      rlsOnCustomers: Boolean(rlsRow?.rls),
      hasPublicCatalog: Boolean(publicCatalogRow?.ok),
    },
  };
}
