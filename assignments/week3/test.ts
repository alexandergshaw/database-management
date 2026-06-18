import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase } from "@/lib/migrations-harness";

let db: PGlite;

beforeAll(async () => {
  db = await buildDatabase("0003");
});

afterAll(async () => {
  await db?.close();
});

describe("Week 3 — Categories (many-to-many) & business rules", () => {
  it("creates categories and a product_categories junction table", async () => {
    const tables = await db.query<{ table_name: string }>(
      `select table_name from information_schema.tables
       where table_name in ('categories', 'product_categories')`
    );
    expect(tables.rows.map((r) => r.table_name).sort()).toEqual([
      "categories",
      "product_categories",
    ]);
  });

  it("links products to multiple categories", async () => {
    const links = await db.query<{ n: number }>(
      `select count(*)::int as n from product_categories`
    );
    expect(links.rows[0].n).toBeGreaterThanOrEqual(6);

    // At least one product belongs to more than one category (true M:N).
    const multi = await db.query<{ n: number }>(
      `select count(*)::int as n from (
         select product_id from product_categories
         group by product_id having count(*) > 1
       ) t`
    );
    expect(multi.rows[0].n).toBeGreaterThan(0);
  });

  it("enforces the stock business rule with a CHECK constraint", async () => {
    await expect(
      db.query(
        `insert into products (name, description, price, stock_count)
         values ('Bulk Glitch', 'too much', 5, 9999999)`
      )
    ).rejects.toThrow();
  });
});
