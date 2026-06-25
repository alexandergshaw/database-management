import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { getDb, type Db } from "./db";
import { getCatalogData } from "./store-data";
import { weeks } from "./weeks";

// Instructor sanity check: seed an in-process database from every reference
// solution.sql and confirm each week's probe unlocks and the catalog reads
// correctly.
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

describe("catalog data reflects the seeded database", () => {
  it("reads settings, planets, moons, and missions", async () => {
    const data = await getCatalogData(db, "local");
    expect(data.settings?.name).toBeTruthy();
    expect(data.planets).toHaveLength(8);
    expect(data.planets.some((p) => p.moonCount > 0)).toBe(true);
    expect(data.planets.some((p) => p.missions.length > 0)).toBe(true);
    expect(data.missions.length).toBeGreaterThanOrEqual(3);
  });

  it("computes stats, observations, analytics, and security", async () => {
    const data = await getCatalogData(db, "local");
    expect(data.stats?.planetCount).toBe(8);
    expect(data.observationCount).toBe(3);
    expect(data.observationLog.length).toBeGreaterThan(0);
    expect(data.typeBreakdown.length).toBeGreaterThan(0);
    expect(data.hasBooking).toBe(true);
    expect(data.security.publicView).toBe(true);
  });
});
