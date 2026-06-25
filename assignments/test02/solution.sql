-- Test 2 — assessed views across weeks 5-7.

-- Normalization (week 5): bodies per star from the 3NF tables.
create or replace view test2_star_body_counts as
select s.name as star, count(b.id)::int as bodies
from nf_stars s
left join nf_bodies b on b.star_id = s.id
group by s.name
order by s.name;

-- CRUD / anti-join (week 6): planets that have never been observed.
create or replace view test2_never_observed as
select p.name
from planets p
where not exists (select 1 from observations o where o.planet_id = p.id)
order by p.name;

-- Filtering + sorting (week 7): the coldest planets.
create or replace view test2_cold_planets as
select name, mean_temp_c
from planets
where mean_temp_c < 0
order by mean_temp_c;
