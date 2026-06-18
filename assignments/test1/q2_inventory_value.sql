-- Test 1 — Q2: what is the total value of inventory on hand?
-- Multiply each product's price by its stock and sum it. Column: inventory_value.

select sum(price * stock_count)::numeric(12, 2) as inventory_value
from products;
