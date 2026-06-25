# Week 8 — Review 2

Practice weeks 5–7 (normalization, writing data, filtering & aggregation) as
three views.

## Reminders (plain English)
- **JOIN** matches rows from two tables on a shared key (e.g., a body to its star).
- **GROUP BY** + **count()** summarizes per group.
- **WHERE** + **ORDER BY** filters and sorts.

## Worked example (a different topic)
```sql
-- Example only — NOT the answer.
-- join two tables, then count per group:
create or replace view orders_per_city as
select c.city, count(o.id) as orders
from customers c
join orders o on o.customer_id = c.id
group by c.city
order by orders desc;
```

## Your tasks (in `assignments/review02/starter.sql`)
Three views: the normalized bodies joined to their stars, observations grouped by
status, and the planets within 10 AU. The starter names each and lists columns.

## Done when
- The Week 8 planet is **Unlocked** (all three views exist).
