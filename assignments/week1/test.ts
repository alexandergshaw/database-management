import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase } from "@/lib/migrations-harness";

// Replays migrations through Week 1 (0000 + 0001) — Week 1 builds on Week 0.
let db: PGlite;

beforeAll(async () => {
  db = await buildDatabase("0001");
});

afterAll(async () => {
  await db?.close();
});

describe("Week 1 — Products", () => {
  it("creates a products table with the required columns", async () => {
    const res = await db.query<{ column_name: string }>(
      `select column_name from information_schema.columns where table_name = 'products'`
    );
    const columns = res.rows.map((row) => row.column_name);

    for (const required of ["id", "name", "description", "price", "stock_count"]) {
      expect(columns).toContain(required);
    }
  });

  it("seeds at least three products", async () => {
    const res = await db.query<{ count: string }>(
      `select count(*)::text as count from products`
    );
    expect(Number(res.rows[0].count)).toBeGreaterThanOrEqual(3);
  });

  it("stores every product with a name and a non-negative price", async () => {
    const res = await db.query<{ bad: string }>(
      `select count(*)::text as bad from products
       where name is null or trim(name) = '' or price < 0`
    );
    expect(Number(res.rows[0].bad)).toBe(0);
  });

  it("rejects a product with a negative price (CHECK constraint)", async () => {
    await expect(
      db.query(
        `insert into products (name, description, price, stock_count)
         values ('Bad', 'invalid', -1, 0)`
      )
    ).rejects.toThrow();
  });
});
