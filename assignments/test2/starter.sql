-- Test 2 — two assessed views over your order data.

-- Problem 1 — create view test2_spend_by_customer with columns
-- customer (full_name) and spend (sum of quantity * unit_price), highest first.
-- Join customers -> orders -> order_items.
-- TODO:


-- Problem 2 — create view test2_never_ordered listing the name of every product
-- that has no order_items. Hint: `where not exists (select 1 from order_items ...)`.
-- TODO:
