-- Week 0 — Catalog settings. Run in the Supabase SQL editor.
-- Re-running is always safe: it drops the table first.

drop table if exists catalog_settings cascade;

create table catalog_settings (
  id uuid primary key default gen_random_uuid(),
  catalog_name text not null,
  tagline text not null,
  created_at timestamptz not null default now()
);

insert into catalog_settings (catalog_name, tagline)
values ('Kepler Observatory', 'Cataloguing the worlds of our solar system.');
