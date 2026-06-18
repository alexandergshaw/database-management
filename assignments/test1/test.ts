import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase, readAssignmentFile } from "@/lib/migrations-harness";

let db: PGlite;

beforeAll(async () => {
  db = await buildDatabase("0005");
});

afterAll(async () => {
  await db?.close();
});

describe("Test 1 — Q1 products per category", () => {
  it("counts products in every category", async () => {
    const sql = readAssignmentFile("test1", "q1_products_per_category.sql");
    const res = await db.query<{ category: string; products: number }>(sql);

    expect(res.rows).toHaveLength(5);
    const hiking = res.rows.find((r) => r.category === "Hiking");
    expect(Number(hiking?.products)).toBe(4);
  });
});

describe("Test 1 — Q2 inventory value", () => {
  it("sums price times stock across all products", async () => {
    const sql = readAssignmentFile("test1", "q2_inventory_value.sql");
    const res = await db.query<{ inventory_value: string }>(sql);

    // 79.99*24 + 24.50*120 + 18*200 + 39.95*60 + 89*45 = 14861.76
    expect(Number(res.rows[0].inventory_value)).toBeCloseTo(14861.76, 2);
  });
});
