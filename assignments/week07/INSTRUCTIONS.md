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
select name, price from products where price < 20 order by price;

-- a one-row summary using sub-selects:
create or replace view shop_stats as
select
  (select count(*) from products)::int as product_count,
  (select round(avg(price), 2) from products) as avg_price;
```

## Your tasks (in `assignments/week07/starter.sql`)
1. A `catalog_stats` view: one row with several totals (planets, moons, missions,
   observations) and the average planet radius.
2. An `inner_planets` view: the planets closer than 2 AU, sorted by distance.

## Done when
- A stats bar appears at the top of the homepage.
- The Week 7 planet is **Unlocked**.
