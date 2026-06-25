# Week 12 — Analytics & Performance

The last build week: summarize the catalog for a dashboard, and make that summary
fast to read.

## The ideas (plain English)
- An **analytics view** groups and aggregates data for reporting (e.g., counts
  and averages per category).
- A **materialized view** stores a query's *result* like a snapshot, so reading
  it is instant (you refresh it when the data changes). An **index** on it makes
  look-ups faster still. Both are new objects — you're not changing any existing
  table.

## Worked example (a different topic)
```sql
-- Example only — NOT the answer.
create or replace view sales_by_region as
select region, count(*) as orders, round(avg(total), 2) as avg_order
from orders group by region order by orders desc;

create materialized view sales_by_region_snapshot as select * from sales_by_region;
create index idx_sales_region on sales_by_region_snapshot (region);
```

## Your tasks (in `assignments/week12/starter.sql`)
1. A `type_summary` view: per planet type, how many planets and their average
   radius.
2. A `mv_type_summary` materialized view of it, plus an index.

## Watch & learn
- **Video:** [PostgreSQL materialized views explained](https://www.youtube.com/watch?v=yHppzfjqm1s)
- **Tutorial:** [PostgreSQL — materialized views](https://www.postgresql.org/docs/current/rules-materializedviews.html) · [W3Schools — indexes](https://www.w3schools.com/sql/sql_create_index.asp)

## Done when
- A "Planets by type" chart appears on the homepage.
- The Week 12 planet is **Unlocked**.
