# Week 5 — Table Design, Keys, Constraints, Referential Integrity

Time to add the people who buy things. Customers are the anchor that next week's
orders will reference, so getting the keys and constraints right matters.

## Concepts in play
- **Primary key** — uniquely identifies each customer.
- **UNIQUE** — no two customers share an email address.
- **NOT NULL** — required fields are always present.
- These guarantees are what later **referential integrity** depends on.

## Your SQL task
Edit **`supabase/migrations/0005_week5_customers.sql`**:
1. Create a `customers` table with `id` (primary key), `email` (UNIQUE, NOT
   NULL), `full_name` (NOT NULL), and `created_at`.
2. Insert a few customers.

## Done when
- `assignments/week5/test.ts` passes (customers exist, a duplicate email is
  rejected, a null name is rejected).
- The homepage stats include a **customer count** (once Week 9's stats view is
  live) and Review 1 unlocks.

---

**If it fails:** Do not merge a broken PR. Close it and start a fresh branch from `main` (production only updates on merge). Rebuild a dirtied database with `npm run db:reset`, or start this week over with `npm run reset:week -- <folder>`. See "Recovering from a failed assignment" in the README.
