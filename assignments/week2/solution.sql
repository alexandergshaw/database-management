-- Week 2 — Suppliers, related to products with a link (junction) table.
-- We never alter the products table; the relationship lives in its own table.

drop table if exists product_suppliers cascade;
drop table if exists suppliers cascade;

create table suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  country text not null,
  created_at timestamptz not null default now()
);

create table product_suppliers (
  product_id uuid not null references products(id) on delete cascade,
  supplier_id uuid not null references suppliers(id) on delete cascade,
  primary key (product_id, supplier_id)
);

insert into suppliers (name, country) values
  ('Summit Supply Co.', 'USA'),
  ('Riverbend Goods', 'Canada'),
  ('Trailhead Traders', 'New Zealand');

insert into product_suppliers (product_id, supplier_id)
select p.id, s.id
from products p
join (values
  ('Trail Daypack 22L', 'Summit Supply Co.'),
  ('Trail Headlamp 300lm', 'Summit Supply Co.'),
  ('Insulated Water Bottle', 'Riverbend Goods'),
  ('Packable Rain Jacket', 'Riverbend Goods'),
  ('Merino Wool Socks', 'Trailhead Traders')
) as link(product_name, supplier_name) on link.product_name = p.name
join suppliers s on s.name = link.supplier_name;
