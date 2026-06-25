-- Final — capstone views spanning weeks 13-15.

-- Analytics (week 15).
create or replace view final_category_revenue as
select
  c.name as category,
  coalesce(sum(oi.quantity * oi.unit_price), 0)::numeric(12, 2) as revenue
from categories c
left join product_categories pc on pc.category_id = c.id
left join order_items oi on oi.product_id = pc.product_id
group by c.name
order by revenue desc, category;

-- Joins + analytics (week 15): low stock with supplier.
create or replace view final_low_stock as
select p.name as product, p.stock_count, s.name as supplier
from products p
left join product_suppliers ps on ps.product_id = p.id
left join suppliers s on s.id = ps.supplier_id
where p.stock_count < 50
order by p.stock_count;

-- Transactions (week 13): what the place_order function recorded.
create or replace view final_checkout_log as
select o.id as order_id, ti.name as item, li.quantity, o.created_at
from tx_orders o
join tx_order_items li on li.order_id = o.id
join tx_inventory ti on ti.sku = li.sku
order by o.created_at;

-- Security (week 14): the safe, public-facing catalog.
create or replace view final_public_listing as
select name, price from public_catalog order by name;
