-- Review 2 — consolidates weeks 5-7 (normalization, CRUD, filtering/aggregation).

-- Normalization (week 5): the 3NF tables joined back together.
create or replace view review2_body_normalized as
select b.body, s.name as star, s.star_class
from nf_bodies b
join nf_stars s on s.id = b.star_id
order by b.body;

-- CRUD + aggregation (weeks 6-7): observations per status.
create or replace view review2_obs_by_status as
select status, count(*)::int as observations
from observations
group by status
order by observations desc, status;

-- Filtering + sorting (week 7): planets within 10 AU.
create or replace view review2_close_planets as
select name, distance_au
from planets
where distance_au < 10
order by distance_au;
