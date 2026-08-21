# Module 15 — Database Performance Tuning

## Introduction

A query that runs in milliseconds on a test database with a few hundred rows may take minutes on a production database with millions of rows. Performance tuning is the practice of understanding *why* a query is slow and systematically making it faster.

### Query Execution Plans

Before tuning, you need to see *how* the database actually executes a query. Use `EXPLAIN` (or `EXPLAIN ANALYZE` in PostgreSQL) to get the execution plan:

```sql
-- SQLite
EXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id = 42;

-- PostgreSQL
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;
```

Key things to look for in a plan:
- **Seq Scan** — full table scan; the database reads every row. Bad on large tables.
- **Index Scan** — the database uses an index. Much faster for selective queries.
- **Nested Loop / Hash Join** — how tables are joined. Nested loops can be expensive.

### Inefficient Query Patterns

| Pattern | Problem | Fix |
|---|---|---|
| `SELECT *` | Returns unused columns, wastes I/O | List only the columns you need |
| Function on indexed column in `WHERE` | Prevents index use | Rewrite to avoid the function |
| `OR` across different columns | May defeat index | Use `UNION` or separate indexes |
| Implicit type conversion | May skip index | Ensure types match |
| `LIKE '%prefix'` (leading wildcard) | Cannot use a B-tree index | Redesign or use full-text search |

```sql
-- Bad: index on email cannot be used
WHERE LOWER(email) = 'alice@x.com'

-- Better: store email in lowercase, then index it
WHERE email = 'alice@x.com'
```

### Index Strategies

- **Covering index** — an index that includes all columns needed by the query (the database never touches the base table).

```sql
-- Covers SELECT name, price FROM products WHERE category = 'Electronics'
CREATE INDEX idx_products_category_covering ON products(category, name, price);
```

- **Partial index** — an index that only covers rows matching a condition, making it smaller and faster.

```sql
-- Only index active orders (assuming most orders are eventually closed)
CREATE INDEX idx_orders_active ON orders(customer_id) WHERE status = 'active';
```

### Query Rewrites

Sometimes restructuring a query dramatically changes performance:

```sql
-- Slow: correlated subquery runs once per row
SELECT name FROM customers
WHERE (SELECT COUNT(*) FROM orders WHERE orders.customer_id = customers.customer_id) > 5;

-- Fast: aggregate and join instead
SELECT c.name
FROM customers c
JOIN (SELECT customer_id, COUNT(*) AS cnt FROM orders GROUP BY customer_id) o
  ON c.customer_id = o.customer_id
WHERE o.cnt > 5;
```

### Database Maintenance

Databases accumulate dead rows and stale statistics over time. Regular maintenance keeps performance consistent:

```sql
-- PostgreSQL: reclaim space and update statistics
VACUUM ANALYZE orders;

-- Rebuild an index
REINDEX TABLE orders;
```

---

## Assignment

**File to create:** `module_15_performance.sql`

Create a schema with enough rows to make performance differences observable:

- **customers** — `customer_id` PK, `name`, `email`, `city`
- **orders** — `order_id` PK, `customer_id` FK, `status` TEXT, `order_date` DATE, `total` REAL
- **order_items** — `order_item_id` PK, `order_id` FK, `product_id` INTEGER, `quantity` INTEGER, `unit_price` REAL

Insert at least 100 customers, 500 orders, and 1,500 order_items using a loop, script, or repeated inserts.

1. **(Baseline)** Write a query that finds all 'completed' orders for customers in 'New York'. Run `EXPLAIN QUERY PLAN` (or `EXPLAIN ANALYZE`) before any tuning and paste the plan as a SQL comment.

2. **(Index)** Create an index on `orders.status` and another on `customers.city`. Re-run `EXPLAIN QUERY PLAN` and paste the new plan as a comment. Describe the improvement.

3. **(Covering index)** Create a covering index on `orders(status, customer_id, total)` and explain in a comment what a covering index is and why it helps this query.

4. **(Partial index)** Create a partial index on `orders(customer_id)` where `status = 'active'`. Explain when this index will be used and when it will not.

5. **(Rewrite)** The following correlated subquery finds customers with more than 3 orders. Rewrite it as a `JOIN` with a grouped subquery and explain why the rewrite is likely faster:
   ```sql
   SELECT name FROM customers
   WHERE (SELECT COUNT(*) FROM orders WHERE orders.customer_id = customers.customer_id) > 3;
   ```

6. **(Inefficient pattern)** Write an example of a query that uses a function on an indexed column (e.g., `WHERE UPPER(city) = 'NEW YORK'`), explain why it is slow, and provide the corrected version.
