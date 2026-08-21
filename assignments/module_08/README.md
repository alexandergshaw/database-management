# Module 8 — Basic SQL DML

## Once the Containers Are Built, Fill Them Up

In Module 7 you built the *structure* of a database (the tables). Now it's time to work with the *data inside* those tables. That's the job of **DML** — Data Manipulation Language.

DML covers four actions you already know from the CRUD acronym:
- **INSERT** — add new rows
- **SELECT** — read rows
- **UPDATE** — change existing rows
- **DELETE** — remove rows

This module goes deeper into each one, covering the tricks and details that make a real difference.

---

## `INSERT` — Adding Data

You've seen basic inserts. Here's a useful upgrade: inserting multiple rows at once:

```sql
-- One row at a time (works, but repetitive)
INSERT INTO products (name, price, category) VALUES ('Laptop', 999.99, 'Electronics');

-- All at once — much faster for loading data
INSERT INTO products (name, price, category) VALUES
    ('Mouse',    29.99, 'Electronics'),
    ('Desk',    249.00, 'Furniture'),
    ('Notebook',  3.49, 'Stationery');
```

Always list the column names explicitly (don't skip them). If you add columns to the table later, your inserts without column names will break.

---

## `SELECT` — Asking Questions of Your Data

### Column Aliases — Rename Columns in Your Output

Sometimes the column name in the database isn't what you want to show the user. An **alias** lets you rename it just for the output:

```sql
SELECT name AS product_name, price AS unit_cost FROM products;
```

The database still calls the columns `name` and `price` internally — the alias only affects what you see in the results.

### Sorting Results With `ORDER BY`

```sql
SELECT * FROM products ORDER BY price ASC;    -- cheapest first
SELECT * FROM products ORDER BY price DESC;   -- most expensive first
SELECT * FROM products ORDER BY name ASC;     -- alphabetical A → Z
```

### Limiting Results With `LIMIT`

Want just the top 5 results? Use `LIMIT`:

```sql
SELECT * FROM products ORDER BY price DESC LIMIT 5;   -- top 5 most expensive
```

### Combining Conditions in `WHERE`

```sql
-- Both conditions must be true
SELECT * FROM products WHERE category = 'Electronics' AND price < 100;

-- Either condition can be true
SELECT * FROM products WHERE category = 'Electronics' OR category = 'Furniture';
```

---

## Handling `NULL` — The "Unknown" Value

`NULL` is not zero. It's not an empty string. It means *"we don't know"* or *"this doesn't apply."* Think of it like a form field left blank.

Because `NULL` means "unknown," you can't compare it with `=`. Would you say "unknown equals unknown"? That doesn't make sense. Instead, SQL has special syntax:

```sql
-- Find products with no description yet
SELECT * FROM products WHERE description IS NULL;

-- Find products that DO have a description
SELECT * FROM products WHERE description IS NOT NULL;
```

⚠️ `WHERE description = NULL` will **never** match anything. Always use `IS NULL`.

### `COALESCE` — Providing a Fallback for NULL

`COALESCE` returns the first non-NULL value from a list. It's perfect for replacing blanks with a default in your output:

```sql
SELECT name, COALESCE(description, 'No description provided') AS description
FROM products;
```

---

## `UPDATE` — Changing Existing Data

```sql
-- Give the Laptop a new price
UPDATE products SET price = 899.99 WHERE name = 'Laptop';

-- Update two columns at once
UPDATE products SET price = 199.00, category = 'Office' WHERE name = 'Desk';
```

⚠️ **Always use `WHERE` with UPDATE.** If you forget it, you change **every single row** in the table. This is one of the most common and painful mistakes beginners make.

---

## `DELETE` — Removing Data

```sql
-- Remove one specific product
DELETE FROM products WHERE product_id = 7;

-- Remove all stationery products
DELETE FROM products WHERE category = 'Stationery';
```

⚠️ **Always use `WHERE` with DELETE.** Forgetting it deletes every row — and there's no "undo."

---

## Assignment

**File to create:** `module_08_dml.sql`

Use this schema (write `DROP TABLE IF EXISTS` and `CREATE TABLE` at the top so your script is re-runnable):

- **categories** — `category_id` PK, `name` NOT NULL UNIQUE
- **products** — `product_id` PK, `name` NOT NULL, `price` REAL NOT NULL, `stock` INTEGER DEFAULT 0, `category_id` FK → categories, `description` TEXT

**Tasks** (add a `-- Task N` comment above each one):

1. Insert at least 4 categories and 10 products spread across those categories. Leave the `description` blank (NULL) on at least 3 products.
2. Write a query that retrieves all products sorted from cheapest to most expensive. Rename the `price` column to `unit_price` in your output using an alias.
3. Write a query that lists all products in the 'Electronics' category with a price between $50 and $500.
4. Write a query that finds all products where `description` is NULL.
5. Update the price of every product in one category to be 10% higher than it currently is. (Hint: `SET price = price * 1.1`)
6. Delete all products that have a `stock` of 0.
7. Write a query using `COALESCE` to show each product's name and description, but replace NULL descriptions with the text `'No description provided'`.
8. Write a query that shows only the 3 most expensive products (product name and price only).
