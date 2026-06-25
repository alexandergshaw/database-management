-- Week 11 — Transactions & Security. Run the whole file when done.

-- ===== Part A: Transactions (telescope booking) =====
drop table if exists telescope_bookings cascade;
drop table if exists telescopes cascade;

-- Problem 1 — Create two tables:
--   "telescopes": code (text, primary key), name (text, required),
--        available_nights (whole number, required, with a CHECK that it's >= 0).
--        Insert a couple of telescopes (give each some available nights).
--   "telescope_bookings": id (auto-generated primary key), code (a FOREIGN KEY
--        to telescopes.code), nights (whole number, required, CHECK > 0),
--        created_at (timestamp, default now).
-- TODO:


-- Problem 2 — Write a function "book_nights(p_code text, p_nights integer)" that
-- returns the new booking's id and does these steps as ONE transaction:
--   a) read the telescope's available_nights, locking the row (... for update)
--   b) if there aren't enough nights, raise an exception (this undoes everything)
--   c) insert a row into telescope_bookings
--   d) subtract p_nights from that telescope's available_nights
--   e) return the new booking id
-- Use the "withdraw" example in INSTRUCTIONS.md as your template. Then run it
-- once, e.g.  select book_nights('HUBBLE', 2);
-- TODO:


-- ===== Part B: Security =====
drop table if exists proposal_secrets cascade;

-- Problem 3 — Create a private table "proposal_secrets" with id (auto-generated
-- primary key), pi_email (text, required), budget_usd (number, required), and
-- add a row. Then:
--   • turn on row-level security:  alter table proposal_secrets enable row level security;
--   • add a policy that lets ONLY the trusted role read it:
--     create policy <name> on proposal_secrets for select to service_role using (true);
-- TODO:


-- Problem 4 — Create a view "public_catalog" that exposes only SAFE planet
-- columns (name, type, radius_km, distance_au), then allow the public role to
-- read it:  grant select on public_catalog to anon;
-- TODO:
