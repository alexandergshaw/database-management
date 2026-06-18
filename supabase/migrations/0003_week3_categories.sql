-- Week 3 — ERDs & Business Rules: Categories (many-to-many)
-- Goal: a product can belong to many categories, and a category holds many
-- products. That many-to-many relationship is resolved with a junction table
-- (product_categories), exactly as you'd draw it on an ERD.
--
-- Business rules are encoded as constraints so the database enforces them.

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists product_categories (
  product_id uuid not null references products(id) on delete cascade,
  category_id uuid not null references categories(id) on delete cascade,
  primary key (product_id, category_id)
);

-- Business rule: stock counts must be plausible (no fat-finger millions).
alter table products
  add constraint products_stock_reasonable check (stock_count <= 100000);

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
