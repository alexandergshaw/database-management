-- Week 2 — Data Modeling & ERDs.
-- Fill in each TODO, then run the whole file (it clears its tables first).

drop table if exists mission_targets cascade;
drop table if exists missions cascade;
drop table if exists moons cascade;

-- Problem 1 — Create a table named "moons" (the "many" side of one-to-many).
-- Columns:
--    id         unique auto-generated id (primary key)
--    planet_id  which planet it orbits  (FOREIGN KEY to planets.id, on delete cascade)
--    name       the moon's name  (text, required)
--    radius_km  radius in km  (number, required, must be > 0)
--    created_at timestamp, defaults to now
-- TODO:


-- Problem 2 — Insert several moons, each tied to a planet by name.
-- (Earth has the Moon; Mars has Phobos and Deimos; Jupiter and Saturn have
-- several; Mercury and Venus have none — that's fine.)
-- TODO:


-- Problem 3 — Create two tables for the many-to-many between missions and planets:
--   "missions": id (primary key), name (text, required, UNIQUE), agency (text,
--               required), launch_year (whole number, required, with a CHECK that
--               it's after 1950), created_at (timestamp, default now).
--   "mission_targets" (the junction table): mission_id and planet_id, each a
--               FOREIGN KEY (on delete cascade), and together the PRIMARY KEY.
-- TODO:


-- Problem 4 — Insert a few missions, then add rows to mission_targets linking
-- each mission to the planet(s) it visited. Make at least one mission visit two
-- or more planets (that's what "many-to-many" means).
-- TODO:
