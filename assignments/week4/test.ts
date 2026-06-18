import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase } from "@/lib/migrations-harness";

let db: PGlite;

beforeAll(async () => {
  db = await buildDatabase("0004");
});

afterAll(async () => {
  await db?.close();
});

describe("Week 4 — Normalization (3NF)", () => {
  it("removes the redundant supplier_country column from products", async () => {
    const col = await db.query(
      `select 1 from information_schema.columns
       where table_name = 'products' and column_name = 'supplier_country'`
    );
    expect(col.rows).toHaveLength(0);
  });

  it("moves country onto suppliers with no data lost", async () => {
    const missing = await db.query<{ n: number }>(
      `select count(*)::int as n
       from suppliers s
       where exists (select 1 from products p where p.supplier_id = s.id)
         and s.country is null`
    );
    expect(missing.rows[0].n).toBe(0);
  });

  it("keeps each product reachable to a country through its supplier", async () => {
    const country = await db.query<{ country: string }>(
      `select s.country
       from products p join suppliers s on s.id = p.supplier_id
       where p.name = 'Trail Daypack 22L'`
    );
    expect(country.rows[0].country).toBe("USA");
  });
});
