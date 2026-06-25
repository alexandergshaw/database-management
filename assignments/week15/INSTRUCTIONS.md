# Week 15 — Enterprise Applications, Analytics & Performance

Make analytical queries possible and fast.

## Concepts
- An **analytics view** aggregates across the whole schema.
- A **materialized view** stores the result, and an **index** on it speeds reads
  — both new objects you own.

## Your SQL task
Open and complete `assignments/week15/starter.sql`. It creates a `category_revenue` view
(revenue per category), a `mv_category_revenue` materialized view, and an index
on it.

## Done when
- A Revenue by category chart appears on the homepage.
- The Week 15 planet is **Unlocked**.

---

**Retry anytime:** re-run the script (`create or replace` / drop-if-exists).
Remove with `drop materialized view if exists mv_category_revenue; drop view if exists category_revenue;`.
