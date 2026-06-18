-- Review 1 — Weeks 1-5 (design & DDL)
-- Write ONE query: list each product with its supplier name and the supplier's
-- country, ordered by product name. Columns must be named: product, supplier,
-- country.

select p.name as product, s.name as supplier, s.country
from products p
join suppliers s on s.id = p.supplier_id
order by p.name;
