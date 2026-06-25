-- Test 3 — assessed views across weeks 10-12. Create four views.

-- Problem 1 — Create a view named "test3_obs_by_astronomer" with columns
--    astronomer, observations (their count), most first.
-- Hint: JOIN astronomers to observations, GROUP BY the astronomer, count.
-- TODO:


-- Problem 2 — Create a view named "test3_bookings_by_telescope" with columns
--    telescope, nights_booked (total nights booked, 0 if none), most first.
-- Hint: LEFT JOIN telescopes to telescope_bookings; use coalesce(sum(...), 0).
-- TODO:


-- Problem 3 — Create a view named "test3_public_by_type" with columns
--    type, planets (count), read from your public_catalog view.
-- TODO:


-- Problem 4 — Create a view named "test3_max_radius_by_type" with columns
--    type, max_radius_km (the largest radius among planets of that type), biggest
--    first.
-- TODO:
