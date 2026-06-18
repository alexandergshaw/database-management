# Week 11 — Review 2

Consolidates Weeks 8–10 (writing data, aggregation, joins). A **query**
exercise over the order data you created.

## Your SQL task
Edit **`assignments/review2/query.sql`**: rank the best-selling products by total
units sold, highest first. Only include products that have actually sold.
Columns: `product`, `units_sold`.

## How it's graded
`assignments/review2/test.ts` runs your query against the database (built through
Week 10) and checks the ranking.

## More practice (not graded)
- Total revenue per category.
- Average order value across all orders.

---

**If it fails:** Do not merge a broken PR. Close it and start a fresh branch from `main` (production only updates on merge). Rebuild a dirtied database with `npm run db:reset`, or start this week over with `npm run reset:week -- <folder>`. See "Recovering from a failed assignment" in the README.
