# Week 7 — Filtering, Sorting, Functions, Aggregations

This week turns raw rows into useful numbers, and packages them as views the
homepage reads.

## The tools (in plain English)
- **WHERE** keeps only the rows that match a condition (filtering).
- **ORDER BY** sorts the result.
- **Aggregate functions** summarize many rows into one: `count()`, `sum()`,
  `avg()`, `min()`, `max()`. `round(x, n)` tidies a number.
- A **scalar sub-select** is a mini-query in parentheses that returns one value —
  handy for building a one-row "stats" view.

## Worked example (a different topic)
```sql
-- Example only — NOT the answer.
-- filtering + sorting:
select name, price from fruits where price < 1.00 order by price;

-- a one-row summary using sub-selects:
create or replace view fruit_stats as
select
  (select count(*) from fruits)::int as fruit_count,
  (select round(avg(price), 2) from fruits) as avg_price;
```

## Your tasks (in `assignments/week07/starter.sql`)
1. A `catalog_stats` view: one row with several totals (planets, moons, missions,
   observations) and the average planet radius.
2. An `inner_planets` view: the planets closer than 2 AU, sorted by distance.

## Watch & learn
- **Video:** [SQL aggregate functions: COUNT, SUM, AVG, MAX, MIN](https://www.youtube.com/watch?v=wIljdjni_dc)
- **Tutorial:** [W3Schools — WHERE](https://www.w3schools.com/sql/sql_where.asp) · [ORDER BY](https://www.w3schools.com/sql/sql_orderby.asp) · [COUNT/AVG/SUM](https://www.w3schools.com/sql/sql_count_avg_sum.asp)

## Done when
- A stats bar appears at the top of the homepage.
- The Week 7 planet is **Unlocked**.
