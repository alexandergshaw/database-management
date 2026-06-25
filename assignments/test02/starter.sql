-- Test 2 — assessed views across weeks 5-7. Create three views.

-- Problem 1 — Create a view named "test2_star_body_counts" with columns
--    star, bodies (how many bodies orbit that star, 0 included)
-- Hint: LEFT JOIN nf_stars to nf_bodies, then GROUP BY the star and count.
-- TODO:


-- Problem 2 — Create a view named "test2_never_observed" with one column:
--    name — every planet that has NO observations
-- Hint: use "where not exists (...)" — see the worked example in INSTRUCTIONS.md.
-- TODO:


-- Problem 3 — Create a view named "test2_cold_planets" with columns
--    name, mean_temp_c
-- containing only planets below 0 °C, coldest first.
-- TODO:
