-- Week 9 — Aggregations as a view the homepage reads.

-- Problem 1 — create a view named store_stats with these columns (each a single
-- aggregate sub-select):
--   product_count   = number of products
--   order_count     = number of orders
--   customer_count  = number of customers
--   revenue         = sum of quantity * unit_price across order_items
--   avg_price       = average product price, rounded to 2 decimals
-- TODO: use `create or replace view store_stats as select ...`
