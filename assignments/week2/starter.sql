-- Week 2 — Suppliers, related to products with a link (junction) table.
-- We only create NEW tables; we never change the products table.

drop table if exists product_suppliers cascade;
drop table if exists suppliers cascade;

-- Problem 1 — create the suppliers table:
--   id uuid pk default gen_random_uuid(), name text not null unique,
--   country text not null, created_at timestamptz not null default now()
-- TODO:


-- Problem 2 — create the product_suppliers link table:
--   product_id  uuid references products(id) on delete cascade
--   supplier_id uuid references suppliers(id) on delete cascade
--   primary key (product_id, supplier_id)
-- TODO:


-- Problem 3 — insert at least 3 suppliers (name, country).
-- TODO:


-- Problem 4 — link each product to a supplier in product_suppliers.
--   Tip: insert ... select p.id, s.id from products p join suppliers s on ...
-- TODO:
