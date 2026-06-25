-- Week 5 — Customers and their addresses: primary keys, UNIQUE, NOT NULL, and a
-- foreign key enforcing referential integrity between two new tables.

drop table if exists customer_addresses cascade;
drop table if exists customers cascade;

create table customers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text not null,
  created_at timestamptz not null default now()
);

create table customer_addresses (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  line1 text not null,
  city text not null,
  country text not null
);

insert into customers (email, full_name) values
  ('ana.ramirez@example.com', 'Ana Ramirez'),
  ('ben.cole@example.com', 'Ben Cole'),
  ('chiara.rossi@example.com', 'Chiara Rossi'),
  ('deepa.nair@example.com', 'Deepa Nair');

insert into customer_addresses (customer_id, line1, city, country)
select id, '1 Trail Way', 'Boulder', 'USA'
from customers where email = 'ana.ramirez@example.com';
