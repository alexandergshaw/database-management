# Week 10 — Joins & Multi-Table Queries

An observation only stores *ids* (which astronomer, which planet). To show names
you must **join** the tables back together.

## The idea (plain English)
- A **JOIN** matches rows across tables on a shared key. To list each observation
  with the astronomer's and planet's names, join observations → astronomers and
  observations → planets.
- A **LEFT JOIN** keeps rows from the left table even with no match — perfect for
  counting, so a planet that's never been observed still appears with 0.
- When you join then summarize, use **GROUP BY** on the columns you're keeping.

## Worked example (a different topic)
```sql
-- Example only — NOT the answer.
-- one readable row per order, with the customer's name:
create or replace view order_lines as
select o.id, c.full_name as customer, o.total
from orders o
join customers c on c.id = o.customer_id
order by o.created_at desc;
```

## Your tasks (in `assignments/week10/starter.sql`)
1. An `observation_log` view: one row per observation with the astronomer name,
   planet name, magnitude, status, and date.
2. A `planet_observation_counts` view: every planet and how many times it's been
   observed (0 included — use a LEFT JOIN).

## Watch & learn
- **Video:** [SQL JOINs explained (YouTube)](https://www.youtube.com/results?search_query=sql+joins+explained+inner+left+join)
- **Tutorial:** [W3Schools — JOIN](https://www.w3schools.com/sql/sql_join.asp) · [LEFT JOIN](https://www.w3schools.com/sql/sql_join_left.asp)

## Done when
- An observation log table appears on the homepage.
- The Week 10 planet is **Unlocked**.
