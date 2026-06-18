-- Final — Q2: which products are running low (fewer than 50 in stock), and who
-- supplies them? Lowest stock first. Columns: product, stock_count, supplier.

select p.name as product, p.stock_count, s.name as supplier
from products p
join suppliers s on s.id = p.supplier_id
where p.stock_count < 50
order by p.stock_count;
