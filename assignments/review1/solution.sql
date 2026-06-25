-- Review 1 — a view joining products to their suppliers (weeks 1-2).

create or replace view review1_supplier_catalog as
select p.name as product, s.name as supplier, s.country
from products p
join product_suppliers ps on ps.product_id = p.id
join suppliers s on s.id = ps.supplier_id
order by p.name;
