-- Week 4 — Normalization. Fix three denormalized tables — one per normal form.

-- ---- 1NF: atomic values (no comma-separated lists) ----
drop table if exists product_tags cascade;
drop table if exists tag_import cascade;
create table tag_import (product text not null, tags text not null);
insert into tag_import (product, tags) values
  ('Trail Daypack 22L', 'hiking,daypack,outdoor'),
  ('Merino Wool Socks', 'apparel,hiking');
-- Problem 1 — create product_tags(product, tag) with one row per tag, and fill
-- it from tag_import. Tip: unnest(string_to_array(tags, ',')).
-- TODO:


-- ---- 2NF: no partial dependency on part of a composite key ----
drop table if exists supply_lines cascade;
drop table if exists supply_items cascade;
-- Problem 2 — item names depend only on sku, not on (order_no, sku). Create
-- supply_items(sku primary key, item_name) and supply_lines(order_no, sku
-- references supply_items, qty, primary key (order_no, sku)); add a few rows.
-- TODO:


-- ---- 3NF: no transitive dependency (non-key -> non-key) ----
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
-- Problem 3 — brand_country depends on brand, not product. Create
-- nf_brands(id, name unique, country) from the DISTINCT brand + country, and
-- nf_catalog(id, product, brand_id references nf_brands) referencing it.
-- TODO:
