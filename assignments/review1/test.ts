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

describe("Review 1 — products with supplier and country", () => {
  it("returns one row per product with supplier and country", async () => {
    const sql = readAssignmentFile("review1", "query.sql");
    const res = await db.query<{ product: string; supplier: string; country: string }>(sql);

    expect(res.rows).toHaveLength(5);
    const daypack = res.rows.find((r) => r.product === "Trail Daypack 22L");
    expect(daypack?.supplier).toBe("Summit Supply Co.");
    expect(daypack?.country).toBe("USA");
  });
});
