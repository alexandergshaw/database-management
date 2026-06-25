-- Week 5 — Customers and addresses: keys, constraints, referential integrity.

drop table if exists customer_addresses cascade;
drop table if exists customers cascade;

-- Problem 1 — create the customers table:
--   id uuid pk default gen_random_uuid(),
--   email text not null UNIQUE, full_name text not null,
--   created_at timestamptz not null default now()
-- TODO:


-- Problem 2 — create customer_addresses with a foreign key to customers:
--   id uuid pk default gen_random_uuid(),
--   customer_id uuid not null references customers(id) on delete cascade,
--   line1 text not null, city text not null, country text not null
-- TODO:


-- Problem 3 — insert at least 4 customers (email, full_name).
-- TODO:


-- Problem 4 — insert one address for one of your customers.
-- TODO:
