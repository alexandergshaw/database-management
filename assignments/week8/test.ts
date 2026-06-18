import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase } from "@/lib/migrations-harness";

let db: PGlite;

beforeAll(async () => {
  db = await buildDatabase("0008");
});

afterAll(async () => {
  await db?.close();
});

const scalar = async (sql: string): Promise<number> => {
  const res = await db.query<Record<string, unknown>>(sql);
  return Number(Object.values(res.rows[0])[0]);
};

describe("Week 8 — Orders (CRUD)", () => {
  it("creates orders and order_items tables", async () => {
    const tables = await db.query<{ table_name: string }>(
      `select table_name from information_schema.tables
       where table_name in ('orders', 'order_items')`
    );
    expect(tables.rows.map((r) => r.table_name).sort()).toEqual([
      "order_items",
      "orders",
    ]);
  });

  it("INSERTs paid orders with line items", async () => {
    expect(await scalar(`select count(*)::int from orders`)).toBeGreaterThanOrEqual(2);
    expect(await scalar(`select count(*)::int from order_items`)).toBeGreaterThanOrEqual(2);
  });

  it("DELETEs the cancelled order", async () => {
    expect(await scalar(`select count(*)::int from orders where status = 'cancelled'`)).toBe(0);
  });

  it("UPDATEs stock for what was sold", async () => {
    // Trail Daypack 22L started at 24, one sold -> 23.
    expect(
      await scalar(`select stock_count from products where name = 'Trail Daypack 22L'`)
    ).toBe(23);
    // Merino Wool Socks started at 200, three sold -> 197.
    expect(
      await scalar(`select stock_count from products where name = 'Merino Wool Socks'`)
    ).toBe(197);
  });
});
