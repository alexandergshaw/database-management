# Module 9 — Complex SQL Queries

## Going Beyond One Table

So far you've mostly worked with one table at a time. But the whole point of a relational database is that information is spread across *multiple* connected tables. Bringing those tables back together to answer real questions is where SQL gets exciting.

This module covers:
- **Joins** — the main way to combine two (or more) tables
- **Aggregate functions with GROUP BY** — summarizing groups of rows
- **HAVING** — filtering those groups
- **Subqueries** — using one query's answer inside another query

---

## Joins — Reuniting Related Data

Think of a join like a VLOOKUP in Excel, but more powerful. You have an ID number in one table, and you want to pull in matching details from another table.

### `INNER JOIN` — Only Show Rows That Match in Both Tables

This is the most common type of join. It returns rows where there is a match in *both* tables. If a customer has no orders, they don't appear. If an order references a customer that doesn't exist, it doesn't appear.

```sql
SELECT orders.order_id, customers.name, orders.order_date
FROM orders
INNER JOIN customers ON orders.customer_id = customers.customer_id;
```

Read this as: "Give me the order ID, customer name, and order date — from `orders` combined with `customers` — where the `customer_id` matches between them."

### `LEFT JOIN` — Always Show the Left Table, Even Without a Match

A left join returns every row from the *left* table (the one in the `FROM`), and fills in data from the right table where it can. If there's no match, it fills with `NULL`.

```sql
-- Show ALL customers, and how many orders each has.
-- Customers with zero orders will still appear (with NULL for order data).
SELECT customers.name, orders.order_id
FROM customers
LEFT JOIN orders ON customers.customer_id = orders.customer_id;
```

Use a left join when you want to include records even if they don't have related data in the other table. "Give me all customers, and attach their orders if they have any."

### Multi-Table Joins

You can chain as many joins as you need:

```sql
SELECT orders.order_id, customers.name, products.name, order_items.quantity
FROM orders
JOIN customers   ON orders.customer_id     = customers.customer_id
JOIN order_items ON orders.order_id        = order_items.order_id
JOIN products    ON order_items.product_id = products.product_id;
```

This is like connecting three spreadsheets together all at once.

---

## `GROUP BY` — Summarizing Groups of Rows

`GROUP BY` takes all the rows with the same value in a column and collapses them into a single summary row.

Imagine you have a thousand sales records and you want to know: "How much did each customer spend in total?" You'd group by customer and sum up their purchases.

```sql
SELECT customers.name, SUM(order_items.quantity * products.price) AS total_spent
FROM customers
JOIN orders      ON customers.customer_id  = orders.customer_id
JOIN order_items ON orders.order_id        = order_items.order_id
JOIN products    ON order_items.product_id = products.product_id
GROUP BY customers.customer_id, customers.name;
```

---

## `HAVING` — Filtering After You've Grouped

`WHERE` filters rows *before* grouping. `HAVING` filters groups *after* grouping.

Think of it this way: `WHERE` is the bouncer who checks IDs at the door before anyone gets in. `HAVING` is the manager who reviews the groups *after* they've sat down and says "this table doesn't meet our minimum."

```sql
-- Only show customers who spent more than $500 total
SELECT customers.name, SUM(order_items.quantity * products.price) AS total_spent
FROM customers
JOIN orders      ON customers.customer_id  = orders.customer_id
JOIN order_items ON orders.order_id        = order_items.order_id
JOIN products    ON order_items.product_id = products.product_id
GROUP BY customers.customer_id, customers.name
HAVING SUM(order_items.quantity * products.price) > 500;
```

---

## Subqueries — Using One Query's Answer Inside Another

A **subquery** is a `SELECT` nested inside another `SELECT`. You can think of it as saying "first figure out *this*, and then use that answer in the main question."

```sql
-- Find all products priced above average
-- Step 1 (inner query): What IS the average price?
-- Step 2 (outer query): Show me products above that average.
SELECT name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);
```

The database runs the inner query first, gets back a single number (the average price), and then uses that number in the outer query's `WHERE` clause.

---

## Assignment

**File to create:** `module_09_complex_queries.sql`

Build this e-commerce database (write all `CREATE TABLE` and teardown statements yourself):

- **customers** — `customer_id` PK, `name`, `city`
- **products** — `product_id` PK, `name`, `category`, `price` REAL
- **orders** — `order_id` PK, `customer_id` FK, `order_date` TEXT
- **order_items** — `order_item_id` PK, `order_id` FK, `product_id` FK, `quantity` INTEGER

Insert enough data to get meaningful results: at least 5 customers, 8 products across multiple categories, 10 orders, and 20 order_items.

**Tasks** (label each with `-- Task N`):

1. **(INNER JOIN)** List every order with the customer's name and the order date.
2. **(LEFT JOIN)** List all customers and how many orders each has placed. Customers with zero orders should show `0`, not NULL. (Hint: use `COALESCE(COUNT(orders.order_id), 0)`)
3. **(Multi-table JOIN)** Show each order item with the order ID, customer name, product name, quantity, and the line total (quantity × price).
4. **(GROUP BY)** Show each product category and the total quantity sold across all orders.
5. **(HAVING)** List only the customers whose total spending (across all orders) is more than $200.
6. **(Subquery)** List all products whose price is above the average price of all products. Show the product name, price, and the average (as a column called `avg_price`).
7. **(EXISTS subquery)** List the names of customers who have placed at least one order containing a product in the 'Electronics' category.
