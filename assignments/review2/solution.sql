-- Review 2 — consolidates weeks 8-10 as views.

-- Joins + aggregation (weeks 8, 10): best-selling products.
create or replace view review2_top_sellers as
select p.name as product, sum(oi.quantity)::int as units_sold
from products p
join order_items oi on oi.product_id = p.id
group by p.name
order by units_sold desc, product;

-- Filtering + sorting (week 9).
create or replace view review2_affordable_products as
select name, price
from products
where price < 50
order by price;

-- Aggregation grouped by a column (weeks 8-9): revenue per order status.
create or replace view review2_revenue_by_status as
select o.status, sum(oi.quantity * oi.unit_price)::numeric(12, 2) as revenue
from orders o
join order_items oi on oi.order_id = o.id
group by o.status
order by revenue desc;
