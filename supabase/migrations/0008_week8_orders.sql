-- Week 8 — SQL Fundamentals: orders (INSERT / UPDATE / DELETE)
-- Goal: practice the core write operations against a realistic order schema.
--   * CREATE the orders + order_items tables (referential integrity to
--     customers and products)
--   * INSERT a few orders with line items
--   * UPDATE product stock to reflect what was sold
--   * DELETE a cancelled order

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  status text not null default 'paid',
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  quantity integer not null check (quantity > 0),
  unit_price numeric(10, 2) not null check (unit_price >= 0),
  primary key (order_id, product_id)
);

-- INSERT: Ana buys a daypack.
with new_order as (
  insert into orders (customer_id, status)
  select id, 'paid' from customers where email = 'ana.ramirez@example.com'
  returning id
)
insert into order_items (order_id, product_id, quantity, unit_price)
select n.id, p.id, 1, p.price
from new_order n
join products p on p.name = 'Trail Daypack 22L';

-- INSERT: Ben buys a bottle and three pairs of socks.
with new_order as (
  insert into orders (customer_id, status)
  select id, 'paid' from customers where email = 'ben.cole@example.com'
  returning id
)
insert into order_items (order_id, product_id, quantity, unit_price)
select n.id, p.id, line.quantity, p.price
from new_order n
join (values ('Insulated Water Bottle', 2), ('Merino Wool Socks', 3)) as line(name, quantity)
  on true
join products p on p.name = line.name;

-- INSERT: a cancelled order we will DELETE below.
with new_order as (
  insert into orders (customer_id, status)
  select id, 'cancelled' from customers where email = 'chiara.rossi@example.com'
  returning id
)
insert into order_items (order_id, product_id, quantity, unit_price)
select n.id, p.id, 1, p.price
from new_order n
join products p on p.name = 'Packable Rain Jacket';

-- UPDATE: decrement stock for everything sold on a non-cancelled order.
update products p
set stock_count = stock_count - sold.quantity
from (
  select oi.product_id, sum(oi.quantity) as quantity
  from order_items oi
  join orders o on o.id = oi.order_id
  where o.status <> 'cancelled'
  group by oi.product_id
) sold
where p.id = sold.product_id;

-- DELETE: remove the cancelled order (its line items cascade away).
delete from orders where status = 'cancelled';
