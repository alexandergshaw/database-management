import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase } from "@/lib/migrations-harness";

let db: PGlite;

beforeAll(async () => {
  db = await buildDatabase("0005");
});

afterAll(async () => {
  await db?.close();
});

describe("Week 5 — Customers, keys & constraints", () => {
  it("creates a customers table with at least three customers", async () => {
    const res = await db.query<{ n: number }>(
      `select count(*)::int as n from customers`
    );
    expect(res.rows[0].n).toBeGreaterThanOrEqual(3);
  });

  it("enforces a UNIQUE email", async () => {
    await expect(
      db.query(
        `insert into customers (email, full_name)
         values ('ana.ramirez@example.com', 'Impostor')`
      )
    ).rejects.toThrow();
  });

  it("requires full_name (NOT NULL)", async () => {
    await expect(
      db.query(
        `insert into customers (email, full_name)
         values ('nameless@example.com', null)`
      )
    ).rejects.toThrow();
  });
});
