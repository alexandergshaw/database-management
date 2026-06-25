# Week 9 — Test 2

The graded version of Review 2 (weeks 5–7), as three views.

## One new idea: "does NOT exist"
To find rows in one table with **no** match in another, use `NOT EXISTS` with a
small sub-query:
```sql
-- Example only — NOT the answer.
-- "pets that have never been to the vet":
create or replace view never_visited as
select p.name
from pets p
where not exists (select 1 from vet_visits v where v.pet_id = p.id)
order by p.name;
```

## Your tasks (in `assignments/test02/starter.sql`)
Three views: how many bodies each star has (normalization), planets never
observed (the `NOT EXISTS` trick), and the coldest planets (filtering + sorting).

## Watch & learn
- **Video:** [SQL subqueries visually explained](https://www.youtube.com/watch?v=tvBp81WVrCA)
- **Tutorial:** [W3Schools — EXISTS](https://www.w3schools.com/sql/sql_exists.asp) · [WHERE](https://www.w3schools.com/sql/sql_where.asp)

## Done when
- The Week 9 planet is **Unlocked** (all three views exist).
