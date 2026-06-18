# Week 15 — Enterprise Applications, Analytics & Performance

The last build week: make analytical queries possible *and* fast.

## Concepts in play
- **Indexes** speed up the joins your reports run most (on foreign keys).
- An **analytics view** aggregates across the whole schema for a dashboard.

## Your SQL task
Edit **`supabase/migrations/0015_week15_analytics.sql`**:
1. Create indexes on `order_items(product_id)` and `orders(customer_id)`.
2. Create a `category_revenue` view: for each category, the total revenue
   (`sum(quantity * unit_price)` of order items for products in that category),
   highest first. Include categories with zero revenue.

## Done when
- `assignments/week15/test.ts` passes (both indexes exist, the view returns
  revenue per category sorted descending).
- A **Revenue by category** bar chart appears on the homepage — your storefront
  is now complete.
