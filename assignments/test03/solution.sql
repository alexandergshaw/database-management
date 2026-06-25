-- Test 3 — assessed views across weeks 10-12.

-- Joins (week 10): observations per astronomer.
create or replace view test3_obs_by_astronomer as
select a.full_name as astronomer, count(o.id)::int as observations
from astronomers a
join observations o on o.astronomer_id = a.id
group by a.full_name
order by observations desc;

-- Transactions (week 11): nights booked per telescope.
create or replace view test3_bookings_by_telescope as
select t.name as telescope, coalesce(sum(b.nights), 0)::int as nights_booked
from telescopes t
left join telescope_bookings b on b.code = t.code
group by t.name
order by nights_booked desc, telescope;

-- Security (week 11): planet counts per type from the public view.
create or replace view test3_public_by_type as
select type, count(*)::int as planets
from public_catalog
group by type
order by type;

-- Analytics (week 12): the largest planet radius per type.
create or replace view test3_max_radius_by_type as
select type, max(radius_km) as max_radius_km
from planets
group by type
order by max_radius_km desc;
