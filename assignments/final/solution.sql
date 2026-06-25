-- Final — capstone views drawing on the whole schema.

create or replace view final_category_revenue as
select
  c.name as category,
  coalesce(sum(oi.quantity * oi.unit_price), 0)::numeric(12, 2) as revenue
from categories c
left join product_categories pc on pc.category_id = c.id
left join order_items oi on oi.product_id = pc.product_id
group by c.name
order by revenue desc, category;

create or replace view final_low_stock as
select p.name as product, p.stock_count, s.name as supplier
from products p
left join product_suppliers ps on ps.product_id = p.id
left join suppliers s on s.id = ps.supplier_id
where p.stock_count < 50
order by p.stock_count;
