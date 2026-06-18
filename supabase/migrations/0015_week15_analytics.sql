-- Week 15 — Enterprise Applications, Analytics & Performance
-- Goal: support analytical queries and keep them fast.
--   * Indexes on the foreign keys the order joins use most.
--   * An analytics view summarizing revenue per category — the homepage renders
--     it as a bar chart.

create index if not exists idx_order_items_product on order_items (product_id);
create index if not exists idx_orders_customer on orders (customer_id);

create or replace view category_revenue as
select
  c.name as category,
  coalesce(sum(oi.quantity * oi.unit_price), 0)::numeric(12, 2) as revenue
from categories c
left join product_categories pc on pc.category_id = c.id
left join order_items oi on oi.product_id = pc.product_id
group by c.name
order by revenue desc, category;
