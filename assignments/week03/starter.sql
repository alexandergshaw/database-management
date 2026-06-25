-- Week 3 — Missions (many-to-many with planets) + a business rule.

drop table if exists mission_targets cascade;
drop table if exists missions cascade;

-- Problem 1 — create the missions table with a CHECK that launch_year > 1950:
--   id uuid pk default gen_random_uuid(), name text not null unique,
--   agency text not null, launch_year integer not null check (launch_year > 1950),
--   created_at timestamptz not null default now()
-- TODO:


-- Problem 2 — create the mission_targets junction table:
--   mission_id uuid references missions(id) on delete cascade,
--   planet_id  uuid references planets(id) on delete cascade,
--   primary key (mission_id, planet_id)
-- TODO:


-- Problem 3 — insert a few missions (name, agency, launch_year).
-- TODO:


-- Problem 4 — link missions to the planets they visited. At least one mission
-- should visit TWO or more planets (that's the many-to-many).
-- TODO:
