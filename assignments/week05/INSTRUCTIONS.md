# Week 5 — Normalization (1NF, 2NF, 3NF)

**Normalization** means organizing tables so each fact is stored in exactly one
place. Messy "import" tables repeat data, which wastes space and lets the data
disagree with itself. You'll fix three of them — one per "normal form." The
messy tables are already created for you; your job is to build the clean ones.

## The three rules (in plain English)
- **1NF** — no "lists" inside a single cell. A column like `'oxygen,nitrogen'`
  should become several rows, one value each.
- **2NF** — when a table's key is two columns together, no other column may
  depend on just *part* of that key. Move those columns to their own table.
- **3NF** — no column should depend on another non-key column. Example: if a
  table stores `star` and `star_class`, the class really depends on the star, not
  on the row — so move it to a `stars` table.

## Worked example (3NF, different topic)
```sql
-- Example only — NOT the answer.
-- "orders" repeats each customer's city on every order (city depends on customer).
-- Fix: pull customers (with their city) into their own table.
create table customers_clean (id serial primary key, name text unique, city text);
insert into customers_clean (name, city)
select distinct customer, customer_city from orders;
```

## Your tasks (in `assignments/week05/starter.sql`)
1. **1NF** — turn a comma-separated `gases` column into one row per gas.
2. **2NF** — split an instrument's name (which depends only on its code) into its
   own table.
3. **3NF** — move each star's class into an `nf_stars` table the bodies point to.

The starter gives you the messy tables and explains exactly what clean tables to
build.

## Done when
- The Normalization panel shows the import normalized into stars.
- The Week 5 planet is **Unlocked**.
