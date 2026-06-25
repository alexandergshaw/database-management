-- Final — capstone views spanning weeks 13-15.

-- Analytics (week 15).
create or replace view final_type_summary as
select type, count(*)::int as planets, round(avg(radius_km), 0)::numeric(10, 0) as avg_radius_km
from planets
group by type
order by planets desc, type;

-- Joins + analytics (weeks 2, 15): planets ranked by moon count.
create or replace view final_moon_leaders as
select p.name as planet, count(m.id)::int as moons
from planets p
left join moons m on m.planet_id = p.id
group by p.name
order by moons desc, planet;

-- Transactions (week 13): what book_nights recorded.
create or replace view final_booking_log as
select b.id as booking_id, t.name as telescope, b.nights, b.created_at
from telescope_bookings b
join telescopes t on t.code = b.code
order by b.created_at;

-- Security (week 14): the safe, public-facing catalog.
create or replace view final_public_listing as
select name, type from public_catalog order by name;
