# Week 0 — Setup & Deploy

Welcome! This semester you'll build a **planetary catalog** one small SQL script
at a time. You never need a command line — you paste SQL into the **Supabase SQL
editor** and press **Run**. Each week, when your SQL creates the right things, a
new part of the homepage lights up and that week's planet on the course map
unlocks.

## What you'll do this week
Connect the tools, then run your very first table and row.

### 1) Connect the tools
1. Create a free **Supabase** project — this is your database.
2. Import this repo into **Vercel** and add the `SUPABASE_DB_URL` value from
   `.env.example` (find it in Supabase → Project Settings → Database → Connection
   string). That's what lets the website read your database.

### 2) Your SQL task
Open `assignments/week00/starter.sql`, fill in the two TODOs, and run the whole
file in the Supabase SQL editor.

## The idea: a table and a row
A **table** is like a spreadsheet: the **columns** are the fields and each **row**
is one record. You add rows with an **INSERT**. Here's the shape using a
*different* example (an app's settings) so you can see how it looks — yours will
be about your catalog:

```sql
-- Example only — NOT the answer:
create table app_settings (
  id uuid primary key default gen_random_uuid(),   -- a unique id, made for you
  app_name text not null,                          -- text that must be filled in
  created_at timestamptz not null default now()    -- defaults to "right now"
);

insert into app_settings (app_name) values ('My Cool App');
```

Your job uses the same pattern for a `catalog_settings` table holding your
observatory's name and tagline.

## Watch & learn
- **Connect Supabase (video):** [Getting started with Supabase](https://www.youtube.com/watch?v=i_bPeTZVlg0) · [Find your Supabase connection string](https://www.youtube.com/watch?v=LzOdTIZOnaM)
- **Deploy to Vercel (video):** [Deploy a Next.js app to Vercel from GitHub](https://www.youtube.com/watch?v=MoQ6g3pmXtA)
- **Learn SQL (video):** [SQL Tutorial – Full Course for Beginners (freeCodeCamp)](https://www.youtube.com/watch?v=HXV3zeQKqGY) — bookmark this; it covers most of the semester.
- **Tutorial:** [Supabase — using the SQL editor](https://supabase.com/docs/guides/database/overview) · [W3Schools — SQL intro](https://www.w3schools.com/sql/)

## Done when
- The homepage header shows your catalog's name.
- The Week 0 planet is **Unlocked**.

## Made a mistake?
No problem — fix your SQL and run the file again. It clears its own table first,
so re-running is always safe.
