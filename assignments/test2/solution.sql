-- Test 2 — assessed views over the observation data (weeks 8-10).

-- Joins + aggregation.
create or replace view test2_obs_by_astronomer as
select a.full_name as astronomer, count(o.id)::int as observations
from astronomers a
join observations o on o.astronomer_id = a.id
group by a.full_name
order by observations desc;

-- Anti-join / filtering.
create or replace view test2_never_observed as
select p.name
from planets p
where not exists (select 1 from observations o where o.planet_id = p.id)
order by p.name;

-- Joins + sorting: brightest observations first (lower magnitude = brighter).
create or replace view test2_obs_by_magnitude as
select p.name as planet, o.magnitude
from observations o
join planets p on p.id = o.planet_id
order by o.magnitude;
