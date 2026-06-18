# Week 8 — SQL Fundamentals: SELECT, INSERT, UPDATE, DELETE

You have products and customers — now record sales. This is the week you
exercise all four core write operations against a real order schema.

## Your SQL task
Edit **`supabase/migrations/0008_week8_orders.sql`**:
1. Create `orders` (references `customers`) and `order_items` (references
   `orders` and `products`, with a `CHECK (quantity > 0)`).
2. **INSERT** a couple of paid orders with line items.
3. **UPDATE** product `stock_count` to subtract what was sold.
4. **DELETE** a cancelled order (its line items cascade away).

> Tip: use a CTE with `RETURNING` to insert an order and its items together —
> `with new_order as (insert into orders (...) ... returning id) insert into
> order_items select ...`.

## Done when
- `assignments/week8/test.ts` passes (tables exist, paid orders inserted, the
  cancelled order deleted, stock updated to match sales).
- A **Recent orders / stats** view of activity appears on the homepage.
