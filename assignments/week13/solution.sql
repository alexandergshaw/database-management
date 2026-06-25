-- Week 13 — Transactions & concurrency, on a telescope-booking sandbox.
-- book_nights is atomic: the booking and the decrement happen together or not at
-- all, and FOR UPDATE locks the row so two bookings can't oversubscribe a scope.

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

-- Demonstrate it.
select book_nights('HUBBLE', 2);
