-- Review 1 — consolidates weeks 1-2. Create three views.
-- A view looks like:  create or replace view NAME as SELECT ... ;
-- See INSTRUCTIONS.md for a worked example.

-- Problem 1 — Create a view named "review1_planet_moons" with two columns:
--    planet  — the planet's name
--    moons   — how many moons it has (0 if none)
-- Hint: LEFT JOIN planets to moons, then GROUP BY the planet and count.
-- TODO:


-- Problem 2 — Create a view named "review1_planet_missions" with:
--    planet   — the planet's name
--    missions — how many missions visited it (0 if none)
-- Hint: LEFT JOIN planets to the mission_targets junction table, then count.
-- TODO:


-- Problem 3 — Create a view named "review1_astronomer_directory" with:
--    full_name, email, and sites (how many sites each astronomer has, 0 if none)
-- Hint: LEFT JOIN astronomers to astronomer_sites, then count.
-- TODO:
