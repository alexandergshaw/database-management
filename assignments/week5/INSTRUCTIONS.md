# Week 5 — Keys, Constraints, Referential Integrity

Add the people who buy things, with the keys and constraints that keep data
trustworthy.

## Concepts
- **Primary key** identifies each customer; **UNIQUE** stops duplicate emails;
  **NOT NULL** requires fields.
- A **foreign key** from addresses to customers enforces referential integrity
  between two new tables.

## Your SQL task
Open and complete `assignments/week5/starter.sql`. It creates `customers` (unique email) and
`customer_addresses` (FK to customers), and seeds a few rows.

## Done when
- The Week 5 planet is **Unlocked** (the customer count feeds the stats bar once
  Week 9 is done).

---

**Retry anytime:** re-run the script — it drops its own objects first. Clear one
object by hand with `drop table if exists <name> cascade;`.
