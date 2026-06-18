-- Week 0 — Store Settings
-- Goal: prove your migration pipeline works end to end.
--   You write SQL here -> commit & push -> Supabase applies this migration ->
--   the homepage reads it and shows YOUR store name.
--
-- Create a single-row settings table that names your storefront, then insert
-- one row with your store's name and tagline.

create table if not exists store_settings (
  id uuid primary key default gen_random_uuid(),
  store_name text not null,
  tagline text not null,
  created_at timestamptz not null default now()
);

insert into store_settings (store_name, tagline)
values (
  'Northwind Outfitters',
  'Gear for everywhere you''re headed.'
);
