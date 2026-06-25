-- Week 2 — Moons. A new entity with a one-to-many relationship to planets
-- (one planet has many moons), modeled with a foreign key. We never alter the
-- planets table.

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
