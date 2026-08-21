# Module 9 — Complex SQL Queries

## Introduction

Once you can write basic `SELECT` statements, the next step is combining data from multiple tables, summarizing groups of rows, and using one query's results inside another.

### Joins

A **join** combines rows from two tables based on a related column.

```sql
-- INNER JOIN — only rows with matches in both tables
SELECT o.order_id, c.name, o.order_date
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id;

-- LEFT JOIN — all rows from the left table, matched rows from the right (NULLs where no match)
SELECT c.name, o.order_id
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id;

-- RIGHT JOIN — all rows from the right table (not all databases support this; use a reversed LEFT JOIN)
-- FULL OUTER JOIN — all rows from both tables
```

### Multi-Table Joins

You can chain joins to combine three or more tables:

```sql
SELECT o.order_id, c.name AS customer, p.name AS product, oi.quantity
FROM orders o
JOIN customers c  ON o.customer_id   = c.customer_id
JOIN order_items oi ON o.order_id    = oi.order_id
JOIN products p   ON oi.product_id   = p.product_id;
```

### Aggregate Functions and GROUP BY

```sql
-- Total revenue per customer
SELECT c.name, SUM(oi.quantity * p.price) AS total_spent
FROM customers c
JOIN orders o     ON c.customer_id   = o.customer_id
JOIN order_items oi ON o.order_id    = oi.order_id
JOIN products p   ON oi.product_id   = p.product_id
GROUP BY c.customer_id, c.name;
```

### HAVING

`HAVING` filters *groups* (after `GROUP BY`), while `WHERE` filters *rows* (before grouping).

```sql
-- Customers who have spent more than $500 in total
SELECT c.name, SUM(oi.quantity * p.price) AS total_spent
FROM customers c
JOIN orders o       ON c.customer_id   = o.customer_id
JOIN order_items oi ON o.order_id      = oi.order_id
JOIN products p     ON oi.product_id   = p.product_id
GROUP BY c.customer_id, c.name
HAVING SUM(oi.quantity * p.price) > 500;
```

### Subqueries

A **subquery** is a query nested inside another query.

```sql
-- Products priced above the average product price
SELECT name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Customers who have placed at least one order (using EXISTS)
SELECT name FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);
```

---

## Assignment

**File to create:** `module_09_complex_queries.sql`

Build a small e-commerce database:

- **customers** — `customer_id` PK, `name`, `city`
- **products** — `product_id` PK, `name`, `category`, `price` REAL
- **orders** — `order_id` PK, `customer_id` FK, `order_date` TEXT
- **order_items** — `order_item_id` PK, `order_id` FK, `product_id` FK, `quantity` INTEGER

Insert enough data (at least 5 customers, 8 products, 10 orders, 20 order_items) to make every query return meaningful results.

1. (INNER JOIN) List every order with the customer's name and order date.
2. (LEFT JOIN) List all customers and the number of orders each has placed — include customers with zero orders (show 0, not NULL, using `COALESCE`).
3. (Multi-table JOIN) List each order item with: order ID, customer name, product name, quantity, and the line total (`quantity * price`).
4. (GROUP BY) Show each product category and the total quantity sold across all orders.
5. (HAVING) List customers whose total spending across all orders exceeds $200.
6. (Subquery — scalar) List all products whose price is above the average price of all products.
7. (Subquery — EXISTS) List customers who have placed at least one order for a product in the 'Electronics' category.
