-- Week 5 — Keys, Constraints & Referential Integrity: Customers
-- Goal: add the customers entity with the keys and constraints that keep data
-- trustworthy:
--   * a primary key uniquely identifies each customer
--   * email is UNIQUE (no two accounts share an address)
--   * NOT NULL ensures required fields are always present
-- Later weeks' orders will reference customers, so this is the anchor for
-- referential integrity.

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text not null,
  created_at timestamptz not null default now()
);

insert into customers (email, full_name) values
  ('ana.ramirez@example.com', 'Ana Ramirez'),
  ('ben.cole@example.com', 'Ben Cole'),
  ('chiara.rossi@example.com', 'Chiara Rossi'),
  ('deepa.nair@example.com', 'Deepa Nair');
