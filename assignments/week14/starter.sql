-- Week 14 — Security: protect private data, publish only what's safe.

drop table if exists proposal_secrets cascade;

-- Problem 1 — create a private table and add a row:
--   proposal_secrets(id uuid pk default gen_random_uuid(),
--     pi_email text not null, budget_usd numeric(12,2) not null)
-- TODO:


-- Problem 2 — enable row-level security on proposal_secrets, then add a SELECT
-- policy that allows only the service_role to read it.
--   alter table proposal_secrets enable row level security;
--   create policy ... on proposal_secrets for select to service_role using (true);
-- TODO:


-- Problem 3 — create a view named public_catalog exposing only safe planet
-- columns (name, type, radius_km, distance_au), and grant select on it to anon.
-- TODO:
