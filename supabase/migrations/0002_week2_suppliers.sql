-- Week 2 — Data Modeling: Suppliers (a new entity + a relationship)
-- Goal: model a second entity and relate products to it (one supplier makes
-- many products — a one-to-many relationship via a foreign key).
--
-- Note the deliberately naive `supplier_country` column on products: every
-- product carries its supplier's country. We'll see why that's a problem and
-- fix it in Week 4 (Normalization).

create table if not exists suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

alter table products
  add column if not exists supplier_id uuid references suppliers(id) on delete set null;

alter table products
  add column if not exists supplier_country text;

insert into suppliers (name) values
  ('Summit Supply Co.'),
  ('Riverbend Goods'),
  ('Trailhead Traders');

update products set
  supplier_id = (select id from suppliers where name = 'Summit Supply Co.'),
  supplier_country = 'USA'
where name in ('Trail Daypack 22L', 'Trail Headlamp 300lm');

update products set
  supplier_id = (select id from suppliers where name = 'Riverbend Goods'),
  supplier_country = 'Canada'
where name in ('Insulated Water Bottle', 'Packable Rain Jacket');

update products set
  supplier_id = (select id from suppliers where name = 'Trailhead Traders'),
  supplier_country = 'New Zealand'
where name = 'Merino Wool Socks';
