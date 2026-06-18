import { afterAll, beforeAll, describe, expect, it } from "vitest";

import type { PGlite } from "@electric-sql/pglite";

import { buildDatabase } from "@/lib/migrations-harness";

let db: PGlite;

beforeAll(async () => {
  db = await buildDatabase("0013");
});

afterAll(async () => {
  await db?.close();
});

const scalar = async (sql: string): Promise<unknown> => {
  const res = await db.query<Record<string, unknown>>(sql);
  return Object.values(res.rows[0])[0];
};

describe("Week 13 — place_order transaction", () => {
  it("defines the place_order function", async () => {
    expect(
      await scalar(`select to_regprocedure('place_order(uuid,uuid,integer)') is not null`)
    ).toBe(true);
  });

  it("creates an order and decrements stock atomically", async () => {
    const before = Number(
      await scalar(`select stock_count from products where name = 'Insulated Water Bottle'`)
    );
    const orders = Number(await scalar(`select count(*)::int from orders`));

    await db.query(
      `select place_order(
         (select id from customers where email = 'chiara.rossi@example.com'),
         (select id from products where name = 'Insulated Water Bottle'),
         3)`
    );

    expect(
      Number(
        await scalar(`select stock_count from products where name = 'Insulated Water Bottle'`)
      )
    ).toBe(before - 3);
    expect(Number(await scalar(`select count(*)::int from orders`))).toBe(orders + 1);
  });

  it("rolls back and refuses to oversell", async () => {
    const before = Number(
      await scalar(`select stock_count from products where name = 'Merino Wool Socks'`)
    );

    await expect(
      db.query(
        `select place_order(
           (select id from customers where email = 'ana.ramirez@example.com'),
           (select id from products where name = 'Merino Wool Socks'),
           1000000)`
      )
    ).rejects.toThrow();

    // Nothing changed — the failed transaction left no partial writes.
    expect(
      Number(
        await scalar(`select stock_count from products where name = 'Merino Wool Socks'`)
      )
    ).toBe(before);
  });
});
