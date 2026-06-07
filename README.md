# Enterprise Database Management Portal

Production-ready course scaffold for **The Design and Maintenance of Databases**. Students use this repository for a semester-long, full-stack Next.js project deployed to Vercel with a Supabase PostgreSQL backend.

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Supabase PostgreSQL (`schema.sql`)
- Vercel deployment
- Vitest assignment tests

## Repository Structure
- `/app` — Dashboard and week pages
- `/components` — Reusable enterprise UI components
- `/lib` — Shared logic and Supabase client
- `/assignments` — Student work folders (`assignment0` through `assignment14`, plus review/exam practice folders)
- `/schema.sql` — Supabase database bootstrap script

## Semester Schedule Mapping
- Week 1: `assignment0` (Onboarding/Setup)
- Week 2: `assignment1` (Relational Model)
- Week 3: `assignment2` (ERD Design)
- Week 4: `review1`
- Week 5: `exam1`
- Week 6: `assignment3` (DDL)
- Week 7: `assignment4` (DML)
- Week 8: `assignment5` (Advanced Queries)
- Week 9: `review2`
- Week 10: `exam2`
- Week 11: `assignment6` (Normalization)
- Week 12: `assignment7` (Indexing)
- Week 13: `assignment8` (Transactions)
- Week 14: `assignment9` (Security)
- Week 15: `review3`
- Week 16: `exam3`

`assignment10`–`assignment14` are extension labs for advanced practice.

## Assignment Folder Contract
Each assignment/review/exam folder contains:
1. `INSTRUCTIONS.md` (GUI-only workflow; no terminal commands)
2. `solution.ts` (single file students edit)
3. `test.ts` (unit tests importing only `solution.ts`)

## Dynamic Dashboard Unlock Mechanism
The dashboard imports each assignment solution dynamically and checks exported `result`:

```ts
const assignmentModule = await import(`@/assignments/${folder}/solution`);
const candidate = assignmentModule.result ?? assignmentModule.default;
```

A module unlocks when:
- `candidate` exists, and
- If it has `isComplete`, that value is `true`.

The sidebar Progress Tracker and week pages both render unlocked/locked status from this logic.

## Supabase + Vercel Setup
1. Create a Supabase project.
2. Run `schema.sql` in Supabase SQL Editor.
3. Import this repo into Vercel.
4. Add env vars from `.env.example` in Vercel Project Settings.
5. Redeploy.

## Local Development
```bash
npm install
npm run dev
```

## Testing
```bash
npm run test
```

## Linting and Build
```bash
npm run lint
npm run build
```
