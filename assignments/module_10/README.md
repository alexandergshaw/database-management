# Module 10 — Views and Indexes

## Introduction

As databases grow, two challenges emerge: queries become complex and repetitive, and query performance degrades on large tables. **Views** and **indexes** are the primary tools SQL provides to address both problems.

### Advanced Subqueries

Before tackling views, it helps to understand two advanced subquery patterns:

**Correlated subquery** — the inner query references a column from the outer query and re-runs for each outer row:

```sql
-- For each product, show how many times it has been ordered
SELECT p.name,
       (SELECT COUNT(*) FROM order_items oi WHERE oi.product_id = p.product_id) AS order_count
FROM products p;
```

**Subquery in FROM (derived table):**

```sql
SELECT dept, avg_salary
FROM (
    SELECT department AS dept, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department
) AS dept_averages
WHERE avg_salary > 60000;
```

### Database Views

A **view** is a saved SQL query that behaves like a virtual table. You query it just like a real table, but the underlying query runs on demand.

```sql
-- Create a view
CREATE VIEW high_value_orders AS
SELECT o.order_id, c.name AS customer, SUM(oi.quantity * p.price) AS total
FROM orders o
JOIN customers  c  ON o.customer_id   = c.customer_id
JOIN order_items oi ON o.order_id     = oi.order_id
JOIN products   p  ON oi.product_id   = p.product_id
GROUP BY o.order_id, c.name
HAVING SUM(oi.quantity * p.price) > 100;

-- Use the view like a table
SELECT * FROM high_value_orders ORDER BY total DESC;

-- Drop a view
DROP VIEW IF EXISTS high_value_orders;
```

**Benefits of views:**
- Simplify complex, repeated queries.
- Provide a security layer (grant access to a view, not the underlying tables).
- Present data in a form tailored to an application without duplicating it.

### Single-Column Indexes

```sql
-- Speed up lookups by customer_id
CREATE INDEX idx_orders_customer ON orders(customer_id);
```

### Composite Indexes

A composite index covers multiple columns. Most effective when queries filter on the *leading* columns of the index.

```sql
CREATE INDEX idx_order_items_order_product ON order_items(order_id, product_id);
```

### Introductory Query Optimization

- **Choose selective columns for indexes** — index columns used in `WHERE`, `JOIN ON`, and `ORDER BY`.
- **Avoid functions on indexed columns** — `WHERE UPPER(name) = 'ALICE'` cannot use an index on `name`.
- **Use `EXPLAIN QUERY PLAN`** (SQLite) or `EXPLAIN` / `EXPLAIN ANALYZE` (PostgreSQL) to see how the database executes a query.

```sql
EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE customer_id = 5;
```

---

## Assignment

**File to create:** `module_10_views_indexes.sql`

Reuse or recreate the e-commerce schema from Module 9 (customers, products, orders, order_items). Insert enough data to make queries meaningful.

1. **(View)** Create a view called `customer_order_summary` that shows, for each customer: `customer_id`, `name`, total number of orders, and total amount spent.
2. **(View usage)** Query `customer_order_summary` to find customers who have spent more than $100.
3. **(Correlated subquery)** Write a query (without using the view) that lists each product's name and the total quantity ever ordered, using a correlated subquery.
4. **(Derived table)** Write a query using a subquery in the `FROM` clause to find the product category with the highest average price.
5. **(Index)** Create an appropriate index to speed up lookups on `orders.customer_id`. Explain in a comment why this index helps.
6. **(Composite index)** Create a composite index on `order_items(order_id, product_id)`. Explain in a comment when this index is most beneficial.
7. **(EXPLAIN)** Run `EXPLAIN QUERY PLAN` (or your database's equivalent) on the query from task 2 and paste the output as a SQL comment. Then create an index that would improve the plan and run `EXPLAIN QUERY PLAN` again to show the improvement.
