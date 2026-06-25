# Week 1 — Relational Foundations & Keys

Build the two core tables of the catalog — planets and astronomers — with the
keys and constraints that keep data trustworthy.

## Concepts
- A **table** models one kind of thing; a **column** has a **data type**.
- A **primary key** identifies each row; **UNIQUE** stops duplicates; **NOT
  NULL** requires a value; **CHECK** enforces a rule.
- A **foreign key** enforces referential integrity between two tables.

## Problems (in `assignments/week01/starter.sql`)
1. Create the `planets` table (with `UNIQUE` name and `CHECK` constraints).
2. Insert at least 6 planets.
3. Create the `astronomers` table (unique email) and insert a few.
4. Create `astronomer_sites` with a foreign key to astronomers, and add a site.

## Done when
- Planet cards appear in the catalog on the homepage.
- The Week 1 planet is **Unlocked**.

---

**Retry anytime:** re-run the script — it drops its own objects first.
