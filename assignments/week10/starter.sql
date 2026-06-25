-- Week 10 — Joins: one readable row per order.

-- Problem 1 — create a view named order_history with columns:
--   id, status, created_at, customer (the customer's full_name),
--   item_count (sum of quantities), total (sum of quantity * unit_price).
-- Join orders -> customers and orders -> order_items, group by the order, and
-- order by created_at (newest first).
-- TODO: use `create or replace view order_history as select ...`
