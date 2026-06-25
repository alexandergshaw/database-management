# Week 3 — ERDs & Business Rules

A product can be in many categories, and a category holds many products — a
**many-to-many** relationship, resolved with a junction table.

## Concepts
- Many-to-many → a junction table whose primary key is the pair of foreign keys.
- A **business rule** enforced by a `CHECK` constraint (category names can't be
  blank).

## Your SQL task
Open and complete `assignments/week3/starter.sql`. It creates `categories` and a
`product_categories` junction table, adds a `CHECK` rule, and links each product
to one or more categories.

## Done when
- Product cards show category chips.
- The Week 3 planet is **Unlocked**.

---

**Retry anytime:** re-run the script — it drops its own objects first. Clear one
object by hand with `drop table if exists <name> cascade;`.
