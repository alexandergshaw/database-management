# Week 4 — Normalization (1NF, 2NF, 3NF)

In Week 2 you stored `supplier_country` on every product. But a product's
country depends on its *supplier*, not on the product — the same value is
repeated for every product a supplier makes. That redundancy is a **third
normal form (3NF) violation**: a non-key column depending on another non-key
column (a transitive dependency).

## Your SQL task
Edit **`supabase/migrations/0004_week4_normalization.sql`**:
1. Add a `country` column to `suppliers`.
2. Backfill it from the existing `products.supplier_country` data (no data lost).
3. Drop the redundant `supplier_country` column from `products`.

Country now lives in exactly one place. Each product still reaches its country
through its supplier.

## Done when
- `assignments/week4/test.ts` passes (the column is gone from products, every
  supplier with products has a country, no data was lost).
- The **Suppliers** panel on the homepage shows each supplier's country.

---

**If it fails:** Do not merge a broken PR. Close it and start a fresh branch from `main` (production only updates on merge). Rebuild a dirtied database with `npm run db:reset`, or start this week over with `npm run reset:week -- <folder>`. See "Recovering from a failed assignment" in the README.
