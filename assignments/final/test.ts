import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase, readAssignmentFile } from "@/lib/migrations-harness";

let db: PGlite;

beforeAll(async () => {
  db = await buildDatabase("0015");
});

afterAll(async () => {
  await db?.close();
});

describe("Final — Q1 category revenue", () => {
  it("returns revenue per category, highest first", async () => {
    const sql = readAssignmentFile("final", "q1_category_revenue.sql");
    const res = await db.query<{ category: string; revenue: string }>(sql);

    expect(res.rows.length).toBeGreaterThan(0);
    const revenues = res.rows.map((r) => Number(r.revenue));
    expect(revenues).toEqual([...revenues].sort((a, b) => b - a));
  });
});

describe("Final — Q2 low stock", () => {
  it("lists products under 50 units with their supplier", async () => {
    const sql = readAssignmentFile("final", "q2_low_stock.sql");
    const res = await db.query<{ product: string; stock_count: number; supplier: string }>(sql);
    const names = res.rows.map((r) => r.product);

    expect(names).toContain("Trail Daypack 22L");
    expect(names).toContain("Packable Rain Jacket");
    // Sorted lowest stock first.
    const stocks = res.rows.map((r) => Number(r.stock_count));
    expect(stocks).toEqual([...stocks].sort((a, b) => a - b));
  });
});
