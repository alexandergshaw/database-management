# Week 10 — Joins & Multi-Table Queries

An order stores IDs, not names. **Join** across tables to make it readable, and
use a **LEFT JOIN** to keep rows that have no match.

## Problems (in `assignments/week10/starter.sql`)
1. **Inner joins** — an `order_history` view joining orders, customers, and
   order_items into one row per order (customer name, item count, total).
2. **LEFT JOIN** — a `customer_order_counts` view that includes customers with
   zero orders.

## Done when
- An Order history table appears on the homepage.
- The Week 10 planet is **Unlocked**.

---

**Retry anytime:** re-run the script (`create or replace view`). Remove with
`drop view if exists order_history, customer_order_counts;`.
