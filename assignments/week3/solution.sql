-- Week 3 — Categories, a many-to-many relationship resolved with a junction
-- table, plus a business rule enforced by a CHECK constraint.

drop table if exists product_categories cascade;
drop table if exists categories cascade;

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (length(trim(name)) > 0),
  created_at timestamptz not null default now()
);

create table product_categories (
  product_id uuid not null references products(id) on delete cascade,
  category_id uuid not null references categories(id) on delete cascade,
  primary key (product_id, category_id)
);

insert into categories (name) values
  ('Hiking'), ('Hydration'), ('Apparel'), ('Lighting'), ('Rain');

insert into product_categories (product_id, category_id)
select p.id, c.id
from products p
join (values
  ('Trail Daypack 22L', 'Hiking'),
  ('Insulated Water Bottle', 'Hydration'),
  ('Insulated Water Bottle', 'Hiking'),
  ('Merino Wool Socks', 'Apparel'),
  ('Merino Wool Socks', 'Hiking'),
  ('Trail Headlamp 300lm', 'Lighting'),
  ('Trail Headlamp 300lm', 'Hiking'),
  ('Packable Rain Jacket', 'Rain'),
  ('Packable Rain Jacket', 'Apparel')
) as link(product_name, category_name) on link.product_name = p.name
join categories c on c.name = link.category_name;
