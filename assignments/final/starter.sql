-- Final Exam — cumulative. Create five views drawing on the whole course.

-- Problem 1 — Create a view named "final_planet_overview" with columns
--    planet, type, moons, missions, observations
-- For each planet, count its moons, the missions that visited it, and its
-- observations. LEFT JOIN planets to moons, mission_targets, and observations,
-- and use count(distinct ...) for each so the joins don't over-count.
-- TODO:


-- Problem 2 — Create a view named "final_normalized_stars" with columns
--    body, star, star_class
-- by JOINing nf_bodies to nf_stars. Order by body.
-- TODO:


-- Problem 3 — Create a view named "final_observations_by_type" with columns
--    type, observations (count), avg_magnitude (average magnitude, rounded to 2)
-- Hint: LEFT JOIN planets to observations, GROUP BY type.
-- TODO:


-- Problem 4 — Create a view named "final_telescope_usage" with columns
--    telescope, available_nights, nights_booked (total booked, 0 if none)
-- Hint: LEFT JOIN telescopes to telescope_bookings; coalesce(sum(...), 0).
-- TODO:


-- Problem 5 — Create a view named "final_public_catalog_summary" with columns
--    type, planets (count), avg_radius_km (rounded average radius)
-- read from your public_catalog view, most planets first.
-- TODO:
