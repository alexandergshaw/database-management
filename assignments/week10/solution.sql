-- Week 10 — Joins & multi-table queries.

-- Inner joins across four tables: one readable row per order.
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

-- A LEFT JOIN keeps customers who have never ordered (count 0).
create or replace view customer_order_counts as
select c.full_name as customer, count(o.id)::int as orders
from customers c
left join orders o on o.customer_id = c.id
group by c.full_name
order by orders desc, customer;
