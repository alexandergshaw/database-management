-- Test 2 — assessed views over the order data (weeks 8-10).

-- Joins + aggregation.
create or replace view test2_spend_by_customer as
select cu.full_name as customer, sum(oi.quantity * oi.unit_price)::numeric(12, 2) as spend
from customers cu
join orders o on o.customer_id = cu.id
join order_items oi on oi.order_id = o.id
group by cu.full_name
order by spend desc;

-- Anti-join / filtering.
create or replace view test2_never_ordered as
select p.name
from products p
where not exists (select 1 from order_items oi where oi.product_id = p.id)
order by p.name;

-- Joins + aggregation + sorting: each order's total, biggest first.
create or replace view test2_orders_by_total as
select o.id, sum(oi.quantity * oi.unit_price)::numeric(12, 2) as total
from orders o
join order_items oi on oi.order_id = o.id
group by o.id
order by total desc;
