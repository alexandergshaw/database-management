-- Week 0 — Store settings.
-- Fill in each TODO, then run the whole script in the Supabase SQL editor.
-- Re-running is always safe: it drops the table first.

drop table if exists store_settings cascade;

-- Problem 1 — create the store_settings table with these columns:
--   id          uuid, primary key, default gen_random_uuid()
--   store_name  text, not null
--   tagline     text, not null
--   created_at  timestamptz, not null, default now()
-- TODO: write the CREATE TABLE statement.


-- Problem 2 — insert ONE row with your own store name and tagline.
-- TODO: write the INSERT statement.
