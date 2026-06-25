-- Week 11 — Transactions & Security.

-- Part A — Transactions: an atomic telescope-booking sandbox. book_nights is
-- atomic (booking + decrement happen together) and FOR UPDATE locks the row so
-- two bookings can't oversubscribe a telescope.
drop table if exists telescope_bookings cascade;
drop table if exists telescopes cascade;

create table telescopes (
  code text primary key,
  name text not null,
  available_nights integer not null check (available_nights >= 0)
);
insert into telescopes (code, name, available_nights) values
  ('HUBBLE', 'Hubble Space Telescope', 5),
  ('VLT', 'Very Large Telescope', 10);

create table telescope_bookings (
  id uuid primary key default gen_random_uuid(),
  code text not null references telescopes(code),
  nights integer not null check (nights > 0),
  created_at timestamptz not null default now()
);

create or replace function book_nights(p_code text, p_nights integer)
returns uuid
language plpgsql
as $$
declare
  v_booking uuid;
  v_available integer;
begin
  if p_nights <= 0 then
    raise exception 'nights must be positive';
  end if;
  select available_nights into v_available from telescopes where code = p_code for update;
  if v_available is null then
    raise exception 'unknown telescope %', p_code;
  end if;
  if v_available < p_nights then
    raise exception 'not enough nights: % requested, % available', p_nights, v_available;
  end if;
  insert into telescope_bookings (code, nights) values (p_code, p_nights) returning id into v_booking;
  update telescopes set available_nights = available_nights - p_nights where code = p_code;
  return v_booking;
end;
$$;

select book_nights('HUBBLE', 2);

-- Part B — Security: protect private proposals with RLS, and publish only safe
-- planet columns through a view granted to the public role.
drop table if exists proposal_secrets cascade;

create table proposal_secrets (
  id uuid primary key default gen_random_uuid(),
  pi_email text not null,
  budget_usd numeric(12, 2) not null
);
insert into proposal_secrets (pi_email, budget_usd) values
  ('ana.ramirez@example.com', 250000.00);

alter table proposal_secrets enable row level security;

create policy proposal_secrets_service_read
  on proposal_secrets for select
  to service_role
  using (true);

create or replace view public_catalog as
select name, type, radius_km, distance_au
from planets;

grant select on public_catalog to anon;
