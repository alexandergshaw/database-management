-- Week 6 — Observations: practice SELECT / INSERT / UPDATE / DELETE.
-- Run the whole file when done (it clears its table first).

drop table if exists observations cascade;

-- Problem 1 — Create a table named "observations" with:
--    id             unique auto-generated id (primary key)
--    astronomer_id  who observed  (FOREIGN KEY to astronomers.id, on delete cascade)
--    planet_id      what they observed  (FOREIGN KEY to planets.id)
--    magnitude      how bright it looked  (number, required; lower = brighter)
--    status         the state of the record  (text, required, default 'logged')
--    observed_at    when  (timestamp, default now)
-- TODO:


-- Problem 2 — INSERT at least three observations. Pick the astronomer and planet
-- by looking up their ids (see the "handy trick" in INSTRUCTIONS.md). Leave the
-- status as its default for most, but make ONE row 'cancelled' so you can delete
-- it in the next step.
-- TODO:


-- Problem 3 — UPDATE: set status to 'confirmed' for every row whose status is
-- 'logged'. Then DELETE every row whose status is 'cancelled'.
-- TODO:


-- Problem 4 — SELECT the remaining observations (id, magnitude, status), oldest
-- first. (This just shows your work; it changes nothing.)
-- TODO:
