# Storefront Database Portal

A semester-long course project for **The Design and Maintenance of Databases**.
Students build one cumulative storefront by writing SQL **directly in the
Supabase SQL editor**. Each week they run one script; when its objects exist, the
live homepage gains a feature and that week's planet on the course map unlocks.

## How it works

```
student runs SQL in the Supabase SQL editor
      │  (creates this week's tables / views / functions)
      ▼
their Supabase database changes
      │
      ▼
homepage reads the database (pg) ──► new feature appears, planet unlocks
```

- **Write SQL directly in Supabase** — no migrations, git, or CLI. Each week is
  one `solution.sql` you paste and run.
- **New objects only.** Every assignment creates *new* tables/views/functions and
  never alters an earlier week's tables (relationships use link tables; schema-
  evolution topics use that week's own sandbox tables). So if something's wrong,
  you just drop it and re-run.
- **Self-resetting scripts.** Each `solution.sql` drops its own objects first, so
  re-running *is* the retry — no migration history to untangle.
- **Unlock = real schema.** A module unlocks only when the objects its assignment
  creates actually exist in your database (probed live) — nothing to fake.

## Tech stack
- Next.js (App Router) + TypeScript + Tailwind
- Supabase Postgres (read over the `pg` connection string)
- `@electric-sql/pglite` for the local preview + the instructor sanity test
- Vitest

## Repository layout
- `/assignments/<week>` — `INSTRUCTIONS.md` + `solution.sql` (the SQL students run)
- `/lib/db.ts` — reads the live DB (`SUPABASE_DB_URL`), or seeds a local
  in-process Postgres from the reference solutions for preview/tests
- `/lib/weeks.ts` — the 16-week schedule + each week's live-DB unlock probe
- `/lib/progress.ts`, `/lib/store-data.ts` — probe results + storefront data
- `/app`, `/components` — the orbital course map (`/`), storefront dashboard
  (`/dashboard`), and per-week detail pages (`/week/[slug]`)

## Weekly schedule
| Week | Topic | Creates | Homepage |
|---|---|---|---|
| 0 | Setup & deploy | `store_settings` | Store name |
| 1 | Relational foundations | `products` | Product cards |
| 2 | Data modeling | `suppliers` + `product_suppliers` link | Supplier per card |
| 3 | ERDs & business rules | `categories` + junction + CHECK | Category chips |
| 4 | Normalization | `catalog_import` → `nf_brands` + `nf_catalog` | Normalization panel |
| 5 | Keys & constraints | `customers` + `customer_addresses` | (feeds stats) |
| 6 | Review 1 | a supplier-catalog view | — |
| 7 | Test 1 | assessed views | — |
| 8 | SELECT/INSERT/UPDATE/DELETE | `orders` + `order_items` | (feeds history) |
| 9 | Filtering & aggregation | `store_stats` view | Stats bar |
| 10 | Joins | `order_history` view | Order history |
| 11 | Review 2 | a top-sellers view | — |
| 12 | Test 2 | assessed views | — |
| 13 | Transactions | `place_order` function + sandbox tables | (checkout demo) |
| 14 | Security | RLS table + `public_catalog` view | Security panel |
| 15 | Analytics & performance | `category_revenue` + materialized view | Revenue chart |
| 16 | Review 3 / Test 3 / Final | capstone views | Full demo |

## Student setup (Week 0)
1. Create a Supabase project.
2. Import the repo into Vercel and set `SUPABASE_DB_URL` (see `.env.example`).
3. Each week: open the Supabase SQL editor, run that week's `solution.sql`, and
   watch the homepage. Made a mistake? Fix the SQL and run it again.

## Local development
```bash
npm install
npm run dev    # homepage runs the reference solutions locally if SUPABASE_DB_URL is unset
npm run test   # instructor sanity check: seeds a local DB and verifies every probe
npm run build
```

## Note for instructors
The `solution.sql` files are **reference answers**, so the template renders fully
and `npm run test` is green. To distribute to students, replace each script body
with a TODO stub (the `INSTRUCTIONS.md` already describes the task); the live-DB
probes in `lib/weeks.ts` define what "done" means.
