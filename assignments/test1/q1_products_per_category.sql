-- Test 1 — Q1: how many products are in each category?
-- Include categories with zero products. Columns: category, products.

select c.name as category, count(pc.product_id)::int as products
from categories c
left join product_categories pc on pc.category_id = c.id
group by c.name
order by category;
