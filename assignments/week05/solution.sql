-- Week 5 — Astronomers and their sites: keys, constraints, referential integrity.

drop table if exists astronomer_sites cascade;
drop table if exists astronomers cascade;

create table astronomers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text not null,
  created_at timestamptz not null default now()
);

create table astronomer_sites (
  id uuid primary key default gen_random_uuid(),
  astronomer_id uuid not null references astronomers(id) on delete cascade,
  site_name text not null,
  country text not null
);

insert into astronomers (email, full_name) values
  ('ana.ramirez@example.com', 'Ana Ramirez'),
  ('ben.cole@example.com', 'Ben Cole'),
  ('chiara.rossi@example.com', 'Chiara Rossi'),
  ('deepa.nair@example.com', 'Deepa Nair');

insert into astronomer_sites (astronomer_id, site_name, country)
select id, 'Mauna Kea', 'USA'
from astronomers where email = 'ana.ramirez@example.com';
