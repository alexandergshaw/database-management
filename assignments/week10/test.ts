import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase } from "@/lib/migrations-harness";

let db: PGlite;

beforeAll(async () => {
  db = await buildDatabase("0010");
});

afterAll(async () => {
  await db?.close();
});

describe("Week 10 — Joins (order_history view)", () => {
  it("creates an order_history view", async () => {
    const view = await db.query(
      `select 1 from information_schema.views where table_name = 'order_history'`
    );
    expect(view.rows).toHaveLength(1);
  });

  it("joins orders to customer names", async () => {
    const res = await db.query<{ customer: string; total: string; item_count: number }>(
      `select customer, total, item_count from order_history order by customer`
    );
    expect(res.rows.length).toBe(2);
    expect(res.rows.map((r) => r.customer)).toContain("Ana Ramirez");
    expect(res.rows.map((r) => r.customer)).toContain("Ben Cole");
  });

  it("totals each order from its line items", async () => {
    // Ben: 24.50*2 + 18.00*3 = 103.00
    const res = await db.query<{ total: string }>(
      `select total from order_history where customer = 'Ben Cole'`
    );
    expect(Number(res.rows[0].total)).toBeCloseTo(103.0, 2);
  });
});
