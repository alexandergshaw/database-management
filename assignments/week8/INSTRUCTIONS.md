# Week 8 — SQL Fundamentals: SELECT, INSERT, UPDATE, DELETE

Record sales by creating order tables and exercising all four write operations
on them. (You only touch your own new tables — products are left alone.)

## Your SQL task
Run `assignments/week8/solution.sql`. It creates `orders` and `order_items`,
then: **INSERT**s a couple of orders with line items, **UPDATE**s their status,
and **DELETE**s a cancelled one. (Tip: a CTE with `returning` inserts an order
and its items together.)

## Done when
- A recent-orders / order-history feature appears once Week 10's view is built.
- The Week 8 planet is **Unlocked**.

---

**Retry anytime:** re-run the script — it drops its own objects first. Clear by
hand with `drop table if exists order_items, orders cascade;`.
