# Week 1 — Relational Foundations

A storefront needs something to sell. This week you create your first real
entity — a table of products — and seed it with rows. The homepage renders every
row as a product card.

## Concepts in play
- A **table** models one kind of thing (an *entity*); a **row** is one instance.
- A **column** is an *attribute* with a **data type** (`text`, `numeric`,
  `integer`, `timestamptz`).
- A **primary key** uniquely identifies each row.
- A **constraint** (`not null`, `check`) encodes a rule the data must obey.

## Your SQL task
Open **`supabase/migrations/0001_week1_products.sql`** — the only file you edit
this week. Create a `products` table with these columns, then insert **at least
three** products:

| column | type | rule |
|---|---|---|
| `id` | uuid | primary key, defaults to `gen_random_uuid()` |
| `name` | text | required (`not null`) |
| `description` | text | required |
| `price` | numeric(10,2) | required, `check (price >= 0)` |
| `stock_count` | integer | required, defaults to 0, `check (stock_count >= 0)` |
| `created_at` | timestamptz | defaults to `now()` |

> This migration runs **on top of** Week 0 — your `store_settings` table is
> already there. Each week builds on the last, so keep earlier migrations intact.

## Done when
- `assignments/week1/test.ts` passes (table + columns exist, ≥ 3 rows, prices
  non-negative, the `CHECK` constraint rejects a negative price).
- Product cards appear in the **Storefront** section of the homepage.

---

**If it fails:** Do not merge a broken PR. Close it and start a fresh branch from `main` (production only updates on merge). Rebuild a dirtied database with `npm run db:reset`, or start this week over with `npm run reset:week -- <folder>`. See "Recovering from a failed assignment" in the README.
