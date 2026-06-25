-- Review 1 — consolidates weeks 1-5 as a set of views.

-- Relationships / joins (weeks 1-2).
create or replace view review1_supplier_catalog as
select p.name as product, s.name as supplier, s.country
from products p
join product_suppliers ps on ps.product_id = p.id
join suppliers s on s.id = ps.supplier_id
order by p.name;

-- Many-to-many (week 3): how many categories each product is in.
create or replace view review1_category_counts as
select p.name as product, count(pc.category_id)::int as categories
from products p
left join product_categories pc on pc.product_id = p.id
group by p.name
order by p.name;

-- Normalization (week 4): the 3NF tables joined back together.
create or replace view review1_brand_normalized as
select nc.product, b.name as brand, b.country
from nf_catalog nc
join nf_brands b on b.id = nc.brand_id
order by nc.product;

-- Keys / referential integrity (week 5): customers and their address counts.
create or replace view review1_customer_directory as
select c.full_name, c.email, count(a.id)::int as addresses
from customers c
left join customer_addresses a on a.customer_id = c.id
group by c.full_name, c.email
order by c.full_name;
