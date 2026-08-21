# Module 4 — Schema Implementation II

## Schemas Change — And That's Okay

You've built a database, inserted data, and everything is working. Then the product manager walks over and says, "Hey, we need to track phone numbers now. Also, can we rename 'products' to 'inventory'?"

In real life, requirements change constantly. The good news is that SQL has a tool for this: `ALTER TABLE`. It lets you modify an existing table *without* deleting it and starting over. Deleting the table would destroy all your data — `ALTER TABLE` avoids that.

---

## `ALTER TABLE` — Modifying a Table That Already Exists

Think of `ALTER TABLE` like remodeling a room in a house. You don't tear down the whole house; you just knock out a wall, add a window, or rename the room.

```sql
-- Add a brand new column (like adding a new shelf to a room)
ALTER TABLE employees ADD COLUMN phone TEXT;

-- Rename a column (like relabeling a shelf)
ALTER TABLE employees RENAME COLUMN phone TO phone_number;

-- Rename the entire table (like renaming the room)
ALTER TABLE employees RENAME TO staff;
```

> **Heads up:** SQLite (the database you're likely using in class) has limited `ALTER TABLE` support. Adding and renaming columns works fine, but dropping columns requires a workaround in older versions. If something doesn't work, check which version of SQLite you're running.

---

## Named Constraints — Giving Your Rules a Name

In Module 3, you added constraints like `NOT NULL` and `CHECK`. But you can also give each constraint its own name, like labeling a rule in a rulebook. This pays off later when you want to remove a specific rule — you can refer to it by name instead of having to guess which one to drop.

```sql
CREATE TABLE orders (
    order_id    INTEGER,
    customer_id INTEGER,
    amount      REAL,
    CONSTRAINT pk_orders        PRIMARY KEY (order_id),
    CONSTRAINT fk_orders_cust   FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    CONSTRAINT chk_amount_pos   CHECK (amount > 0)
);
```

The naming pattern `pk_`, `fk_`, `chk_` is just a convention — it tells you at a glance what kind of constraint it is.

---

## Indexes — Making the Database Find Things Faster

Imagine your database is a giant, unsorted phonebook with a million entries. Every time you search for "Smith, John," the database has to read the entire book from page one until it finds the name. That's called a **full table scan**, and on large tables it's painfully slow.

An **index** is like adding an alphabetical index tab to that phonebook. Instead of reading every page, the database jumps straight to the "S" section. The data is still in the original table — the index is a separate, sorted shortcut.

```sql
-- Speed up lookups by customer_id
CREATE INDEX idx_orders_customer ON orders(customer_id);

-- Cover two columns that are often searched together (like the index tabs going to first name AND city)
CREATE INDEX idx_orders_date_cust ON orders(order_date, customer_id);

-- Unique index — also enforces uniqueness (same as a UNIQUE constraint)
CREATE UNIQUE INDEX idx_customers_email ON customers(email);

-- Remove an index
DROP INDEX idx_orders_customer;
```

**The trade-off:** Indexes speed up *reading* data but slow down *writing* it. Every time you insert or update a row, the database has to update the index too — extra work. So you don't index every column, just the ones you search or filter by often.

---

## Peeking Inside the Database: Schema Inspection

Sometimes you need to see what tables and indexes exist. In SQLite you can ask:

```sql
-- List all tables
SELECT name FROM sqlite_master WHERE type = 'table';

-- See the exact CREATE statement used to make a table (like reading the blueprint)
SELECT sql FROM sqlite_master WHERE name = 'orders';
```

---

## Assignment

**File to create:** `module_04_evolution.sql`

You're going to build a small schema, insert data, then evolve it — just like in a real project.

**Start with these three tables** (write the `CREATE TABLE` statements yourself):

- **products** — `product_id` (PK), `name` (NOT NULL), `price` (REAL)
- **customers** — `customer_id` (PK), `name` (NOT NULL), `email` (UNIQUE)
- **orders** — `order_id` (PK), `customer_id` (FK), `order_date` (TEXT)

Put a comment above each task (like `-- Task 1`) so it's easy to follow:

1. Insert at least 4 products, 4 customers, and 6 orders.
2. Use `ALTER TABLE` to add a `stock_quantity INTEGER DEFAULT 0` column to `products`.
3. Use `ALTER TABLE` to add a `status TEXT DEFAULT 'pending'` column to `orders`.
4. Rename the `name` column in `products` to `product_name`.
5. Create an index on `orders.customer_id`. Add a comment explaining *why* this particular column is a good candidate for an index.
6. Create a composite index on `orders(customer_id, order_date)`. Add a comment explaining what kinds of queries this helps.
7. Write a query using `sqlite_master` (or your database's equivalent) to list all indexes in the database.
