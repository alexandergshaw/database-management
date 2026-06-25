-- Week 15 — Analytics & performance.

-- Analytics view: planets and average radius per type.
create or replace view type_summary as
select
  type,
  count(*)::int as planets,
  round(avg(radius_km), 0)::numeric(10, 0) as avg_radius_km
from planets
group by type
order by planets desc, type;

-- Performance: a materialized view + index (your own objects).
drop materialized view if exists mv_type_summary;
create materialized view mv_type_summary as select * from type_summary;
create index if not exists idx_mv_type_summary on mv_type_summary (type);
