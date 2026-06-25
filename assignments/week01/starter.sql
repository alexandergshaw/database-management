-- Week 1 — Relational Foundations & Keys.

drop table if exists astronomer_sites cascade;
drop table if exists astronomers cascade;
drop table if exists planets cascade;

-- Problem 1 — create the planets table:
--   id uuid pk default gen_random_uuid(), name text not null UNIQUE,
--   type text not null, radius_km numeric(10,1) not null CHECK (radius_km > 0),
--   distance_au numeric(8,3) not null CHECK (distance_au > 0),
--   mass_e24 numeric(10,3) not null, mean_temp_c integer not null,
--   created_at timestamptz not null default now()
-- TODO:


-- Problem 2 — insert at least 6 planets.
-- TODO:


-- Problem 3 — create the astronomers table (id pk, email text not null UNIQUE,
-- full_name text not null, created_at) and insert at least 4 astronomers.
-- TODO:


-- Problem 4 — create astronomer_sites with a FOREIGN KEY to astronomers
--   (id pk, astronomer_id uuid not null references astronomers(id) on delete
--    cascade, site_name text not null, country text not null), and insert one
--   site for one astronomer.
-- TODO:
