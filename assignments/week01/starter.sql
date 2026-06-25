-- Week 1 — Planets. Fill in each TODO, then run the script in Supabase.

drop table if exists planets cascade;

-- Problem 1 — create the planets table:
--   id           uuid, primary key, default gen_random_uuid()
--   name         text, not null, unique
--   type         text, not null            (e.g. 'terrestrial', 'gas giant')
--   radius_km    numeric(10,1), not null, CHECK (radius_km > 0)
--   distance_au  numeric(8,3), not null, CHECK (distance_au > 0)
--   mass_e24     numeric(10,3), not null   (mass in 10^24 kg)
--   mean_temp_c  integer, not null
--   created_at   timestamptz, not null, default now()
-- TODO:


-- Problem 2 — insert at least 6 planets.
-- TODO:


-- Problem 3 — write a SELECT listing every planet ordered by distance_au.
-- (Just to check your work; it changes nothing.)
-- TODO:
