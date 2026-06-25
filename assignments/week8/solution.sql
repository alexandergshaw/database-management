-- Week 8 — Orders: practice all four DML verbs on tables you own here.
-- (We don't touch products; stock-on-hand is computed by a later view.)

drop table if exists order_items cascade;
drop table if exists orders cascade;

create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  status text not null default 'paid',
  created_at timestamptz not null default now()
);

create table order_items (
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  quantity integer not null check (quantity > 0),
  unit_price numeric(10, 2) not null check (unit_price >= 0),
  primary key (order_id, product_id)
);

-- INSERT: Ana buys a daypack.
with o as (
  insert into orders (customer_id)
  select id from customers where email = 'ana.ramirez@example.com'
  returning id
)
insert into order_items (order_id, product_id, quantity, unit_price)
select o.id, p.id, 1, p.price from o, products p where p.name = 'Trail Daypack 22L';

-- INSERT: Ben buys a bottle and three pairs of socks.
with o as (
  insert into orders (customer_id)
  select id from customers where email = 'ben.cole@example.com'
  returning id
)
insert into order_items (order_id, product_id, quantity, unit_price)
select o.id, p.id, line.qty, p.price
from o
join (values ('Insulated Water Bottle', 2), ('Merino Wool Socks', 3)) as line(name, qty) on true
join products p on p.name = line.name;

-- INSERT a cancelled order we will DELETE.
with o as (
  insert into orders (customer_id, status)
  select id, 'cancelled' from customers where email = 'chiara.rossi@example.com'
  returning id
)
insert into order_items (order_id, product_id, quantity, unit_price)
select o.id, p.id, 1, p.price from o, products p where p.name = 'Packable Rain Jacket';

-- UPDATE the paid orders, then DELETE the cancelled one.
update orders set status = 'fulfilled' where status = 'paid';
delete from orders where status = 'cancelled';

-- SELECT: read back the orders that remain.
select id, status, created_at from orders order by created_at;
