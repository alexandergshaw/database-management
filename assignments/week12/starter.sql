-- Week 12 — Analytics & performance.

-- Problem 1 — Create a view named "type_summary" with columns
--    type, planets (count of planets of that type), avg_radius_km (their average
--    radius, rounded to a whole number)
-- Order it with the most common type first.
-- TODO:


-- Problem 2 — Make a fast snapshot of that view and index it (these are your own
-- new objects):
--    create materialized view mv_type_summary as select * from type_summary;
--    create index idx_mv_type_summary on mv_type_summary (type);
-- TODO:
