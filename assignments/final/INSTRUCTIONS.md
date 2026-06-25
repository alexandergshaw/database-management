# Week 15 — Final Exam (Cumulative)

The capstone. These five views pull together **everything** — relationships,
normalization, CRUD, aggregation, joins, transactions, security, and analytics.
The fully assembled catalog is your demo.

## One tip you'll need
When you LEFT JOIN one table to *several* others and then count, an ordinary
`count(...)` can over-count (the joins multiply rows). Use **`count(distinct ...)`**
to count each thing once:
```sql
-- Example only — NOT the answer.
select a.name,
       count(distinct b.id) as books,
       count(distinct r.id) as reviews
from authors a
left join books b   on b.author_id = a.id
left join reviews r on r.author_id = a.id
group by a.name;
```

## Your tasks (in `assignments/final/starter.sql`)
1. `final_planet_overview` — each planet with its moon, mission, and observation
   counts (use `count(distinct ...)`).
2. `final_normalized_stars` — the 3NF star tables joined.
3. `final_observations_by_type` — observations and average magnitude per type.
4. `final_telescope_usage` — each telescope's availability vs nights booked.
5. `final_public_catalog_summary` — a per-type summary from the safe public view.

## Watch & learn
- **Video:** [SQL Tutorial – Full Course for Beginners (freeCodeCamp)](https://www.youtube.com/watch?v=HXV3zeQKqGY) — a full review of everything in this course.
- **Tutorial:** [W3Schools — SQL reference](https://www.w3schools.com/sql/) · [PostgreSQL — the SQL language](https://www.postgresql.org/docs/current/sql.html)

## Done when
- The Final Exam planet is **Unlocked** (all five views exist).

## Present your work
Walk through the homepage and name the SQL behind each section, and explain one
design decision from each block (a junction table, a normalization split, the
transaction function, an RLS policy).
