# Week 3 — ERDs & Business Rules

On an ERD, a product can belong to many categories and a category holds many
products — a **many-to-many** relationship. You can't draw that with a single
foreign key; you resolve it with a **junction table**.

## Concepts in play
- **Many-to-many** resolved by a junction table (`product_categories`) whose
  primary key is the pair `(product_id, category_id)`.
- **Business rules** enforced by `CHECK` constraints so bad data can't be saved.

## Your SQL task
Edit **`supabase/migrations/0003_week3_categories.sql`**:
1. Create a `categories` table.
2. Create a `product_categories` junction table referencing both sides.
3. Add a `CHECK` constraint encoding a business rule (e.g. stock can't exceed a
   sane maximum).
4. Insert categories and link products to one *or more* categories each.

## Done when
- `assignments/week3/test.ts` passes (both tables exist, at least one product
  has multiple categories, the CHECK rejects an out-of-range value).
- Product cards show **category chips**.

---

**If it fails:** Do not merge a broken PR. Close it and start a fresh branch from `main` (production only updates on merge). Rebuild a dirtied database with `npm run db:reset`, or start this week over with `npm run reset:week -- <folder>`. See "Recovering from a failed assignment" in the README.
