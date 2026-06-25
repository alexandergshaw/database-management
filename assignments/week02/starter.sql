-- Week 2 — Data Modeling & ERDs.

drop table if exists mission_targets cascade;
drop table if exists missions cascade;
drop table if exists moons cascade;

-- Problem 1 — create the moons table (one-to-many to planets):
--   id uuid pk default gen_random_uuid(),
--   planet_id uuid not null references planets(id) on delete cascade,
--   name text not null, radius_km numeric(10,1) not null check (radius_km > 0),
--   created_at timestamptz not null default now()
-- TODO:


-- Problem 2 — insert several moons, each tied to a planet (Mercury/Venus none).
-- TODO:


-- Problem 3 — create the missions table with a CHECK that launch_year > 1950,
-- then create the mission_targets junction table:
--   mission_targets(mission_id references missions on delete cascade,
--                   planet_id references planets on delete cascade,
--                   primary key (mission_id, planet_id))
-- TODO:


-- Problem 4 — insert a few missions, then link each to the planets it visited
-- (at least one mission visits two+ planets — that's the many-to-many).
-- TODO:
