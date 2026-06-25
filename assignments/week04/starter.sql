-- Week 4 — Normalization. Fix three denormalized tables — one per normal form.

-- ---- 1NF: atomic values (no comma-separated lists) ----
drop table if exists planet_gases cascade;
drop table if exists atmosphere_import cascade;
create table atmosphere_import (planet text not null, gases text not null);
insert into atmosphere_import (planet, gases) values
  ('Earth', 'nitrogen,oxygen,argon'),
  ('Mars', 'carbon dioxide,nitrogen');
-- Problem 1 — create planet_gases(planet, gas) with one row per gas, filled from
-- atmosphere_import. Tip: unnest(string_to_array(gases, ',')).
-- TODO:


-- ---- 2NF: no partial dependency on part of a composite key ----
drop table if exists probe_instruments cascade;
drop table if exists instruments cascade;
-- Problem 2 — instrument names depend only on the instrument code, not on
-- (probe_no, instrument_code). Create instruments(code primary key,
-- instrument_name) and probe_instruments(probe_no, instrument_code references
-- instruments, readings, primary key (probe_no, instrument_code)); add rows.
-- TODO:


-- ---- 3NF: no transitive dependency (non-key -> non-key) ----
drop table if exists nf_bodies cascade;
drop table if exists nf_stars cascade;
drop table if exists body_import cascade;
create table body_import (id serial primary key, body text not null, star text not null, star_class text not null);
insert into body_import (body, star, star_class) values
  ('Earth', 'Sun', 'G'),
  ('Mars', 'Sun', 'G'),
  ('Proxima b', 'Proxima Centauri', 'M'),
  ('TRAPPIST-1e', 'TRAPPIST-1', 'M');
-- Problem 3 — star_class depends on the star, not the body. Create
-- nf_stars(id, name unique, star_class) from the DISTINCT star + class, and
-- nf_bodies(id, body, star_id references nf_stars) referencing it.
-- TODO:
