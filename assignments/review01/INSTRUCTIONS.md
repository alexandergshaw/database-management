# Week 3 — Review 1

A review week: you practice everything from weeks 1–2 by building **views**.

## What's a view?
A **view** is a saved query you can read like a table. You define it once with
`create or replace view <name> as <a SELECT> ;` and the database re-runs that
SELECT whenever something reads the view. (`create or replace` means re-running
your script just updates it — safe to do over and over.)

This week's views also use:
- **JOIN** — combine rows from two tables that match on a key.
- **LEFT JOIN** — like JOIN, but keeps rows from the left table even when there's
  no match (handy for counting, so a planet with 0 moons still shows up).
- **GROUP BY** + **count()** — collapse many rows into one per group and count.

## Worked example (a different topic — yours is about planets)
```sql
-- Example only — NOT the answer.
-- "how many pets each owner has, including owners with none":
create or replace view owner_pet_counts as
select o.full_name as owner, count(p.id) as pets
from owners o
left join pets p on p.owner_id = o.id
group by o.full_name
order by o.full_name;
```

## Your tasks (in `assignments/review01/starter.sql`)
Create three views — the starter names each one and lists the columns it should
return. They cover one-to-many (moons), many-to-many (missions), and keys (sites).

## Watch & learn
- **Video:** [SQL views — CREATE VIEW & DROP VIEW](https://www.youtube.com/watch?v=fsJDbjHv8uY)
- **Tutorial:** [W3Schools — views](https://www.w3schools.com/sql/sql_view.asp) · [JOIN](https://www.w3schools.com/sql/sql_join.asp) · [GROUP BY](https://www.w3schools.com/sql/sql_groupby.asp)

## Done when
- The Week 3 planet is **Unlocked** (all three views exist).

## Made a mistake?
Just run the file again — `create or replace view` overwrites cleanly.
