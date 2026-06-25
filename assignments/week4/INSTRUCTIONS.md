# Week 4 — Database Design Principles & Normalization (1NF, 2NF, 3NF)

Normalize three messy tables — one per normal form — all created this week, so
you can drop and retry freely.

## Concepts
- **1NF** — every column holds a single atomic value (no comma-separated lists).
- **2NF** — no non-key column depends on only *part* of a composite key.
- **3NF** — no non-key column depends on another non-key column (transitive).

## Problems (in `assignments/week4/starter.sql`)
1. **1NF** — split a comma-separated `tags` column into one row per tag.
2. **2NF** — pull an item name that depends only on `sku` out of an
   `(order_no, sku)` table into its own table.
3. **3NF** — move a brand's country (which repeats for every product of a brand)
   into its own `nf_brands` table referenced by `nf_catalog`.

## Done when
- The Normalization panel on the homepage shows the import normalized into brands.
- The Week 4 planet is **Unlocked**.

---

**Retry anytime:** re-run the script — it drops its own objects first. Clear one
object by hand with `drop table if exists <name> cascade;`.
