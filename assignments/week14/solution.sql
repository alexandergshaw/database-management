-- Week 14 — Security: protect private data, publish only what's safe.

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
