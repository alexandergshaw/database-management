-- Week 14 — Security: an RLS-protected table of private data, and a public view
-- that exposes only safe product columns.

drop table if exists customer_pii cascade;

create table customer_pii (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  tax_id text not null
);
insert into customer_pii (email, tax_id) values
  ('ana.ramirez@example.com', '000-00-0001');

alter table customer_pii enable row level security;

create policy customer_pii_service_read
  on customer_pii for select
  to service_role
  using (true);

create or replace view public_catalog as
select id, name, description, price
from products;

grant select on public_catalog to anon;
