-- Week 4 — Normalization (1NF → 3NF)
-- Problem: products.supplier_country (added in Week 2) is a transitive
-- dependency. A product's country depends on its supplier, not on the product
-- itself — that violates 3NF and means the same country is duplicated across
-- every product from a supplier.
--
-- Fix: move country onto the suppliers table where it belongs, backfill it from
-- the existing data, then drop the redundant column from products.

alter table suppliers
  add column if not exists country text;

update suppliers s
set country = sub.supplier_country
from (
  select distinct supplier_id, supplier_country
  from products
  where supplier_id is not null and supplier_country is not null
) sub
where s.id = sub.supplier_id;

alter table products
  drop column if exists supplier_country;
