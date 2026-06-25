# Week 4 — Normalization (1NF → 3NF)

You'll normalize a messy import table into clean tables — all created this week,
so you can drop and retry freely.

## Concepts
- A **transitive dependency** (a non-key column depending on another non-key
  column) violates 3NF and duplicates data.
- Fix it by splitting the repeated data into its own table referenced by a
  foreign key.

## Your SQL task
Run `assignments/week4/solution.sql`. It creates a denormalized `catalog_import`
(where `brand_country` repeats for every product of a brand), then splits it into
`nf_brands` (country once per brand) and `nf_catalog` (referencing the brand).

## Done when
- The Normalization panel on the homepage shows the import normalized into
  brands.
- The Week 4 planet is **Unlocked**.

---

**Retry anytime:** re-run the script — it drops its own objects first. Clear one
object by hand with `drop table if exists <name> cascade;`.
