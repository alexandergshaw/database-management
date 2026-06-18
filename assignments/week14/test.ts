import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase } from "@/lib/migrations-harness";

let db: PGlite;

beforeAll(async () => {
  db = await buildDatabase("0014");
});

afterAll(async () => {
  await db?.close();
});

describe("Week 14 — Security & access control", () => {
  it("enables row-level security on customers", async () => {
    const res = await db.query<{ relrowsecurity: boolean }>(
      `select relrowsecurity from pg_class where relname = 'customers'`
    );
    expect(res.rows[0].relrowsecurity).toBe(true);
  });

  it("defines a policy on customers", async () => {
    const res = await db.query<{ n: number }>(
      `select count(*)::int as n from pg_policies where tablename = 'customers'`
    );
    expect(res.rows[0].n).toBeGreaterThan(0);
  });

  it("publishes a public_catalog view with only safe columns", async () => {
    const cols = await db.query<{ column_name: string }>(
      `select column_name from information_schema.columns
       where table_name = 'public_catalog'`
    );
    const names = cols.rows.map((r) => r.column_name);
    expect(names).toContain("name");
    expect(names).toContain("price");
    // No customer/email or internal columns leak through the public view.
    expect(names).not.toContain("email");
    expect(names).not.toContain("stock_count");
  });
});
