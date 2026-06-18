import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase } from "@/lib/migrations-harness";

let db: PGlite;

beforeAll(async () => {
  db = await buildDatabase("0009");
});

afterAll(async () => {
  await db?.close();
});

describe("Week 9 — Aggregations (store_stats view)", () => {
  it("creates a store_stats view", async () => {
    const view = await db.query(
      `select 1 from information_schema.views where table_name = 'store_stats'`
    );
    expect(view.rows).toHaveLength(1);
  });

  it("aggregates product and order counts", async () => {
    const res = await db.query<{ product_count: number; order_count: number }>(
      `select product_count, order_count from store_stats`
    );
    expect(Number(res.rows[0].product_count)).toBe(5);
    expect(Number(res.rows[0].order_count)).toBe(2);
  });

  it("sums revenue from the line items", async () => {
    // 79.99*1 + 24.50*2 + 18.00*3 = 182.99
    const res = await db.query<{ revenue: string }>(
      `select revenue from store_stats`
    );
    expect(Number(res.rows[0].revenue)).toBeCloseTo(182.99, 2);
  });
});
