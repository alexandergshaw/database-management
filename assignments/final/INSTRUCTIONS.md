# Week 16 — Final Review, Test 3 & Presentation

The capstone. Your fully assembled storefront — every panel on the homepage — is
your demo. Two assessed queries draw on the complete schema.

## Your SQL task
1. **`assignments/final/q1_category_revenue.sql`** — revenue per category,
   highest first. Columns: `category`, `revenue`.
2. **`assignments/final/q2_low_stock.sql`** — products with fewer than 50 units
   in stock and who supplies them, lowest stock first. Columns: `product`,
   `stock_count`, `supplier`.

## How it's graded
`assignments/final/test.ts` runs each query against the database (built through
Week 15) and checks the answers.

## Presentation checklist
- Walk through the homepage and name the migration behind each section.
- Show one migration's SQL and the test that proves it.
- Explain one design decision (a normalization fix, a constraint, the
  transaction) and why it matters.

---

**If it fails:** Do not merge a broken PR. Close it and start a fresh branch from `main` (production only updates on merge). Rebuild a dirtied database with `npm run db:reset`, or start this week over with `npm run reset:week -- <folder>`. See "Recovering from a failed assignment" in the README.
