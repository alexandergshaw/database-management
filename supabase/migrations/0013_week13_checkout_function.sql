-- Week 13 — Transactions & Concurrency
-- Goal: make "place an order" a single atomic operation. Either the order, its
-- line item, and the stock decrement all happen, or none of them do. The
-- function also guards against overselling and locks the product row it touches
-- (FOR UPDATE) so two concurrent checkouts can't both spend the last unit.

create or replace function place_order(
  p_customer_id uuid,
  p_product_id uuid,
  p_quantity integer
) returns uuid
language plpgsql
as $$
declare
  v_order_id uuid;
  v_stock integer;
  v_price numeric(10, 2);
begin
  if p_quantity <= 0 then
    raise exception 'quantity must be positive';
  end if;

  select stock_count, price into v_stock, v_price
  from products
  where id = p_product_id
  for update;

  if v_stock is null then
    raise exception 'product % does not exist', p_product_id;
  end if;

  if v_stock < p_quantity then
    raise exception 'insufficient stock: % requested, % available', p_quantity, v_stock;
  end if;

  insert into orders (customer_id, status)
  values (p_customer_id, 'paid')
  returning id into v_order_id;

  insert into order_items (order_id, product_id, quantity, unit_price)
  values (v_order_id, p_product_id, p_quantity, v_price);

  update products
  set stock_count = stock_count - p_quantity
  where id = p_product_id;

  return v_order_id;
end;
$$;

-- Demonstrate it: Deepa checks out one headlamp through the transaction.
select place_order(
  (select id from customers where email = 'deepa.nair@example.com'),
  (select id from products where name = 'Trail Headlamp 300lm'),
  1
);
