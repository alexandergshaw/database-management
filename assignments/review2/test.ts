import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase, readAssignmentFile } from "@/lib/migrations-harness";

let db: PGlite;

beforeAll(async () => {
  db = await buildDatabase("0010");
});

afterAll(async () => {
  await db?.close();
});

describe("Review 2 — best-selling products", () => {
  it("ranks products by units sold, highest first", async () => {
    const sql = readAssignmentFile("review2", "query.sql");
    const res = await db.query<{ product: string; units_sold: number }>(sql);

    expect(res.rows.length).toBeGreaterThan(0);
    // Merino Wool Socks sold 3 — the top seller.
    expect(res.rows[0].product).toBe("Merino Wool Socks");
    expect(Number(res.rows[0].units_sold)).toBe(3);
  });
});
