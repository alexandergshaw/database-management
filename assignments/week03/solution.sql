-- Week 3 — Missions (many-to-many with planets) + a business rule.
-- A mission can visit many planets and a planet is visited by many missions, so
-- the relationship lives in a junction table.

drop table if exists mission_targets cascade;
drop table if exists missions cascade;

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
