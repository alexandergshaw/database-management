# Module 15 — Database Performance Tuning

## Why Does My Query Take 30 Seconds?

You've built a solid database, your queries are correct, and everything works great — until the data grows. A query that returned results instantly with 100 rows now takes 30 seconds with 2 million rows. Nothing in the code changed. What happened?

The short answer: the database is doing way more work than necessary. Performance tuning is the art of understanding *why* and then reducing that work.

---

## Step 1: See What the Database Is Actually Doing — `EXPLAIN`

Before you can fix a slow query, you need to understand how the database is executing it. The `EXPLAIN` command (or `EXPLAIN QUERY PLAN` in SQLite) shows you the database's *plan* — the step-by-step strategy it will use to answer your query.

```sql
-- SQLite version
EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE customer_id = 42;

-- PostgreSQL version (shows actual timing too)
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 42;
```

**What to look for in the output:**

| What you see | What it means | Good or bad? |
|---|---|---|
| `SCAN TABLE orders` | The database reads every single row | 😬 Bad on large tables |
| `SEARCH TABLE orders USING INDEX` | The database uses an index to jump directly | ✅ Good |
| `USING COVERING INDEX` | The index has all the data needed; no table read | ✅ Even better |

---

## Common Performance Killers

### 1. `SELECT *` — Fetching Columns You Don't Need

Every column you fetch has to be read from disk and sent over the network. If you only need `customer_id` and `order_date`, don't ask for everything.

```sql
-- Slow: fetches 20 columns, most unused
SELECT * FROM orders WHERE status = 'pending';

-- Fast: fetches only what's needed
SELECT order_id, customer_date FROM orders WHERE status = 'pending';
```

### 2. A Function on an Indexed Column — The Index Gets Bypassed

You've added an index on `email`, hoping lookups will be fast. Then you write:

```sql
-- Slow: UPPER() prevents the index from being used
WHERE UPPER(email) = 'ALICE@EXAMPLE.COM'
```

The database can't use the index because it's indexed on the raw value, not the uppercase version. It has to call `UPPER()` on every row. Fix: store emails in lowercase in the first place, then query in lowercase.

```sql
-- Fast: the index on email works normally
WHERE email = 'alice@example.com'
```

### 3. The Correlated Subquery in a Loop

A correlated subquery re-runs for every single row of the outer query. With 100,000 customers, that's 100,000 separate sub-queries.

```sql
-- Slow: inner query runs once per customer
SELECT name FROM customers
WHERE (SELECT COUNT(*) FROM orders WHERE orders.customer_id = customers.customer_id) > 3;

-- Fast: aggregate once, join once
SELECT c.name
FROM customers c
JOIN (
    SELECT customer_id, COUNT(*) AS order_count
    FROM orders
    GROUP BY customer_id
) o ON c.customer_id = o.customer_id
WHERE o.order_count > 3;
```

---

## Index Strategies

You already know what an index is (from Module 10). Now let's look at two more advanced flavors.

### Covering Index — Everything the Query Needs Is in the Index

A regular index tells the database *where* to find matching rows, but the database still has to go read those rows from the main table. A **covering index** includes all the columns the query needs — so the database never has to look at the main table at all.

```sql
-- This query only touches category, name, and price
SELECT name, price FROM products WHERE category = 'Electronics';

-- A covering index includes all three columns — the table is never touched
CREATE INDEX idx_products_cat_name_price ON products(category, name, price);
```

### Partial Index — Only Index the Rows You Care About

Why maintain an index on a column for every row, when 90% of the time you only query a small subset? A **partial index** only covers rows that match a condition.

```sql
-- Most orders are eventually 'completed'. Active orders are rare but queried often.
-- Only index the active ones.
CREATE INDEX idx_active_orders ON orders(customer_id) WHERE status = 'active';
```

This index is smaller, faster to update, and faster to search than a full index.

---

## Database Maintenance

Over time, as rows are inserted, updated, and deleted, a database accumulates "dead" rows and its statistics about the data become stale. Stale statistics cause the query planner to make bad choices. Regular maintenance fixes this.

```sql
-- PostgreSQL: reclaim space from dead rows and update statistics
VACUUM ANALYZE orders;

-- Rebuild an index that has become fragmented
REINDEX TABLE orders;
```

---

## Assignment

**File to create:** `module_15_performance.sql`

Build a schema with enough rows to see performance differences:

- **customers** — `customer_id` PK, `name`, `email`, `city`
- **orders** — `order_id` PK, `customer_id` FK, `status` TEXT, `order_date` DATE, `total` REAL
- **order_items** — `order_item_id` PK, `order_id` FK, `product_id` INTEGER, `quantity` INTEGER, `unit_price` REAL

Insert at least 100 customers, 500 orders, and 1,500 order_items. You can use repeated INSERT statements, copy-paste with different values, or a loop in PostgreSQL.

**Tasks:**

1. **(Baseline)** Write a query that finds all orders with `status = 'completed'` for customers in the city `'New York'`. Run `EXPLAIN QUERY PLAN` before adding any indexes and paste the output as a SQL comment.

2. **(Add indexes)** Create an index on `orders.status` and another on `customers.city`. Run `EXPLAIN QUERY PLAN` again and paste the new plan. In a comment, describe what changed.

3. **(Covering index)** Create a covering index on `orders(status, customer_id, total)`. In a comment, explain what a covering index is and why it can speed up the query from task 1.

4. **(Partial index)** Create a partial index on `orders(customer_id)` where `status = 'active'`. In a comment, explain: when will the database use this index, and when won't it?

5. **(Rewrite a slow query)** Here's a correlated subquery that finds customers with more than 3 orders:
   ```sql
   SELECT name FROM customers
   WHERE (SELECT COUNT(*) FROM orders WHERE orders.customer_id = customers.customer_id) > 3;
   ```
   Rewrite it using a `JOIN` with a grouped subquery. Explain in a comment why your rewrite is likely faster.

6. **(Inefficient pattern)** Write an example query that uses `UPPER(city)` in the `WHERE` clause. Explain in a comment why this prevents the index on `city` from being used, and show the corrected version.
