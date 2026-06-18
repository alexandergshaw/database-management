# Week 2 — Data Modeling: Entities, Attributes, Relationships

Your store sells products, but who makes them? This week you add a second
entity — suppliers — and connect products to it with a **one-to-many**
relationship (one supplier, many products).

## Concepts in play
- A **foreign key** stores a reference to a row in another table.
- `references suppliers(id)` enforces that the reference is always valid.
- A **one-to-many** relationship: many products point at one supplier.

## Your SQL task
Edit **`supabase/migrations/0002_week2_suppliers.sql`**:
1. Create a `suppliers` table (`id`, unique `name`, `created_at`).
2. Add a `supplier_id` foreign key column to `products`.
3. Add a `supplier_country` text column to `products` *(a deliberate shortcut we
   fix in Week 4)*.
4. Insert a few suppliers and assign each product a supplier + country.

## Done when
- `assignments/week2/test.ts` passes (suppliers exist, the FK exists, every
  product has a supplier).
- Each product card on the homepage shows **by {supplier}**.
