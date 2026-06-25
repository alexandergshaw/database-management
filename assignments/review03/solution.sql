-- Review 3 — consolidates weeks 10-12 (joins, transactions, security, analytics).

-- Joins (week 10): observations per astronomer, from the join view.
create or replace view review3_busiest_observers as
select astronomer, count(*)::int as observations
from observation_log
group by astronomer
order by observations desc, astronomer;

-- Transactions (week 11): what book_nights recorded.
create or replace view review3_booking_log as
select b.id as booking_id, t.name as telescope, b.nights, b.created_at
from telescope_bookings b
join telescopes t on t.code = b.code
order by b.created_at;

-- Security (week 11): the safe, public-facing catalog.
create or replace view review3_public_listing as
select name, type from public_catalog order by name;

-- Analytics (week 12).
create or replace view review3_type_summary as
select type, count(*)::int as planets, round(avg(radius_km), 0)::numeric(10, 0) as avg_radius_km
from planets
group by type
order by planets desc, type;
