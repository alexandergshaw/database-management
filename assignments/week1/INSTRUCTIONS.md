# Week 1 — Relational Foundations

A storefront needs something to sell. Create your first table.

## Concepts
- A **table** models one kind of thing; a **row** is one instance.
- A **column** has a **data type**; a **primary key** identifies each row; a
  **constraint** (`not null`, `check`) enforces a rule.

## Your SQL task
Open and complete `assignments/week1/starter.sql` in the Supabase SQL editor. It creates a
`products` table (id, name, description, price, stock_count, created_at) with
`CHECK` constraints, and seeds five products.

## Done when
- Product cards appear in the Storefront on the homepage.
- The Week 1 planet is **Unlocked**.

---

**Retry anytime:** re-run the script — it drops its own objects first. Clear one
object by hand with `drop table if exists <name> cascade;`.
