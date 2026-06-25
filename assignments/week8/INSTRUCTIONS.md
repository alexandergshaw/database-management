# Week 8 — SQL Fundamentals: SELECT, INSERT, UPDATE, DELETE

Record sales by creating order tables and exercising all four DML verbs on them.
(You only touch your own new tables — products are left alone.)

## Problems (in `assignments/week8/starter.sql`)
1. Create the `orders` table.
2. Create the `order_items` table (composite key, `CHECK` on quantity/price).
3. **INSERT** a couple of orders with line items.
4. **UPDATE** an order's status, then **DELETE** a cancelled one.
5. **SELECT** the remaining orders to read back your work.

## Done when
- An order-history feature appears once Week 10's view is built.
- The Week 8 planet is **Unlocked**.

---

**Retry anytime:** re-run the script — it drops its own objects first. Clear by
hand with `drop table if exists order_items, orders cascade;`.
