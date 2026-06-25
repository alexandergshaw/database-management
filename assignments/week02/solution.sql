-- Week 2 — Data Modeling & ERDs.
-- Moons are a one-to-many relationship to planets (foreign key). Missions are a
-- many-to-many relationship, resolved with a junction table. A CHECK encodes a
-- business rule.

drop table if exists mission_targets cascade;
drop table if exists missions cascade;
drop table if exists moons cascade;

create table moons (
  id uuid primary key default gen_random_uuid(),
  planet_id uuid not null references planets(id) on delete cascade,
  name text not null,
  radius_km numeric(10, 1) not null check (radius_km > 0),
  created_at timestamptz not null default now()
);

insert into moons (planet_id, name, radius_km)
select p.id, m.name, m.radius_km
from planets p
join (values
  ('Earth', 'Moon', 1737.4),
  ('Mars', 'Phobos', 11.3),
  ('Mars', 'Deimos', 6.2),
  ('Jupiter', 'Io', 1821.6),
  ('Jupiter', 'Europa', 1560.8),
  ('Jupiter', 'Ganymede', 2634.1),
  ('Jupiter', 'Callisto', 2410.3),
  ('Saturn', 'Titan', 2574.7),
  ('Saturn', 'Enceladus', 252.1),
  ('Uranus', 'Titania', 788.4),
  ('Neptune', 'Triton', 1353.4)
) as m(planet_name, name, radius_km) on m.planet_name = p.name;

create table missions (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  agency text not null,
  launch_year integer not null check (launch_year > 1950),
  created_at timestamptz not null default now()
);

create table mission_targets (
  mission_id uuid not null references missions(id) on delete cascade,
  planet_id uuid not null references planets(id) on delete cascade,
  primary key (mission_id, planet_id)
);

insert into missions (name, agency, launch_year) values
  ('Voyager 2', 'NASA', 1977),
  ('Cassini', 'NASA', 1997),
  ('Mariner 10', 'NASA', 1973),
  ('Juno', 'NASA', 2011),
  ('Mars 2020', 'NASA', 2020);

insert into mission_targets (mission_id, planet_id)
select mi.id, p.id
from (values
  ('Voyager 2', 'Jupiter'), ('Voyager 2', 'Saturn'),
  ('Voyager 2', 'Uranus'), ('Voyager 2', 'Neptune'),
  ('Cassini', 'Saturn'),
  ('Mariner 10', 'Mercury'), ('Mariner 10', 'Venus'),
  ('Juno', 'Jupiter'),
  ('Mars 2020', 'Mars')
) as link(mission_name, planet_name)
join missions mi on mi.name = link.mission_name
join planets p on p.name = link.planet_name;
