# Week 10 — Joins & Multi-Table Queries

An order row stores IDs, not names. To show "Ben Cole spent $103" you must
**join** orders to customers and to their line items, then aggregate.

## Concepts in play
- `join` to combine rows across tables on a key.
- `group by` with aggregates to roll line items up into an order total.

## Your SQL task
Edit **`supabase/migrations/0010_week10_order_history.sql`** and create an
`order_history` view with one row per order: `id`, `status`, `created_at`,
`customer` (full name), `customer_email`, `item_count` (sum of quantities), and
`total` (sum of `quantity * unit_price`). Order newest first.

## Done when
- `assignments/week10/test.ts` passes (the view joins to customer names and
  totals each order correctly).
- An **Order history** table appears on the homepage, and Review 2 unlocks.
