-- Final Exam — cumulative. Views that draw on the whole course.

-- Weeks 1, 2, 6, 10 (relational, 1:M, M:N, joins, CRUD): one row per planet with
-- its moon, mission, and observation counts.
create or replace view final_planet_overview as
select
  p.name as planet,
  p.type,
  count(distinct m.id)::int as moons,
  count(distinct mt.mission_id)::int as missions,
  count(distinct o.id)::int as observations
from planets p
left join moons m on m.planet_id = p.id
left join mission_targets mt on mt.planet_id = p.id
left join observations o on o.planet_id = p.id
group by p.name, p.type
order by p.name;

-- Week 5 (normalization): the 3NF star tables joined back together.
create or replace view final_normalized_stars as
select b.body, s.name as star, s.star_class
from nf_bodies b
join nf_stars s on s.id = b.star_id
order by b.body;

-- Weeks 6, 7, 10 (CRUD, aggregation, joins): observations and average magnitude
-- per planet type.
create or replace view final_observations_by_type as
select p.type, count(o.id)::int as observations, round(avg(o.magnitude), 2) as avg_magnitude
from planets p
left join observations o on o.planet_id = p.id
group by p.type
order by p.type;

-- Week 11 (transactions): telescope availability vs nights booked.
create or replace view final_telescope_usage as
select t.name as telescope, t.available_nights, coalesce(sum(b.nights), 0)::int as nights_booked
from telescopes t
left join telescope_bookings b on b.code = t.code
group by t.name, t.available_nights
order by t.name;

-- Weeks 11, 12 (security, analytics): a summary from the safe public view.
create or replace view final_public_catalog_summary as
select type, count(*)::int as planets, round(avg(radius_km), 0)::numeric(10, 0) as avg_radius_km
from public_catalog
group by type
order by planets desc, type;
