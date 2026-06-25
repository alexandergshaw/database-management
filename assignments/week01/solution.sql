-- Week 1 — Relational Foundations & Keys.
-- Two well-constrained tables: planets (the catalog) and astronomers (the
-- observers), demonstrating primary keys, UNIQUE, NOT NULL, CHECK, and a
-- foreign key for referential integrity.

drop table if exists astronomer_sites cascade;
drop table if exists astronomers cascade;
drop table if exists planets cascade;

create table planets (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  type text not null,
  radius_km numeric(10, 1) not null check (radius_km > 0),
  distance_au numeric(8, 3) not null check (distance_au > 0),
  mass_e24 numeric(10, 3) not null check (mass_e24 > 0),
  mean_temp_c integer not null,
  created_at timestamptz not null default now()
);

insert into planets (name, type, radius_km, distance_au, mass_e24, mean_temp_c) values
  ('Mercury', 'terrestrial', 2439.7, 0.387, 0.330, 167),
  ('Venus', 'terrestrial', 6051.8, 0.723, 4.870, 464),
  ('Earth', 'terrestrial', 6371.0, 1.000, 5.970, 15),
  ('Mars', 'terrestrial', 3389.5, 1.524, 0.642, -65),
  ('Jupiter', 'gas giant', 69911.0, 5.203, 1898.000, -110),
  ('Saturn', 'gas giant', 58232.0, 9.537, 568.000, -140),
  ('Uranus', 'ice giant', 25362.0, 19.191, 86.800, -195),
  ('Neptune', 'ice giant', 24622.0, 30.069, 102.000, -200);

create table astronomers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text not null,
  created_at timestamptz not null default now()
);

create table astronomer_sites (
  id uuid primary key default gen_random_uuid(),
  astronomer_id uuid not null references astronomers(id) on delete cascade,
  site_name text not null,
  country text not null
);

insert into astronomers (email, full_name) values
  ('ana.ramirez@example.com', 'Ana Ramirez'),
  ('ben.cole@example.com', 'Ben Cole'),
  ('chiara.rossi@example.com', 'Chiara Rossi'),
  ('deepa.nair@example.com', 'Deepa Nair');

insert into astronomer_sites (astronomer_id, site_name, country)
select id, 'Mauna Kea', 'USA'
from astronomers where email = 'ana.ramirez@example.com';
