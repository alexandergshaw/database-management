-- Week 10 — Joins & multi-table queries. Create two views.

-- Problem 1 — Create a view named "observation_log" with columns
--    id, observed_at, status, astronomer, planet, magnitude
-- by JOINing observations to astronomers (for the astronomer's full_name) and to
-- planets (for the planet's name). Show newest first.
-- TODO:


-- Problem 2 — Create a view named "planet_observation_counts" with columns
--    planet, observations (how many times it's been observed, 0 included)
-- Hint: LEFT JOIN planets to observations, then GROUP BY the planet and count.
-- TODO:
