-- Week 4 — Normalization (1NF -> 3NF) on tables you create this week.

drop table if exists nf_catalog cascade;
drop table if exists nf_brands cascade;
drop table if exists catalog_import cascade;

-- Problem 1 — create a denormalized import table and add a few rows where the
-- same brand_country repeats for every product of a brand:
--   catalog_import(id serial pk, product text, brand text, brand_country text)
-- TODO: create it, then insert 4-5 rows (reuse brands so country repeats).


-- Problem 2 — create nf_brands so each brand's country is stored ONCE:
--   nf_brands(id serial pk, name text unique not null, country text not null)
-- Then populate it from the DISTINCT brand + brand_country in catalog_import.
-- TODO:


-- Problem 3 — create nf_catalog that references a brand instead of repeating its
-- country: nf_catalog(id serial pk, product text not null,
--                     brand_id integer not null references nf_brands(id))
-- Then populate it by joining catalog_import to nf_brands on the brand name.
-- TODO:
