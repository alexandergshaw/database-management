-- Week 8 — Observations: practice all four DML verbs on a table you own here.

drop table if exists observations cascade;

create table observations (
  id uuid primary key default gen_random_uuid(),
  astronomer_id uuid not null references astronomers(id) on delete cascade,
  planet_id uuid not null references planets(id),
  magnitude numeric(5, 2) not null,
  status text not null default 'logged',
  observed_at timestamptz not null default now()
);

-- INSERT: Ana logs Mars.
with a as (select id from astronomers where email = 'ana.ramirez@example.com')
insert into observations (astronomer_id, planet_id, magnitude)
select a.id, p.id, 1.5 from a, planets p where p.name = 'Mars';

-- INSERT: Ben logs Jupiter and Saturn.
with a as (select id from astronomers where email = 'ben.cole@example.com')
insert into observations (astronomer_id, planet_id, magnitude)
select a.id, p.id, v.mag
from a
join (values ('Jupiter', -2.0), ('Saturn', 0.5)) as v(name, mag) on true
join planets p on p.name = v.name;

-- INSERT a cancelled observation we will DELETE.
with a as (select id from astronomers where email = 'chiara.rossi@example.com')
insert into observations (astronomer_id, planet_id, magnitude, status)
select a.id, p.id, 3.0, 'cancelled' from a, planets p where p.name = 'Neptune';

-- UPDATE logged observations to confirmed, then DELETE the cancelled one.
update observations set status = 'confirmed' where status = 'logged';
delete from observations where status = 'cancelled';

-- SELECT: read back the observations that remain.
select id, magnitude, status, observed_at from observations order by observed_at;
