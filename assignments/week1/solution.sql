-- Week 1 — Products. A storefront needs something to sell.

drop table if exists products cascade;

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price numeric(10, 2) not null check (price >= 0),
  stock_count integer not null default 0 check (stock_count >= 0),
  created_at timestamptz not null default now()
);

insert into products (name, description, price, stock_count) values
  ('Trail Daypack 22L', 'Lightweight pack for day hikes and commutes.', 79.99, 24),
  ('Insulated Water Bottle', 'Keeps drinks cold for 24 hours.', 24.50, 120),
  ('Merino Wool Socks', 'Breathable, odor-resistant hiking socks.', 18.00, 200),
  ('Trail Headlamp 300lm', 'Rechargeable headlamp for low-light trails.', 39.95, 60),
  ('Packable Rain Jacket', 'Waterproof shell that folds into its own pocket.', 89.00, 45);
