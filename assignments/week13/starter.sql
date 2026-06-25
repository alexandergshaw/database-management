-- Week 13 — Transactions, on a self-contained checkout sandbox you create here.

drop table if exists tx_order_items cascade;
drop table if exists tx_orders cascade;
drop table if exists tx_inventory cascade;

-- Problem 1 — create tx_inventory and seed a couple of items:
--   tx_inventory(sku text pk, name text not null, price numeric(10,2) not null,
--                stock integer not null check (stock >= 0))
-- TODO:


-- Problem 2 — create the two order tables:
--   tx_orders(id uuid pk default gen_random_uuid(),
--             created_at timestamptz not null default now())
--   tx_order_items(order_id uuid references tx_orders(id) on delete cascade,
--                  sku text references tx_inventory(sku),
--                  quantity integer not null check (quantity > 0),
--                  primary key (order_id, sku))
-- TODO:


-- Problem 3 — write a function place_order(p_sku text, p_qty integer) that, in
-- one transaction: locks the inventory row (SELECT ... FOR UPDATE), RAISEs an
-- exception if stock is too low, inserts the order + line item, decrements
-- stock, and returns the new order id.
-- TODO: use `create or replace function place_order(...) returns uuid
--            language plpgsql as $$ ... $$;`


-- Problem 4 — call your function once to prove it works.
-- TODO: select place_order('YOUR_SKU', 1);
