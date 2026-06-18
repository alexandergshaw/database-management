import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase } from "@/lib/migrations-harness";

let db: PGlite;

beforeAll(async () => {
  db = await buildDatabase("0002");
});

afterAll(async () => {
  await db?.close();
});

describe("Week 2 — Suppliers", () => {
  it("creates a suppliers table with at least three suppliers", async () => {
    const res = await db.query<{ n: number }>(
      `select count(*)::int as n from suppliers`
    );
    expect(res.rows[0].n).toBeGreaterThanOrEqual(3);
  });

  it("adds a supplier_id foreign key on products", async () => {
    const fk = await db.query(
      `select 1
       from information_schema.table_constraints tc
       join information_schema.constraint_column_usage ccu
         on ccu.constraint_name = tc.constraint_name
       where tc.table_name = 'products'
         and tc.constraint_type = 'FOREIGN KEY'
         and ccu.table_name = 'suppliers'`
    );
    expect(fk.rows.length).toBeGreaterThan(0);
  });

  it("assigns every product to a supplier", async () => {
    const res = await db.query<{ n: number }>(
      `select count(*)::int as n from products where supplier_id is null`
    );
    expect(res.rows[0].n).toBe(0);
  });
});
