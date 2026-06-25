-- Week 5 — Normalization. The messy "import" tables are made for you below;
-- your job is to build the clean tables. Run the whole file when done.

-- ===== 1NF: no lists inside a cell =====
drop table if exists planet_gases cascade;
drop table if exists atmosphere_import cascade;
create table atmosphere_import (planet text not null, gases text not null);
insert into atmosphere_import (planet, gases) values
  ('Earth', 'nitrogen,oxygen,argon'),
  ('Mars', 'carbon dioxide,nitrogen');

-- Problem 1 — Create a table "planet_gases" with columns (planet, gas) and the
-- pair as its primary key, then fill it with ONE ROW PER GAS from
-- atmosphere_import (so 'nitrogen,oxygen,argon' becomes three rows).
-- Hint: Postgres can split text and turn it into rows:
--   select planet, trim(g) from atmosphere_import,
--          unnest(string_to_array(gases, ',')) as g
-- TODO:


-- ===== 2NF: no column depends on only PART of a composite key =====
drop table if exists probe_instruments cascade;
drop table if exists instruments cascade;

-- Problem 2 — Here the key is (probe_no, instrument_code), but an instrument's
-- NAME depends only on its code. So make TWO tables:
--   "instruments": code (primary key) and instrument_name
--   "probe_instruments": probe_no, instrument_code (a foreign key to
--        instruments.code), readings, with (probe_no, instrument_code) as the
--        primary key.
-- Then insert a couple of instruments and a few probe_instruments rows.
-- TODO:


-- ===== 3NF: no column depends on another non-key column =====
drop table if exists nf_bodies cascade;
drop table if exists nf_stars cascade;
drop table if exists body_import cascade;
create table body_import (id serial primary key, body text not null, star text not null, star_class text not null);
insert into body_import (body, star, star_class) values
  ('Earth', 'Sun', 'G'),
  ('Mars', 'Sun', 'G'),
  ('Proxima b', 'Proxima Centauri', 'M'),
  ('TRAPPIST-1e', 'TRAPPIST-1', 'M');

-- Problem 3 — star_class depends on the star, not on the body. Build:
--   "nf_stars": id (primary key), name (unique), star_class — filled with the
--        DISTINCT star + class from body_import.
--   "nf_bodies": id (primary key), body, star_id (a foreign key to nf_stars.id)
--        — filled by matching each body's star name to its new star row.
-- TODO:
