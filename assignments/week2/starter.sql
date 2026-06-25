-- Week 2 — Moons, related to planets one-to-many with a foreign key.
-- We only create a NEW table; we never change the planets table.

drop table if exists moons cascade;

-- Problem 1 — create the moons table:
--   id uuid pk default gen_random_uuid(),
--   planet_id uuid not null references planets(id) on delete cascade,
--   name text not null,
--   radius_km numeric(10,1) not null check (radius_km > 0),
--   created_at timestamptz not null default now()
-- TODO:


-- Problem 2 — insert several moons, each tied to a planet.
--   Tip: insert ... select p.id, ... from planets p join (values ...) on name.
--   (Mercury and Venus have none — that's fine.)
-- TODO:
