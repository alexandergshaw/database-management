# Week 7 — Test 1

Assessed querying over the schema from Weeks 1–5. Two questions, each in its own
file.

## Your SQL task
1. **`assignments/test1/q1_products_per_category.sql`** — how many products are
   in each category? Include categories with zero products. Columns: `category`,
   `products`.
2. **`assignments/test1/q2_inventory_value.sql`** — total value of inventory on
   hand (price × stock, summed). Column: `inventory_value`.

## How it's graded
`assignments/test1/test.ts` runs each query against the database (built through
Week 5) and checks the answers.

---

**If it fails:** Do not merge a broken PR. Close it and start a fresh branch from `main` (production only updates on merge). Rebuild a dirtied database with `npm run db:reset`, or start this week over with `npm run reset:week -- <folder>`. See "Recovering from a failed assignment" in the README.
