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
create or replace view pets_per_city as
select o.city, count(p.id) as pets
from owners o
join pets p on p.owner_id = o.id
group by o.city
order by pets desc;
```

## Your tasks (in `assignments/review02/starter.sql`)
Three views: the normalized bodies joined to their stars, observations grouped by
status, and the planets within 10 AU. The starter names each and lists columns.

## Watch & learn
- **Video:** [SQL joins for beginners: inner, left, right, full](https://www.youtube.com/watch?v=2HVMiPPuPIM)
- **Tutorial:** [W3Schools — JOIN](https://www.w3schools.com/sql/sql_join.asp) · [GROUP BY](https://www.w3schools.com/sql/sql_groupby.asp)

## Done when
- The Week 8 planet is **Unlocked** (all three views exist).
