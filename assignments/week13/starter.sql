-- Week 13 — Transactions, on a telescope-booking sandbox you create here.

drop table if exists telescope_bookings cascade;
drop table if exists telescopes cascade;

-- Problem 1 — create telescopes and seed a couple:
--   telescopes(code text pk, name text not null,
--              available_nights integer not null check (available_nights >= 0))
-- TODO:


-- Problem 2 — create the bookings table:
--   telescope_bookings(id uuid pk default gen_random_uuid(),
--     code text not null references telescopes(code),
--     nights integer not null check (nights > 0),
--     created_at timestamptz not null default now())
-- TODO:


-- Problem 3 — write a function book_nights(p_code text, p_nights integer) that,
-- in one transaction: locks the telescope row (SELECT ... FOR UPDATE), RAISEs an
-- exception if too few nights are available, inserts the booking, decrements
-- available_nights, and returns the new booking id.
-- TODO: create or replace function book_nights(...) returns uuid
--       language plpgsql as $$ ... $$;


-- Problem 4 — call your function once to prove it works.
-- TODO: select book_nights('YOUR_CODE', 1);
