-- Week 10 — Joins & multi-table queries.

-- Inner joins: one readable row per observation.
create or replace view observation_log as
select
  o.id,
  o.observed_at,
  o.status,
  a.full_name as astronomer,
  p.name as planet,
  o.magnitude
from observations o
join astronomers a on a.id = o.astronomer_id
join planets p on p.id = o.planet_id
order by o.observed_at desc;

-- A LEFT JOIN keeps planets that have never been observed (count 0).
create or replace view planet_observation_counts as
select p.name as planet, count(o.id)::int as observations
from planets p
left join observations o on o.planet_id = p.id
group by p.name
order by observations desc, planet;
