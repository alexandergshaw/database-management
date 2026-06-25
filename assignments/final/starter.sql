-- Final Exam — cumulative. Create five views drawing on the whole course.

-- Problem 1 (relational, 1:M, M:N, CRUD, joins) — final_planet_overview: one row
-- per planet with planet, type, moons (count), missions (count), observations
-- (count). LEFT JOIN planets to moons, mission_targets, and observations; use
-- count(distinct ...) so the joins don't multiply the counts.
-- TODO:


-- Problem 2 (normalization) — final_normalized_stars: body, star, star_class.
-- Join nf_bodies -> nf_stars.
-- TODO:


-- Problem 3 (CRUD, aggregation, joins) — final_observations_by_type: type,
-- observations (count), avg_magnitude (rounded to 2). LEFT JOIN planets ->
-- observations, grouped by type.
-- TODO:


-- Problem 4 (transactions) — final_telescope_usage: telescope, available_nights,
-- nights_booked (sum). LEFT JOIN telescopes -> telescope_bookings.
-- TODO:


-- Problem 5 (security, analytics) — final_public_catalog_summary: type, planets
-- (count), avg_radius_km from your public_catalog view, most planets first.
-- TODO:
