# Week 1 — Relational Foundations & Keys

This week you create the two tables at the heart of the catalog — **planets** and
**astronomers** — and learn the rules that keep a database trustworthy.

## The concepts (in plain English)
- **Primary key** — one column that uniquely identifies each row. We use an `id`
  the database generates automatically.
- **UNIQUE** — "no two rows may share this value" (e.g., two planets can't have
  the same name).
- **NOT NULL** — "this column must always have a value."
- **CHECK** — a rule the value must obey (e.g., a radius can't be zero or negative).
- **Foreign key** — a column that points at a row in another table, and the
  database refuses to point at something that doesn't exist (**referential
  integrity**).

## Worked example (a different topic — yours is about planets)
```sql
-- Example only — NOT the answer:
create table members (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,                 -- required, and no duplicates
  full_name text not null
);

create table member_cards (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,  -- foreign key
  card_number text not null
);
```
Notice how `member_cards.member_id` **references** `members(id)`. You'll use the
same idea to connect astronomers to their sites.

## Your tasks (in `assignments/week01/starter.sql`)
1. Create the `planets` table (unique name, and CHECKs so radius/distance stay
   positive), then insert at least 6 planets.
2. Create the `astronomers` table (with a unique email) and add a few.
3. Create `astronomer_sites` with a foreign key to astronomers, and add one site.

The starter lists every column and what it should hold — you write the SQL.

## Done when
- Planet cards appear in the catalog on the homepage.
- The Week 1 planet is **Unlocked**.

## Made a mistake?
Fix it and run the file again — it clears its own tables first.
