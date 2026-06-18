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

describe("Test 2 — Q1 revenue by customer", () => {
  it("totals spend per customer, highest first", async () => {
    const sql = readAssignmentFile("test2", "q1_revenue_by_customer.sql");
    const res = await db.query<{ customer: string; spend: string }>(sql);

    // Ben spent 24.50*2 + 18*3 = 103.00; Ana spent 79.99.
    expect(res.rows[0].customer).toBe("Ben Cole");
    expect(Number(res.rows[0].spend)).toBeCloseTo(103.0, 2);
  });
});

describe("Test 2 — Q2 products never ordered", () => {
  it("lists products with no line items", async () => {
    const sql = readAssignmentFile("test2", "q2_never_ordered.sql");
    const res = await db.query<{ name: string }>(sql);
    const names = res.rows.map((r) => r.name);

    expect(names).toEqual(["Packable Rain Jacket", "Trail Headlamp 300lm"]);
  });
});
