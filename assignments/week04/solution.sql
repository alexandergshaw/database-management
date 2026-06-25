-- Week 4 — Normalization: one fix per normal form, all on tables created here.

-- ---- 1NF: atomic values (no comma-separated lists) ----
drop table if exists planet_gases cascade;
drop table if exists atmosphere_import cascade;
create table atmosphere_import (planet text not null, gases text not null);
insert into atmosphere_import (planet, gases) values
  ('Earth', 'nitrogen,oxygen,argon'),
  ('Mars', 'carbon dioxide,nitrogen');
create table planet_gases (planet text not null, gas text not null, primary key (planet, gas));
insert into planet_gases (planet, gas)
select planet, trim(g) from atmosphere_import, unnest(string_to_array(gases, ',')) as g;

-- ---- 2NF: no partial dependency on part of a composite key ----
-- (probe_no, instrument_code) is the key, but instrument_name depends only on
-- instrument_code.
drop table if exists probe_instruments cascade;
drop table if exists instruments cascade;
create table instruments (code text primary key, instrument_name text not null);
insert into instruments (code, instrument_name) values ('CAM', 'Camera'), ('MAG', 'Magnetometer');
create table probe_instruments (
  probe_no integer not null,
  instrument_code text not null references instruments(code),
  readings integer not null,
  primary key (probe_no, instrument_code)
);
insert into probe_instruments (probe_no, instrument_code, readings) values
  (1, 'CAM', 1200), (1, 'MAG', 340), (2, 'CAM', 980);

-- ---- 3NF: no transitive dependency (non-key -> non-key) ----
-- star_class depends on star, not on the body.
drop table if exists nf_bodies cascade;
drop table if exists nf_stars cascade;
drop table if exists body_import cascade;
create table body_import (id serial primary key, body text not null, star text not null, star_class text not null);
insert into body_import (body, star, star_class) values
  ('Earth', 'Sun', 'G'),
  ('Mars', 'Sun', 'G'),
  ('Proxima b', 'Proxima Centauri', 'M'),
  ('TRAPPIST-1e', 'TRAPPIST-1', 'M');
create table nf_stars (id serial primary key, name text not null unique, star_class text not null);
insert into nf_stars (name, star_class) select distinct star, star_class from body_import;
create table nf_bodies (id serial primary key, body text not null, star_id integer not null references nf_stars(id));
insert into nf_bodies (body, star_id)
select bi.body, s.id from body_import bi join nf_stars s on s.name = bi.star;
