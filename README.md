# Storefront Database Portal

A semester-long course project for **The Design and Maintenance of Databases**.
Students build one cumulative storefront **entirely in SQL**. Each week they
write a single Supabase migration; when it's pushed, the live homepage gains a
new feature and that week's tests pass.

## How it works

```
student edits  supabase/migrations/000N_weekN_*.sql      (the only file they write — pure SQL)
      │ commit + push / open PR
      ▼
Supabase applies the migration  ─────────────►  live Postgres schema + data change
      │                                                  │
      ▼                                                  ▼
Vercel redeploys  ───────────────────────────►  homepage reads the DB, new feature appears
      │
      ▼
Vitest test.ts  ──►  replays migrations 0…N into in-process Postgres (pglite) and asserts
```

- **Students write only SQL.** Each week's editable file is one migration under
  `supabase/migrations/` (or, for reviews/tests, a `.sql` query file).
- **Cumulative.** Week N's migration runs on top of weeks 0…N-1. A wrong earlier
  schema breaks later weeks — referential integrity, learned the hard way.
- **Visible.** The homepage renders whatever the SQL produced; completing a week
  lights up a new panel.
- **Verifiable.** `test.ts` runs the real SQL against real Postgres (`pglite`,
  no Docker) and asserts on schema + data. Completion can't be faked.

## Tech stack
- Next.js (App Router) + TypeScript + Tailwind
- Supabase Postgres, driven by migrations (`supabase/migrations/`)
- `pg` for the live homepage read; `@electric-sql/pglite` for tests + local preview
- Vitest

## Repository layout
- `/supabase/migrations` — the SQL students write, applied by Supabase on push
- `/assignments/weekN` — `INSTRUCTIONS.md` + `test.ts` for each week (provided)
- `/lib/migrations-harness.ts` — replays migrations into pglite for tests/preview
- `/lib/store-data.ts` — reads the storefront (live Supabase, or local migrations)
- `/lib/course-modules.ts` — the 16-week schedule + per-week "is it live?" probes
- `/app`, `/components` — the homepage and its panels

## Weekly schedule
| Week | Topic | Builds | Homepage |
|---|---|---|---|
| 0 | Setup & deploy | `store_settings` | Store name |
| 1 | Relational foundations | `products` | Product cards |
| 2 | Data modeling | `suppliers` (1:M) | Supplier per card |
| 3 | ERDs & business rules | `categories` (M:N) + CHECKs | Category chips |
| 4 | Normalization | move country → suppliers (3NF) | Suppliers panel |
| 5 | Keys & constraints | `customers` | (anchors orders) |
| 6 | Review 1 | query exercise | — |
| 7 | Test 1 | assessed queries | — |
| 8 | SELECT/INSERT/UPDATE/DELETE | `orders`, `order_items` | Recent orders |
| 9 | Filtering & aggregation | `store_stats` view | Stats bar |
| 10 | Joins | `order_history` view | Order history |
| 11 | Review 2 | query exercise | — |
| 12 | Test 2 | assessed queries | — |
| 13 | Transactions | `place_order()` function | Atomic checkout |
| 14 | Security | RLS + `public_catalog` | Security panel |
| 15 | Analytics & performance | indexes + `category_revenue` | Revenue chart |
| 16 | Review 3 / Test 3 / Final | capstone queries | Full demo |

## Student setup (Week 0)
1. Fork the repo.
2. Create a Supabase project and connect it to your fork (Supabase → Integrations
   → GitHub). Migrations under `supabase/migrations/` apply on push; each PR gets
   a **preview branch** database so a wrong migration is fixed before it reaches
   production.
3. Import the fork into Vercel and set `SUPABASE_DB_URL` (see `.env.example`).
4. Each week: edit the migration → run tests → open a PR → verify the preview →
   merge.

## Local development
```bash
npm install
npm run dev      # homepage replays migrations locally if SUPABASE_DB_URL is unset
npm run test     # runs every week's tests against in-process Postgres
npm run build
```

## Note for instructors
The migrations and `.sql` answer files in this repo are **reference solutions**,
so the template is green and the homepage fully renders. To distribute to
students, replace each migration/query body with a TODO stub (the `INSTRUCTIONS.md`
already describes the task); the tests stay as-is and define "done".
