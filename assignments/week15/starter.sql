-- Week 15 — Analytics & performance.

-- Problem 1 — create a view named category_revenue with columns category and
-- revenue (sum of quantity * unit_price for that category's products), highest
-- first. Use LEFT JOINs so categories with no sales still appear with 0.
--   categories -> product_categories -> order_items
-- TODO:


-- Problem 2 — create a materialized view of it and index it (your own objects):
--   create materialized view mv_category_revenue as select * from category_revenue;
--   create index idx_mv_category_revenue on mv_category_revenue (category);
-- TODO:
