# Week 9 — Test 2

The graded version of Review 2 (weeks 5–7), as three views.

## One new idea: "does NOT exist"
To find rows in one table with **no** match in another, use `NOT EXISTS` with a
small sub-query:
```sql
-- Example only — NOT the answer.
-- "products that have never been reviewed":
create or replace view never_reviewed as
select p.name
from products p
where not exists (select 1 from reviews r where r.product_id = p.id)
order by p.name;
```

## Your tasks (in `assignments/test02/starter.sql`)
Three views: how many bodies each star has (normalization), planets never
observed (the `NOT EXISTS` trick), and the coldest planets (filtering + sorting).

## Done when
- The Week 9 planet is **Unlocked** (all three views exist).
