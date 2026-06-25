-- Review 2 — consolidates weeks 8-10 as views.

-- Joins + aggregation: most-observed planets.
create or replace view review2_most_observed as
select p.name as planet, count(o.id)::int as observations
from planets p
join observations o on o.planet_id = p.id
group by p.name
order by observations desc, planet;

-- Filtering + sorting: planets within 10 AU.
create or replace view review2_close_planets as
select name, distance_au
from planets
where distance_au < 10
order by distance_au;

-- Aggregation by group: observations per status.
create or replace view review2_obs_by_status as
select status, count(*)::int as observations
from observations
group by status
order by observations desc, status;
