-- Week 15 — Analytics & performance: a revenue-by-category view, plus a
-- materialized view + index (your own objects) for fast repeated reads.

create or replace view category_revenue as
select
  c.name as category,
  coalesce(sum(oi.quantity * oi.unit_price), 0)::numeric(12, 2) as revenue
from categories c
left join product_categories pc on pc.category_id = c.id
left join order_items oi on oi.product_id = pc.product_id
group by c.name
order by revenue desc, category;

drop materialized view if exists mv_category_revenue;
create materialized view mv_category_revenue as select * from category_revenue;
create index if not exists idx_mv_category_revenue on mv_category_revenue (category);
