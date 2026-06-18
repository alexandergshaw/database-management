# Week 9 — Filtering, Sorting, Functions, Aggregations

Raw rows aren't insight. This week you turn them into numbers with aggregate
functions, packaged as a **view** the homepage reads directly.

## Concepts in play
- Aggregates: `count()`, `sum()`, `avg()`, `round()`.
- A **view** is a saved query you can select from like a table.

## Your SQL task
Edit **`supabase/migrations/0009_week9_store_stats.sql`** and create a
`store_stats` view exposing: `product_count`, `order_count`, `customer_count`,
`revenue` (sum of `quantity * unit_price` across order items), and `avg_price`.

## Done when
- `assignments/week9/test.ts` passes (the view exists and the counts + revenue
  are correct).
- A **stats bar** appears at the top of the homepage.

---

**If it fails:** Do not merge a broken PR. Close it and start a fresh branch from `main` (production only updates on merge). Rebuild a dirtied database with `npm run db:reset`, or start this week over with `npm run reset:week -- <folder>`. See "Recovering from a failed assignment" in the README.
