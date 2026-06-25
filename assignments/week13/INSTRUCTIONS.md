# Week 13 — Transactions & Concurrency

Make "place an order" atomic — all steps happen, or none do — on a self-contained
checkout sandbox you create this week.

## Concepts
- A `plpgsql` function body runs as one transaction.
- `SELECT ... FOR UPDATE` locks the row so two checkouts can't oversell the last
  unit; `RAISE EXCEPTION` rolls everything back.

## Your SQL task
Open and complete `assignments/week13/starter.sql`. It creates `tx_inventory`, `tx_orders`,
`tx_order_items`, and a `place_order(sku, qty)` function that locks stock, guards
against overselling, writes the order + line item, and decrements stock —
atomically.

## Done when
- The Week 13 planet is **Unlocked** (the `place_order` function exists).

---

**Retry anytime:** re-run the script — it drops its own objects first. Clear by
hand with `drop table if exists tx_order_items, tx_orders, tx_inventory cascade;`.
