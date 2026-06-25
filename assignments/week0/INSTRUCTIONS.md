# Week 0 — Setup & Deploy

Over the semester you build one storefront by writing SQL **directly in
Supabase**. Each week you run one script; when its objects exist, the matching
planet on the course map lights up and a homepage feature appears.

## Set up
1. Create a Supabase project.
2. Import this repo into Vercel and set `SUPABASE_DB_URL` (Supabase → Project
   Settings → Database → Connection string) so your homepage reads your database.

## Your SQL task
Open the **Supabase SQL editor**, paste the contents of
`assignments/week0/starter.sql`, and run it. It creates a `store_settings`
table and inserts your store's name and tagline — change them to your own.

## Done when
- The homepage header shows your store name.
- The Week 0 planet is **Unlocked**.

---

**Retry anytime:** fix your SQL and run the script again — it drops its own
objects first, so re-running is the reset. To clear one object by hand:
`drop table if exists <name> cascade;`.
