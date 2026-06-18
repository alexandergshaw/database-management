# Week 13 — Advanced Design: Transactions & Concurrency

Placing an order is really three steps: create the order, add the line item, and
decrement stock. If any step fails, none should stick. That's a **transaction** —
all or nothing.

## Concepts in play
- A `plpgsql` function whose body runs as a single transaction.
- `SELECT ... FOR UPDATE` locks the product row so two concurrent checkouts
  can't both spend the last unit (concurrency control).
- `RAISE EXCEPTION` aborts and rolls back the whole operation.

## Your SQL task
Edit **`supabase/migrations/0013_week13_checkout_function.sql`** and create a
`place_order(p_customer_id uuid, p_product_id uuid, p_quantity integer)`
function that:
1. Locks the product row and reads its stock + price.
2. Raises an exception if stock is insufficient (no overselling).
3. Inserts the order and its line item, decrements stock, and returns the new
   order id.

## Done when
- `assignments/week13/test.ts` passes (the function exists, decrements stock
  atomically, and refuses to oversell — leaving no partial writes).
- The homepage marks **atomic checkout** as enabled.

---

**If it fails:** Do not merge a broken PR. Close it and start a fresh branch from `main` (production only updates on merge). Rebuild a dirtied database with `npm run db:reset`, or start this week over with `npm run reset:week -- <folder>`. See "Recovering from a failed assignment" in the README.
