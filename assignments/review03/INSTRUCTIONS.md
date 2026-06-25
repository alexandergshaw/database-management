# Week 13 — Review 3

Practice weeks 10–12 (joins, transactions, security, analytics) as four views.

## Reminders (plain English)
- You can build a view **on top of** another view — e.g., read from the
  `observation_log` view you made in Week 10.
- JOIN + GROUP BY summarizes related rows; reading from `public_catalog` keeps
  you on the safe, public columns.

## Worked example (a different topic)
```sql
-- Example only — NOT the answer.
-- summarize from an existing view:
create or replace view top_customers as
select customer, count(*) as orders
from order_lines           -- a view made earlier
group by customer
order by orders desc;
```

## Your tasks (in `assignments/review03/starter.sql`)
Four views: busiest observers (from the Week 10 log), the booking log, the safe
public listing, and a per-type summary. The starter names each and lists columns.

## Watch & learn
- **Video:** [SQL views — CREATE VIEW & DROP VIEW](https://www.youtube.com/watch?v=fsJDbjHv8uY)
- **Tutorial:** [W3Schools — views](https://www.w3schools.com/sql/sql_view.asp) · [JOIN](https://www.w3schools.com/sql/sql_join.asp)

## Done when
- The Week 13 planet is **Unlocked** (all four views exist).
