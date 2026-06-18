import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase } from "@/lib/migrations-harness";

// Replays migrations through Week 0 (0000) into a fresh in-process Postgres.
let db: PGlite;

beforeAll(async () => {
  db = await buildDatabase("0000");
});

afterAll(async () => {
  await db?.close();
});

describe("Week 0 — Store settings", () => {
  it("creates a store_settings table", async () => {
    const res = await db.query(
      `select table_name from information_schema.tables where table_name = 'store_settings'`
    );
    expect(res.rows).toHaveLength(1);
  });

  it("seeds a settings row with a non-empty store name and tagline", async () => {
    const res = await db.query<{ store_name: string; tagline: string }>(
      `select store_name, tagline from store_settings`
    );

    expect(res.rows.length).toBeGreaterThanOrEqual(1);
    const row = res.rows[0];
    expect(row.store_name.trim().length).toBeGreaterThan(0);
    expect(row.tagline.trim().length).toBeGreaterThan(0);
  });
});
