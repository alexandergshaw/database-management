-- Test 1 — assessed views over the design from weeks 1-5.

create or replace view test1_products_per_category as
select c.name as category, count(pc.product_id)::int as products
from categories c
left join product_categories pc on pc.category_id = c.id
group by c.name
order by category;

create or replace view test1_inventory_value as
select sum(price * stock_count)::numeric(12, 2) as inventory_value
from products;
