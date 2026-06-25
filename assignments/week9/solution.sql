-- Week 9 — Filtering, sorting, functions, and aggregations as views.

-- Aggregations + functions (count/sum/avg/round).
create or replace view store_stats as
select
  (select count(*) from products)::int as product_count,
  (select count(*) from orders)::int as order_count,
  (select count(*) from customers)::int as customer_count,
  (select coalesce(sum(quantity * unit_price), 0) from order_items)::numeric(12, 2) as revenue,
  (select coalesce(round(avg(price), 2), 0) from products)::numeric(12, 2) as avg_price;

-- Filtering (WHERE) + sorting (ORDER BY).
create or replace view affordable_products as
select name, price, stock_count
from products
where price < 50
order by price;
