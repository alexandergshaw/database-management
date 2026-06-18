-- Final — Q1: revenue per category, highest first.
-- Columns: category, revenue.

select category, revenue
from category_revenue
order by revenue desc, category;
