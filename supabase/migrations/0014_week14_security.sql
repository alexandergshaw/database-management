-- Week 14 — Security, Access Control & Data Protection
-- Goal: lock down sensitive data and expose only what's safe.
--   * Enable Row-Level Security on customers. With RLS on and no policy granting
--     the public `anon` role access, customer rows are no longer readable
--     through the public API — they're protected.
--   * Give the trusted `service_role` an explicit read policy.
--   * Publish a public_catalog view exposing only safe product columns, and
--     grant the public role SELECT on it.

alter table customers enable row level security;

create policy customers_service_read
  on customers for select
  to service_role
  using (true);

create or replace view public_catalog as
select id, name, description, price
from products;

grant select on public_catalog to anon;
