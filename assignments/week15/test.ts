import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase } from "@/lib/migrations-harness";

let db: PGlite;

beforeAll(async () => {
  db = await buildDatabase("0015");
});

afterAll(async () => {
  await db?.close();
});

describe("Week 15 — Analytics & performance", () => {
  it("creates indexes on the order foreign keys", async () => {
    const res = await db.query<{ indexname: string }>(
      `select indexname from pg_indexes
       where tablename in ('order_items', 'orders')`
    );
    const names = res.rows.map((r) => r.indexname);
    expect(names).toContain("idx_order_items_product");
    expect(names).toContain("idx_orders_customer");
  });

  it("creates a category_revenue analytics view", async () => {
    const view = await db.query(
      `select 1 from information_schema.views where table_name = 'category_revenue'`
    );
    expect(view.rows).toHaveLength(1);
  });

  it("reports revenue per category, highest first", async () => {
    const res = await db.query<{ category: string; revenue: string }>(
      `select category, revenue from category_revenue`
    );
    expect(res.rows.length).toBeGreaterThan(0);

    const revenues = res.rows.map((r) => Number(r.revenue));
    const sorted = [...revenues].sort((a, b) => b - a);
    expect(revenues).toEqual(sorted);
  });
});
