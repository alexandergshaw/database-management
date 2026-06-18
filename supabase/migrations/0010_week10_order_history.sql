-- Week 10 — Joins & Multi-Table Queries
-- Goal: combine orders, customers, and products into one readable result by
-- joining across tables and aggregating the line items. The homepage renders
-- this view as the order-history table.

create or replace view order_history as
select
  o.id,
  o.status,
  o.created_at,
  c.full_name as customer,
  c.email as customer_email,
  sum(oi.quantity)::int as item_count,
  sum(oi.quantity * oi.unit_price)::numeric(12, 2) as total
from orders o
join customers c on c.id = o.customer_id
join order_items oi on oi.order_id = o.id
group by o.id, o.status, o.created_at, c.full_name, c.email
order by o.created_at desc;
