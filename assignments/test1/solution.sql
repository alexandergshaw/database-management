-- Test 1 — assessed views across weeks 1-5.

-- Many-to-many (week 3).
create or replace view test1_products_per_category as
select c.name as category, count(pc.product_id)::int as products
from categories c
left join product_categories pc on pc.category_id = c.id
group by c.name
order by category;

-- Aggregation + functions (weeks 1, 9-style math on week-1 data).
create or replace view test1_inventory_value as
select sum(price * stock_count)::numeric(12, 2) as inventory_value
from products;

-- Data modeling (week 2): suppliers grouped by country.
create or replace view test1_suppliers_by_country as
select country, count(*)::int as suppliers
from suppliers
group by country
order by country;

-- Normalization (week 4): products per brand from the 3NF tables.
create or replace view test1_brand_product_counts as
select b.name as brand, count(nc.id)::int as products
from nf_brands b
left join nf_catalog nc on nc.brand_id = b.id
group by b.name
order by b.name;
