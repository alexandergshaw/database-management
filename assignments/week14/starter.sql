-- Week 14 — Security: protect private data, publish only what's safe.

drop table if exists customer_pii cascade;

-- Problem 1 — create a private table and add a row:
--   customer_pii(id uuid pk default gen_random_uuid(),
--                email text not null, tax_id text not null)
-- TODO:


-- Problem 2 — turn on row-level security for customer_pii, then add a SELECT
-- policy that allows only the service_role to read it.
--   alter table customer_pii enable row level security;
--   create policy ... on customer_pii for select to service_role using (true);
-- TODO:


-- Problem 3 — create a view named public_catalog exposing only safe product
-- columns (id, name, description, price), and grant select on it to anon.
-- TODO:
