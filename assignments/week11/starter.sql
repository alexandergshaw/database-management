-- Week 11 — Transactions & Security.

-- ===== Part A: Transactions (telescope-booking sandbox) =====
drop table if exists telescope_bookings cascade;
drop table if exists telescopes cascade;

-- Problem 1 — create telescopes(code text pk, name text not null,
-- available_nights integer not null check (available_nights >= 0)) and seed a
-- couple; then create telescope_bookings(id uuid pk default gen_random_uuid(),
-- code text not null references telescopes(code),
-- nights integer not null check (nights > 0), created_at timestamptz default now()).
-- TODO:


-- Problem 2 — write book_nights(p_code text, p_nights integer) returning uuid:
-- lock the telescope row (SELECT ... FOR UPDATE), RAISE if too few nights,
-- insert the booking, decrement available_nights, return the booking id.
-- Then call it once: select book_nights('HUBBLE', 2);
-- TODO:


-- ===== Part B: Security (RLS + safe public view) =====
drop table if exists proposal_secrets cascade;

-- Problem 3 — create proposal_secrets(id uuid pk default gen_random_uuid(),
-- pi_email text not null, budget_usd numeric(12,2) not null), add a row, enable
-- row level security, and add a SELECT policy allowing only service_role.
-- TODO:


-- Problem 4 — create a public_catalog view exposing only safe planet columns
-- (name, type, radius_km, distance_au), and grant select on it to anon.
-- TODO:
