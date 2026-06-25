# Week 4 — Test 1

The graded version of Review 1. Same skills (weeks 1–2), assessed as three views.

## A quick refresher on aggregates
- **count(\*)** counts rows; **avg(col)** averages a column; **round(x, n)**
  rounds a number to `n` decimals.
- **GROUP BY col** makes one result row per distinct value of `col`, so you can
  count or average *within* each group.

## Worked example (a different topic)
```sql
-- Example only — NOT the answer.
-- "how many fruits are each color":
create or replace view fruits_per_color as
select color, count(*) as fruits
from fruits
group by color
order by color;
```

## Your tasks (in `assignments/test01/starter.sql`)
Create three views (the starter names each and lists its columns): planets per
type, the average planet radius, and missions per agency.

## Watch & learn
- **Video:** [SQL aggregate functions: COUNT, SUM, AVG, MAX, MIN](https://www.youtube.com/watch?v=wIljdjni_dc)
- **Tutorial:** [W3Schools — COUNT/AVG/SUM](https://www.w3schools.com/sql/sql_count_avg_sum.asp) · [GROUP BY](https://www.w3schools.com/sql/sql_groupby.asp)

## Done when
- The Week 4 planet is **Unlocked** (all three views exist).

## Made a mistake?
Just run the file again — `create or replace view` overwrites cleanly.
