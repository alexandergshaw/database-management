import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { getDb, type Db } from "./db";
import { getStoreData } from "./store-data";
import { weeks } from "./weeks";

// Instructor sanity check: seed an in-process database from every reference
// solution.sql and confirm each week's probe unlocks and the storefront reads
// correctly. Replaces the per-week test files of the migration-based design.
let db: Db;

beforeAll(async () => {
  db = await getDb();
});

afterAll(async () => {
  await db.dispose?.();
});

describe("reference solutions satisfy every probe", () => {
  for (const week of weeks) {
    it(`week ${week.week} — ${week.slug} unlocks`, async () => {
      expect(await week.probe(db)).toBe(true);
    });
  }
});

describe("store data reflects the seeded storefront", () => {
  it("reads settings, products, suppliers, and categories", async () => {
    const data = await getStoreData(db, "local");
    expect(data.settings?.storeName).toBeTruthy();
    expect(data.products).toHaveLength(5);
    expect(data.products.every((p) => p.supplierName !== null)).toBe(true);
    expect(data.products.some((p) => p.categories.length > 0)).toBe(true);
    expect(data.suppliers.length).toBeGreaterThanOrEqual(3);
  });

  it("computes stats, revenue, and analytics", async () => {
    const data = await getStoreData(db, "local");
    // 79.99 + 24.50*2 + 18*3 = 182.99
    expect(data.stats?.revenue).toBeCloseTo(182.99, 2);
    expect(data.orderHistory.length).toBeGreaterThan(0);
    expect(data.categoryRevenue.length).toBeGreaterThan(0);
    expect(data.hasCheckout).toBe(true);
    expect(data.security.publicCatalog).toBe(true);
  });
});
