-- Week 1 — Relational Foundations & Keys.
-- Fill in each TODO, then run the whole file. It clears its tables first so you
-- can run it again any time.

drop table if exists astronomer_sites cascade;
drop table if exists astronomers cascade;
drop table if exists planets cascade;

-- Problem 1 — Create a table named "planets" with these columns:
--    id           a unique auto-generated id (the primary key)
--    name         the planet's name  (text, required, and UNIQUE — no duplicates)
--    type         e.g. 'terrestrial', 'gas giant'  (text, required)
--    radius_km    radius in kilometres  (number; required; must be greater than 0)
--    distance_au  distance from the Sun in AU  (number; required; must be > 0)
--    mass_e24     mass in 10^24 kg  (number, required)
--    mean_temp_c  average temperature in °C  (whole number, required)
--    created_at   when the row was added  (timestamp, defaults to now)
-- TODO: write the CREATE TABLE statement.


-- Problem 2 — Insert at least 6 real planets (e.g. Mercury, Venus, Earth, Mars,
-- Jupiter, Saturn). Fill in a reasonable value for each column.
-- TODO: write the INSERT statement(s).


-- Problem 3 — Create a table named "astronomers" with:
--    id          unique auto-generated id (primary key)
--    email       their email  (text, required, UNIQUE)
--    full_name   their name   (text, required)
--    created_at  timestamp, defaults to now
-- Then insert at least 4 astronomers.
-- TODO:


-- Problem 4 — Create a table named "astronomer_sites" that links a site to an
-- astronomer. Columns:
--    id             unique auto-generated id (primary key)
--    astronomer_id  which astronomer  (a FOREIGN KEY pointing at astronomers.id;
--                                       use "on delete cascade")
--    site_name      name of the observing site  (text, required)
--    country        country  (text, required)
-- Then insert one site for one of your astronomers.
-- TODO:
