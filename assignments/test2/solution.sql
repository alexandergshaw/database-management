-- Test 2 — assessed views over the order data.

create or replace view test2_spend_by_customer as
select cu.full_name as customer, sum(oi.quantity * oi.unit_price)::numeric(12, 2) as spend
from customers cu
join orders o on o.customer_id = cu.id
join order_items oi on oi.order_id = o.id
group by cu.full_name
order by spend desc;

create or replace view test2_never_ordered as
select p.name
from products p
where not exists (select 1 from order_items oi where oi.product_id = p.id)
order by p.name;
