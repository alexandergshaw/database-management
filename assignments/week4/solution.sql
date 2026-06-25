-- Week 4 — Normalization (1NF -> 3NF) on tables you create this week.
-- catalog_import is denormalized: brand_country repeats for every product of a
-- brand (it depends on the brand, not the product — a 3NF violation). Split it.

drop table if exists nf_catalog cascade;
drop table if exists nf_brands cascade;
drop table if exists catalog_import cascade;

create table catalog_import (
  id serial primary key,
  product text not null,
  brand text not null,
  brand_country text not null
);

insert into catalog_import (product, brand, brand_country) values
  ('Trail Daypack 22L', 'Summit', 'USA'),
  ('Trail Headlamp 300lm', 'Summit', 'USA'),
  ('Insulated Water Bottle', 'Riverbend', 'Canada'),
  ('Packable Rain Jacket', 'Riverbend', 'Canada'),
  ('Merino Wool Socks', 'Trailhead', 'New Zealand');

-- country now lives once per brand
create table nf_brands (
  id serial primary key,
  name text not null unique,
  country text not null
);
insert into nf_brands (name, country)
select distinct brand, brand_country from catalog_import;

-- products reference a brand instead of repeating its country
create table nf_catalog (
  id serial primary key,
  product text not null,
  brand_id integer not null references nf_brands(id)
);
insert into nf_catalog (product, brand_id)
select ci.product, b.id
from catalog_import ci
join nf_brands b on b.name = ci.brand;
