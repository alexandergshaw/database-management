-- Week 0 — paste this into the Supabase SQL editor and run it.
-- Re-running is always safe: it drops its own table first, then recreates it.

drop table if exists store_settings cascade;

create table store_settings (
  id uuid primary key default gen_random_uuid(),
  store_name text not null,
  tagline text not null,
  created_at timestamptz not null default now()
);

insert into store_settings (store_name, tagline)
values ('Northwind Outfitters', 'Gear for everywhere you''re headed.');
