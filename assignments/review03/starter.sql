-- Review 3 — consolidates weeks 10-12. Create four views.

-- Problem 1 — Create a view named "review3_busiest_observers" with columns
--    astronomer, observations (their observation count), busiest first.
-- Hint: read from the "observation_log" view you built in Week 10, GROUP BY the
-- astronomer, and count.
-- TODO:


-- Problem 2 — Create a view named "review3_booking_log" with columns
--    booking_id, telescope, nights, created_at
-- by JOINing telescope_bookings to telescopes (match the booking's code to the
-- telescope). Order by created_at.
-- TODO:


-- Problem 3 — Create a view named "review3_public_listing" with columns
--    name, type
-- read from your public_catalog view, ordered by name.
-- TODO:


-- Problem 4 — Create a view named "review3_type_summary" with columns
--    type, planets (count), avg_radius_km (rounded average radius), most first.
-- TODO:
