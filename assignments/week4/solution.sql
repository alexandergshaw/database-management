-- Week 4 — Normalization: one fix per normal form, all on tables created here.

-- ---- 1NF: atomic values (no comma-separated lists) ----
drop table if exists product_tags cascade;
drop table if exists tag_import cascade;
create table tag_import (product text not null, tags text not null);
insert into tag_import (product, tags) values
  ('Trail Daypack 22L', 'hiking,daypack,outdoor'),
  ('Merino Wool Socks', 'apparel,hiking');
create table product_tags (product text not null, tag text not null, primary key (product, tag));
insert into product_tags (product, tag)
select product, trim(t) from tag_import, unnest(string_to_array(tags, ',')) as t;

-- ---- 2NF: no partial dependency on part of a composite key ----
-- (order_no, sku) is the key, but item_name depends only on sku.
drop table if exists supply_lines cascade;
drop table if exists supply_items cascade;
create table supply_items (sku text primary key, item_name text not null);
insert into supply_items (sku, item_name) values ('DP', 'Daypack'), ('SK', 'Socks');
create table supply_lines (
  order_no integer not null,
  sku text not null references supply_items(sku),
  qty integer not null,
  primary key (order_no, sku)
);
insert into supply_lines (order_no, sku, qty) values (1, 'DP', 2), (1, 'SK', 5), (2, 'DP', 1);

-- ---- 3NF: no transitive dependency (non-key -> non-key) ----
-- brand_country depends on brand, not on the product.
drop table if exists nf_catalog cascade;
drop table if exists nf_brands cascade;
drop table if exists catalog_import cascade;
create table catalog_import (id serial primary key, product text not null, brand text not null, brand_country text not null);
insert into catalog_import (product, brand, brand_country) values
  ('Trail Daypack 22L', 'Summit', 'USA'),
  ('Trail Headlamp 300lm', 'Summit', 'USA'),
  ('Insulated Water Bottle', 'Riverbend', 'Canada'),
  ('Packable Rain Jacket', 'Riverbend', 'Canada'),
  ('Merino Wool Socks', 'Trailhead', 'New Zealand');
create table nf_brands (id serial primary key, name text not null unique, country text not null);
insert into nf_brands (name, country) select distinct brand, brand_country from catalog_import;
create table nf_catalog (id serial primary key, product text not null, brand_id integer not null references nf_brands(id));
insert into nf_catalog (product, brand_id)
select ci.product, b.id from catalog_import ci join nf_brands b on b.name = ci.brand;
