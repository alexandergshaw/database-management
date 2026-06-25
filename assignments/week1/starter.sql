-- Week 1 — Products. Fill in each TODO, then run the script in Supabase.

drop table if exists products cascade;

-- Problem 1 — create the products table:
--   id           uuid, primary key, default gen_random_uuid()
--   name         text, not null
--   description  text, not null
--   price        numeric(10,2), not null, CHECK (price >= 0)
--   stock_count  integer, not null, default 0, CHECK (stock_count >= 0)
--   created_at   timestamptz, not null, default now()
-- TODO:


-- Problem 2 — insert at least 5 products (name, description, price, stock_count).
-- TODO:


-- Problem 3 — write a SELECT that lists every product ordered by price (highest
-- first). This one is just to check your work; it doesn't change anything.
-- TODO:
