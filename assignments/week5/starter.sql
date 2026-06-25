-- Week 5 — Astronomers and sites: keys, constraints, referential integrity.

drop table if exists astronomer_sites cascade;
drop table if exists astronomers cascade;

-- Problem 1 — create the astronomers table:
--   id uuid pk default gen_random_uuid(),
--   email text not null UNIQUE, full_name text not null,
--   created_at timestamptz not null default now()
-- TODO:


-- Problem 2 — create astronomer_sites with a foreign key to astronomers:
--   id uuid pk default gen_random_uuid(),
--   astronomer_id uuid not null references astronomers(id) on delete cascade,
--   site_name text not null, country text not null
-- TODO:


-- Problem 3 — insert at least 4 astronomers (email, full_name).
-- TODO:


-- Problem 4 — insert one site for one of your astronomers.
-- TODO:
