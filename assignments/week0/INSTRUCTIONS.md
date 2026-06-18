# Week 0 — Setup & Deploy

Welcome to **The Design and Maintenance of Databases**. Over the semester you'll
build one storefront, one SQL migration at a time. Every migration you push
changes the live homepage.

## What you'll set up
1. **Fork** this repository to your GitHub account.
2. **Create a Supabase project** and link it to your fork (Supabase → Project
   Settings → Integrations → GitHub). With the integration on, every push that
   adds a file under `supabase/migrations/` is applied to your database, and
   every pull request gets its own **preview branch** database — so if a
   migration is wrong, you fix it on the PR before it ever reaches production.
3. **Import the fork into Vercel** and add the environment variables from
   `.env.example` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).

## Your SQL task
Open **`supabase/migrations/0000_week0_store_settings.sql`** — the only file you
edit this week. Create a `store_settings` table and insert **one row** with your
own store name and tagline.

## Workflow (every week looks like this)
1. Edit the week's migration file under `supabase/migrations/`.
2. Run the tests for this week and confirm they pass (Testing panel, or
   `npm run test`).
3. Commit and open a pull request — the Supabase preview branch applies your
   migration to a fresh database.
4. Check the Vercel preview: your store name should appear at the top of the
   homepage.
5. Merge. Production updates and the feature is live.

## Done when
- `assignments/week0/test.ts` passes.
- The homepage header shows **your** store name and tagline (not the starter
  values).
