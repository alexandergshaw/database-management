# Week 0 — Setup & Deploy

Over the semester you build a **planetary catalog** by writing SQL directly in
Supabase. Each week you run one script; when its objects exist, the matching
planet on the course map lights up and a homepage feature appears.

## Set up
1. Create a Supabase project.
2. Import this repo into Vercel and set `SUPABASE_DB_URL` (Supabase → Project
   Settings → Database → Connection string) so your homepage reads your database.

## Your SQL task
Open and complete `assignments/week0/starter.sql` in the Supabase SQL editor: a
`catalog_settings` table plus one row with your observatory's name and tagline.

## Done when
- The homepage header shows your catalog name.
- The Week 0 planet is **Unlocked**.

---

**Retry anytime:** fix your SQL and run the script again — it drops its own
objects first. Clear one by hand with `drop table if exists <name> cascade;`.
