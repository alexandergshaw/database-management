-- Test 1 — assessed views across weeks 1-5.

-- Aggregation by group (week 1): planets per type.
create or replace view test1_planets_per_type as
select type, count(*)::int as planets
from planets
group by type
order by type;

-- Aggregation + functions (week 1): average planet radius.
create or replace view test1_avg_radius as
select round(avg(radius_km), 1) as avg_radius_km
from planets;

-- Many-to-many (week 3): missions per agency.
create or replace view test1_missions_by_agency as
select agency, count(*)::int as missions
from missions
group by agency
order by agency;

-- Normalization (week 4): bodies per star from the 3NF tables.
create or replace view test1_star_body_counts as
select s.name as star, count(b.id)::int as bodies
from nf_stars s
left join nf_bodies b on b.star_id = s.id
group by s.name
order by s.name;
