-- Review 2 — best-selling products by units sold (weeks 8-10).

create or replace view review2_top_sellers as
select p.name as product, sum(oi.quantity)::int as units_sold
from products p
join order_items oi on oi.product_id = p.id
group by p.name
order by units_sold desc, product;
