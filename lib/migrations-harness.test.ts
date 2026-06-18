import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase } from "./migrations-harness";

// Applies the full migration chain (weeks 0..15) and checks every object the
// homepage and later weeks depend on exists. This is the integration check for
// the whole product build.
let db: PGlite;

beforeAll(async () => {
  db = await buildDatabase();
});

afterAll(async () => {
  await db?.close();
});

const scalar = async (sql: string): Promise<unknown> => {
  const res = await db.query<Record<string, unknown>>(sql);
  return Object.values(res.rows[0])[0];
};

describe("full migration chain", () => {
  it("creates every expected table", async () => {
    const res = await db.query<{ table_name: string }>(
      `select table_name from information_schema.tables
       where table_schema = 'public' and table_type = 'BASE TABLE'`
    );
    const tables = res.rows.map((r) => r.table_name);
    for (const t of [
      "store_settings",
      "products",
      "suppliers",
      "categories",
      "product_categories",
      "customers",
      "orders",
      "order_items",
    ]) {
      expect(tables).toContain(t);
    }
  });

  it("creates every expected view", async () => {
    const res = await db.query<{ table_name: string }>(
      `select table_name from information_schema.views where table_schema = 'public'`
    );
    const views = res.rows.map((r) => r.table_name);
    for (const v of ["store_stats", "order_history", "public_catalog", "category_revenue"]) {
      expect(views).toContain(v);
    }
  });

  it("normalizes supplier country off products and onto suppliers", async () => {
    const productCols = await db.query(
      `select 1 from information_schema.columns
       where table_name = 'products' and column_name = 'supplier_country'`
    );
    expect(productCols.rows).toHaveLength(0);

    const suppliersWithCountry = await scalar(
      `select count(*)::int from suppliers where country is not null`
    );
    expect(Number(suppliersWithCountry)).toBeGreaterThan(0);
  });

  it("exposes the place_order transaction function", async () => {
    const exists = await scalar(
      `select to_regprocedure('place_order(uuid,uuid,integer)') is not null`
    );
    expect(exists).toBe(true);
  });

  it("place_order decrements stock atomically", async () => {
    const before = Number(
      await scalar(`select stock_count from products where name = 'Trail Daypack 22L'`)
    );
    await db.query(
      `select place_order(
         (select id from customers where email = 'ana.ramirez@example.com'),
         (select id from products where name = 'Trail Daypack 22L'),
         2)`
    );
    const after = Number(
      await scalar(`select stock_count from products where name = 'Trail Daypack 22L'`)
    );
    expect(after).toBe(before - 2);
  });

  it("place_order refuses to oversell", async () => {
    await expect(
      db.query(
        `select place_order(
           (select id from customers where email = 'ana.ramirez@example.com'),
           (select id from products where name = 'Trail Daypack 22L'),
           1000000)`
      )
    ).rejects.toThrow();
  });

  it("enables row-level security on customers", async () => {
    const rls = await scalar(
      `select relrowsecurity from pg_class where relname = 'customers'`
    );
    expect(rls).toBe(true);
  });

  it("computes category revenue", async () => {
    const res = await db.query(`select category, revenue from category_revenue`);
    expect(res.rows.length).toBeGreaterThan(0);
  });
});
