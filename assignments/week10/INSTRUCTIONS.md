# Week 10 — Joins & Multi-Table Queries

An order stores IDs, not names. **Join** across tables to make it readable.

## Your SQL task
Open and complete `assignments/week10/starter.sql`. It creates an `order_history` view with
one row per order — customer name, item count, and total — by joining orders,
customers, order_items, and products.

## Done when
- An Order history table appears on the homepage.
- The Week 10 planet is **Unlocked**.

---

**Retry anytime:** re-run the script (`create or replace view`). Remove with
`drop view if exists order_history;`.
