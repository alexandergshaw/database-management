# Module 4 — Schema Implementation II

## Introduction

Databases are never truly finished. Requirements change, new features arrive, and the schema must evolve to keep up. This module covers the tools SQL gives you to modify an existing schema safely.

### ALTER TABLE

`ALTER TABLE` lets you change the structure of an existing table without dropping and recreating it (which would destroy all the data).

```sql
-- Add a new column
ALTER TABLE employees ADD COLUMN phone TEXT;

-- Rename a column (SQLite 3.25+, most other databases support this too)
ALTER TABLE employees RENAME COLUMN phone TO phone_number;

-- Rename the table itself
ALTER TABLE employees RENAME TO staff;
```

> **Note:** Some databases (e.g., older versions of SQLite) have limited `ALTER TABLE` support. In those cases you may need to create a new table, copy data, and drop the old one.

### Named Constraints

Naming your constraints makes error messages clearer and lets you drop a specific constraint later.

```sql
CREATE TABLE orders (
    order_id   INTEGER,
    customer_id INTEGER,
    amount      REAL,
    CONSTRAINT pk_orders        PRIMARY KEY (order_id),
    CONSTRAINT fk_orders_cust   FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    CONSTRAINT chk_amount_pos   CHECK (amount > 0)
);

-- Drop a named constraint (syntax varies by database)
ALTER TABLE orders DROP CONSTRAINT chk_amount_pos;
```

### Indexes

An **index** is a separate data structure that the database maintains alongside a table to speed up searches. Think of it like the index at the back of a textbook.

```sql
-- Single-column index
CREATE INDEX idx_orders_customer ON orders(customer_id);

-- Composite index (covers two columns together)
CREATE INDEX idx_orders_date_cust ON orders(order_date, customer_id);

-- Unique index — also enforces uniqueness
CREATE UNIQUE INDEX idx_customers_email ON customers(email);

-- Remove an index
DROP INDEX idx_orders_customer;
```

**When to add an index:** Add indexes on columns that appear frequently in `WHERE` clauses, `JOIN` conditions, or `ORDER BY` clauses.

**Trade-off:** Indexes speed up reads but slow down writes (INSERT/UPDATE/DELETE) because the index must be updated too.

### Schema Inspection

Most databases provide ways to view the current schema:

```sql
-- SQLite: list all tables
SELECT name FROM sqlite_master WHERE type = 'table';

-- SQLite: show the CREATE statement for a table
SELECT sql FROM sqlite_master WHERE name = 'orders';
```

---

## Assignment

**File to create:** `module_04_evolution.sql`

You are given the following starting schema (write the CREATE TABLE statements yourself):

- **products** — `product_id` (PK), `name` (NOT NULL), `price` (REAL)
- **customers** — `customer_id` (PK), `name` (NOT NULL), `email` (UNIQUE)
- **orders** — `order_id` (PK), `customer_id` (FK), `order_date` (TEXT)

Tasks (write each as a separate SQL statement with a comment identifying the task):

1. Insert at least 4 products, 4 customers, and 6 orders as sample data.
2. Add a column `stock_quantity INTEGER DEFAULT 0` to the `products` table.
3. Add a column `status TEXT DEFAULT 'pending'` to the `orders` table.
4. Rename the `name` column in `products` to `product_name` (if your database supports it).
5. Create an index on `orders.customer_id`.
6. Create a composite index on `orders(customer_id, order_date)`.
7. Create a named `CHECK` constraint ensuring `products.price > 0` (add it as a new table-level constraint if your database supports `ALTER TABLE … ADD CONSTRAINT`, otherwise recreate the table).
8. Write a query that uses `sqlite_master` (or the equivalent for your database) to list all indexes in the database.
