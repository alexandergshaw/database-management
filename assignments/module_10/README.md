# Module 10 — Views and Indexes

## Two Solutions to Two Common Problems

As your database grows, two annoying things start to happen:

1. **You write the same complex query over and over.** Every week you paste the same 20-line query to generate the sales report, tweaking it each time and occasionally introducing bugs.

2. **Your queries get slower.** What used to return instantly now takes 10 seconds because there are now 2 million rows in the orders table.

This module introduces the tools that fix both problems: **views** and **indexes**.

---

## Views — A Saved Query That Looks Like a Table

A **view** is a query that you give a name to and save in the database. After that, you can query the view just like it's a real table — but under the hood, the database runs the original query each time.

Think of it like a saved search in your email app. Instead of typing "from:boss subject:urgent" every morning, you save it as a folder called "Urgent from Boss" — and from then on, you just click that folder.

```sql
-- Save this complex query as a view
CREATE VIEW high_value_orders AS
SELECT
    orders.order_id,
    customers.name  AS customer,
    SUM(order_items.quantity * products.price) AS total
FROM orders
JOIN customers   ON orders.customer_id     = customers.customer_id
JOIN order_items ON orders.order_id        = order_items.order_id
JOIN products    ON order_items.product_id = products.product_id
GROUP BY orders.order_id, customers.name
HAVING SUM(order_items.quantity * products.price) > 100;

-- Now use it like a regular table — much simpler!
SELECT * FROM high_value_orders ORDER BY total DESC;

-- Remove the view when you no longer need it
DROP VIEW IF EXISTS high_value_orders;
```

**Other benefits of views:**
- **Security:** You can give someone access to a view without giving them access to the underlying tables. They see only what the view shows them.
- **Consistency:** The query logic lives in one place. If the business rule changes, you update the view once and all the reports automatically reflect the change.

---

## Advanced Subquery Patterns

Before diving into indexes, here are two more powerful subquery techniques.

### Correlated Subquery — A Subquery That Looks at the Outer Row

A **correlated subquery** references a column from the outer query. It re-runs for *every row* of the outer query, "looking up" something for each row individually:

```sql
-- For each product, count how many times it's been ordered
SELECT
    products.name,
    (SELECT COUNT(*) FROM order_items WHERE order_items.product_id = products.product_id) AS times_ordered
FROM products;
```

Think of it like filling out a column in a spreadsheet by doing a COUNTIF for each row.

### Subquery in FROM — A Temporary Table

You can put a subquery in the `FROM` clause and treat its result like a table:

```sql
-- Find the category with the highest average price
SELECT category, avg_price
FROM (
    SELECT category, AVG(price) AS avg_price
    FROM products
    GROUP BY category
) AS category_averages
WHERE avg_price > 50;
```

The inner query runs first and creates a temporary result set. The outer query then queries that.

---

## Indexes — A Shortcut Into the Data

Imagine the database is a library with a million books arranged in the order they were acquired — no alphabetical order, no subject catalog, nothing. Every time you search for "a book about Python," a librarian has to read every single book title. That's a **full table scan** and it's painfully slow.

An **index** is like the card catalog at the library — a separate, sorted structure that the librarian can consult to jump directly to the right shelf.

```sql
-- Create an index on the customer_id column of orders
-- Now "find all orders for customer 42" is fast
CREATE INDEX idx_orders_customer ON orders(customer_id);
```

### Composite Index — Covering Multiple Columns

If your queries frequently filter on *two columns together*, a composite index covers both:

```sql
-- Useful for queries like: WHERE order_id = ? AND product_id = ?
CREATE INDEX idx_order_items_order_product ON order_items(order_id, product_id);
```

### Checking If Your Query Uses an Index

```sql
-- See how SQLite plans to execute your query
EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE customer_id = 5;
```

Look for `USING INDEX` in the output — that means your index is being used. If you see `SCAN`, it's doing a full table scan and may need an index.

---

## Assignment

**File to create:** `module_10_views_indexes.sql`

Reuse (or recreate) the e-commerce schema from Module 9 (customers, products, orders, order_items). Include teardown and creation at the top of your file and insert enough data to make the queries interesting.

**Tasks:**

1. **(Create a view)** Create a view called `customer_order_summary` that shows for each customer: `customer_id`, `name`, total number of orders placed, and total amount spent.

2. **(Use the view)** Write a query against `customer_order_summary` that lists only customers who have spent more than $100. Notice how clean this query is compared to the raw version.

3. **(Correlated subquery)** Without using the view, write a query that lists each product's name alongside the total quantity ever ordered — using a correlated subquery.

4. **(Subquery in FROM)** Find the product category with the highest average price using a subquery in the `FROM` clause.

5. **(Create an index)** Create an index on `orders.customer_id`. Write a comment explaining why this column is a good candidate.

6. **(Composite index)** Create a composite index on `order_items(order_id, product_id)`. Write a comment explaining what kinds of queries this helps.

7. **(EXPLAIN)** Run `EXPLAIN QUERY PLAN` on the query from Task 2 (rewritten without the view, joining the raw tables). Paste the output as a comment. Then add an index that would improve it, run `EXPLAIN QUERY PLAN` again, and paste the improved plan as a comment.
