# Planetary Catalog Database Portal

A semester-long course project for **The Design and Maintenance of Databases**.
Students build one cumulative **planetary catalog** (planets, moons, missions,
observations) by writing SQL **directly in the Supabase SQL editor**. Each week
they run one script; when its objects exist, the live homepage gains a feature
and that week's planet on the course map unlocks.

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
  a `starter.sql` with several small numbered TODO problems you complete and run.
- **New objects only.** Every assignment creates *new* tables/views/functions and
  never alters an earlier week's tables (relationships use link tables; schema-
  evolution topics use that week's own sandbox tables). So if something's wrong,
  drop it and re-run.
- **Self-resetting scripts.** Each script drops its own objects first, so
  re-running *is* the retry.
- **Unlock = real schema.** A module unlocks only when the objects its assignment
  creates actually exist in your database (probed live).

## Tech stack
- Next.js (App Router) + TypeScript + Tailwind
- Supabase Postgres (read over the `pg` connection string)
- `@electric-sql/pglite` for the local preview + the instructor sanity test
- Vitest

## Repository layout
- `/assignments/<week>` — `INSTRUCTIONS.md`, `starter.sql` (TODO problems
  students complete), and `solution.sql` (reference answer)
- `/lib/db.ts` — reads the live DB (`SUPABASE_DB_URL`), or seeds a local
  in-process Postgres from the reference solutions for preview/tests
- `/lib/weeks.ts` — the 16-week schedule + each week's live-DB unlock probe
- `/lib/progress.ts`, `/lib/store-data.ts` — probe results + catalog data
- `/app`, `/components` — the orbital course map (`/`), catalog dashboard
  (`/dashboard`), and per-week detail pages (`/week/[slug]`)

## Weekly schedule
| Week | Topic | Creates | Homepage |
|---|---|---|---|
| 0 | Setup & deploy | `catalog_settings` | Catalog name |
| 1 | Relational foundations | `planets` | Planet cards |
| 2 | Data modeling | `moons` (1:M to planets) | Moon counts |
| 3 | ERDs & business rules | `missions` + `mission_targets` (M:N) + CHECK | Mission chips |
| 4 | Normalization | 1NF/2NF/3NF splits (gases, instruments, stars) | Normalization panel |
| 5 | Keys & constraints | `astronomers` + `astronomer_sites` | (feeds stats) |
| 6 | Review 1 | views over weeks 1-5 | — |
| 7 | Test 1 | assessed views | — |
| 8 | SELECT/INSERT/UPDATE/DELETE | `observations` | (feeds log) |
| 9 | Filtering & aggregation | `catalog_stats` + `inner_planets` | Stats bar |
| 10 | Joins | `observation_log` (+ LEFT JOIN view) | Observation log |
| 11 | Review 2 | views over weeks 8-10 | — |
| 12 | Test 2 | assessed views | — |
| 13 | Transactions | `book_nights` function + sandbox tables | (booking demo) |
| 14 | Security | RLS table + `public_catalog` view | Security panel |
| 15 | Analytics & performance | `type_summary` + materialized view | Planets-by-type chart |
| 16 | Review 3 / Test 3 / Final | capstone views | Full demo |

## Student setup (Week 0)
1. Create a Supabase project.
2. Import the repo into Vercel and set `SUPABASE_DB_URL` (see `.env.example`).
3. Each week: open that week's `starter.sql`, complete the numbered TODO
   problems, and run the whole script in the Supabase SQL editor. Made a mistake?
   Fix it and run again (the script drops its own objects first).

## Local development
```bash
npm install
npm run dev    # homepage runs the reference solutions locally if SUPABASE_DB_URL is unset
npm run test   # instructor sanity check: seeds a local DB and verifies every probe
npm run build
```

## Note for instructors
Each week ships two SQL files:
- `starter.sql` — what students complete: several small numbered TODO problems.
- `solution.sql` — the reference answer. It seeds the local preview and the
  `npm run test` sanity check (which confirms every probe unlocks), so the
  template stays green and demoable.

The live-DB probes in `lib/weeks.ts` define what "done" means. To hand the repo
to students, delete the `solution.sql` files (and they fill in the starters);
keep them on an instructor branch as the answer key.
