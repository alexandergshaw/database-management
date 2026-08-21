# Module 8 — Basic SQL DML

## Introduction

**DML (Data Manipulation Language)** is the subset of SQL that operates on the *data inside* tables — inserting, reading, updating, and deleting rows.

### INSERT

```sql
-- Insert one row with explicit column list (recommended)
INSERT INTO products (name, price, category)
VALUES ('Laptop', 999.99, 'Electronics');

-- Insert multiple rows at once
INSERT INTO products (name, price, category) VALUES
    ('Mouse',    29.99, 'Electronics'),
    ('Desk',    249.00, 'Furniture'),
    ('Notebook',  3.49, 'Stationery');
```

### SELECT

```sql
-- Retrieve all columns
SELECT * FROM products;

-- Retrieve specific columns
SELECT name, price FROM products;

-- Column alias — rename a column in the output
SELECT name AS product_name, price AS cost FROM products;

-- Filter with WHERE
SELECT * FROM products WHERE price < 50;

-- Combine conditions
SELECT * FROM products WHERE category = 'Electronics' AND price < 100;

-- Sort results
SELECT * FROM products ORDER BY price DESC;   -- highest first
SELECT * FROM products ORDER BY name ASC;     -- alphabetical

-- Limit the number of rows returned
SELECT * FROM products ORDER BY price ASC LIMIT 5;
```

### Handling NULL

`NULL` means "unknown" or "no value". It requires special handling:

```sql
-- Find rows where a column has no value
SELECT * FROM products WHERE description IS NULL;

-- Find rows where a column has a value
SELECT * FROM products WHERE description IS NOT NULL;

-- Replace NULL with a default in output
SELECT name, COALESCE(description, 'No description') AS description
FROM products;
```

> Never use `= NULL` — it will never match anything. Always use `IS NULL` or `IS NOT NULL`.

### UPDATE

```sql
-- Update one or more rows
UPDATE products SET price = 899.99 WHERE name = 'Laptop';

-- Update multiple columns at once
UPDATE products SET price = 199.00, category = 'Office' WHERE name = 'Desk';
```

> **Always include a `WHERE` clause** when updating — omitting it updates every row in the table.

### DELETE

```sql
-- Delete specific rows
DELETE FROM products WHERE category = 'Stationery';

-- Delete all rows (leaves the table structure intact)
DELETE FROM products;
```

> **Always include a `WHERE` clause** when deleting — omitting it deletes every row.

---

## Assignment

**File to create:** `module_08_dml.sql`

Use the following schema (write `DROP TABLE IF EXISTS` and `CREATE TABLE` at the top of your file):

- **categories** — `category_id` PK, `name` NOT NULL UNIQUE
- **products** — `product_id` PK, `name` NOT NULL, `price` REAL NOT NULL, `stock` INTEGER DEFAULT 0, `category_id` FK, `description` TEXT

Tasks:

1. Insert at least 4 categories and 10 products (spread across categories).
2. Write a query that retrieves all products sorted by price ascending. Use an alias to display the `price` column as `unit_price`.
3. Write a query that lists all products in the 'Electronics' category with a price between $50 and $500.
4. Write a query that finds all products where `description` IS NULL.
5. Update the price of every product in one category by increasing it by 10%.
6. Delete all products that have a `stock` of 0.
7. Write a query using `COALESCE` to display each product's name and description, substituting `'No description provided'` when `description` is NULL.
8. Write a query that shows the 3 most expensive products (product name and price only).
