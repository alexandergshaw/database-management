-- Test 2 — Q2: which products have never been ordered?
-- Column: name. Order alphabetically.

select p.name
from products p
where not exists (
  select 1 from order_items oi where oi.product_id = p.id
)
order by p.name;
