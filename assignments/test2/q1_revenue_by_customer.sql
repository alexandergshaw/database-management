-- Test 2 — Q1: total spend per customer who has placed an order.
-- Highest spender first. Columns: customer, spend.

select c.full_name as customer, sum(oi.quantity * oi.unit_price)::numeric(12, 2) as spend
from customers c
join orders o on o.customer_id = c.id
join order_items oi on oi.order_id = o.id
group by c.full_name
order by spend desc;
