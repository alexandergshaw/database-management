# Week 9 — Filtering, Sorting, Functions, Aggregations

Turn rows into numbers with aggregate functions, packaged as a view.

## Your SQL task
Open and complete `assignments/week9/starter.sql`. It creates a `store_stats` view exposing
`product_count`, `order_count`, `customer_count`, `revenue` (sum of
`quantity * unit_price`), and `avg_price`.

## Done when
- A stats bar appears at the top of the homepage.
- The Week 9 planet is **Unlocked**.

---

**Retry anytime:** re-run the script (`create or replace view`). Remove with
`drop view if exists store_stats;`.
