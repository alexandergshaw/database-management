-- Week 8 — Orders: practice INSERT / UPDATE / DELETE on tables you own here.

drop table if exists order_items cascade;
drop table if exists orders cascade;

-- Problem 1 — create the orders table:
--   id uuid pk default gen_random_uuid(),
--   customer_id uuid not null references customers(id) on delete cascade,
--   status text not null default 'paid',
--   created_at timestamptz not null default now()
-- TODO:


-- Problem 2 — create the order_items table:
--   order_id uuid references orders(id) on delete cascade,
--   product_id uuid references products(id),
--   quantity integer not null check (quantity > 0),
--   unit_price numeric(10,2) not null check (unit_price >= 0),
--   primary key (order_id, product_id)
-- TODO:


-- Problem 3 — INSERT at least two orders, each with one or more order_items.
--   Tip: with o as (insert into orders (...) ... returning id)
--        insert into order_items select o.id, ... from o, products ...
-- TODO:


-- Problem 4 — UPDATE one order's status to 'fulfilled', then DELETE any order
-- whose status is 'cancelled'.
-- TODO:
