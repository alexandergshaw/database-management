-- Review 2 — Weeks 8-10 (querying)
-- Write ONE query: the best-selling products by total units sold, highest
-- first. Only include products that have actually sold. Columns: product,
-- units_sold.

select p.name as product, sum(oi.quantity)::int as units_sold
from products p
join order_items oi on oi.product_id = p.id
group by p.name
order by units_sold desc, product;
