-- Week 13 — Transactions & concurrency, on a self-contained checkout sandbox.
-- place_order is atomic: order + line item + stock decrement all happen or none
-- do, and FOR UPDATE locks the row so two checkouts can't oversell the last unit.

drop table if exists tx_order_items cascade;
drop table if exists tx_orders cascade;
drop table if exists tx_inventory cascade;

create table tx_inventory (
  sku text primary key,
  name text not null,
  price numeric(10, 2) not null,
  stock integer not null check (stock >= 0)
);
insert into tx_inventory (sku, name, price, stock) values
  ('DAYPACK', 'Trail Daypack 22L', 79.99, 5),
  ('BOTTLE', 'Insulated Water Bottle', 24.50, 10);

create table tx_orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now()
);

create table tx_order_items (
  order_id uuid not null references tx_orders(id) on delete cascade,
  sku text not null references tx_inventory(sku),
  quantity integer not null check (quantity > 0),
  primary key (order_id, sku)
);

create or replace function place_order(p_sku text, p_qty integer)
returns uuid
language plpgsql
as $$
declare
  v_order uuid;
  v_stock integer;
begin
  if p_qty <= 0 then
    raise exception 'quantity must be positive';
  end if;

  select stock into v_stock from tx_inventory where sku = p_sku for update;
  if v_stock is null then
    raise exception 'unknown sku %', p_sku;
  end if;
  if v_stock < p_qty then
    raise exception 'insufficient stock: % requested, % available', p_qty, v_stock;
  end if;

  insert into tx_orders default values returning id into v_order;
  insert into tx_order_items (order_id, sku, quantity) values (v_order, p_sku, p_qty);
  update tx_inventory set stock = stock - p_qty where sku = p_sku;
  return v_order;
end;
$$;

-- Demonstrate it.
select place_order('DAYPACK', 1);
