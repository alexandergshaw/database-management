-- Week 9 — Filtering, sorting, functions, and aggregations as views.

-- Aggregations + functions (count/avg/round).
create or replace view catalog_stats as
select
  (select count(*) from planets)::int as planet_count,
  (select count(*) from moons)::int as moon_count,
  (select count(*) from missions)::int as mission_count,
  (select count(*) from observations)::int as observation_count,
  (select coalesce(round(avg(radius_km), 0), 0) from planets)::numeric(10, 0) as avg_radius_km;

-- Filtering (WHERE) + sorting (ORDER BY): the inner planets.
create or replace view inner_planets as
select name, type, distance_au
from planets
where distance_au < 2
order by distance_au;
