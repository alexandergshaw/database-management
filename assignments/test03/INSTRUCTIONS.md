# Week 14 — Test 3

The graded version of Review 3 (weeks 10–12), as four views.

## Reminder
- `coalesce(x, 0)` turns a missing value into 0 — useful with `sum()` over a LEFT
  JOIN, so a telescope with no bookings shows `0` instead of blank.

## Worked example (a different topic)
```sql
-- Example only — NOT the answer.
create or replace view spend_per_customer as
select c.name, coalesce(sum(o.total), 0) as spent
from customers c
left join orders o on o.customer_id = c.id
group by c.name
order by spent desc;
```

## Your tasks (in `assignments/test03/starter.sql`)
Four views: observations per astronomer (joins), nights booked per telescope
(transactions), planet counts per type from the public view (security), and the
largest planet per type (analytics).

## Watch & learn
- **Video:** [SQL joins for beginners: inner, left, right, full](https://www.youtube.com/watch?v=2HVMiPPuPIM)
- **Tutorial:** [W3Schools — LEFT JOIN](https://www.w3schools.com/sql/sql_join_left.asp) · [GROUP BY](https://www.w3schools.com/sql/sql_groupby.asp)

## Done when
- The Week 14 planet is **Unlocked** (all four views exist).
