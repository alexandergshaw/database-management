-- Week 8 — Observations: practice SELECT / INSERT / UPDATE / DELETE.

drop table if exists observations cascade;

-- Problem 1 — create the observations table:
--   id uuid pk default gen_random_uuid(),
--   astronomer_id uuid not null references astronomers(id) on delete cascade,
--   planet_id uuid not null references planets(id),
--   magnitude numeric(5,2) not null,
--   status text not null default 'logged',
--   observed_at timestamptz not null default now()
-- TODO:


-- Problem 2 — INSERT at least three observations linking an astronomer to a
-- planet. Tip: with a as (select id from astronomers where email = '...')
--              insert into observations select a.id, p.id, ... from a, planets p ...
-- TODO:


-- Problem 3 — UPDATE 'logged' observations to 'confirmed', then DELETE any whose
-- status is 'cancelled'.
-- TODO:


-- Problem 4 — SELECT the remaining observations (id, magnitude, status), oldest
-- first.
-- TODO:
