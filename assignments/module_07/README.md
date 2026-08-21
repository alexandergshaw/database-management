# Module 7 — SQL DDL

## Introduction

**DDL (Data Definition Language)** is the subset of SQL used to create, modify, and delete the *structures* that hold data — tables, indexes, views, and schemas. Every database project begins with DDL.

### CREATE TABLE and Data Types

```sql
CREATE TABLE products (
    product_id   INTEGER      PRIMARY KEY AUTOINCREMENT,
    name         VARCHAR(100) NOT NULL,
    description  TEXT,
    price        DECIMAL(10,2) NOT NULL,
    in_stock     BOOLEAN      DEFAULT TRUE,
    created_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);
```

#### Common SQL Data Types

| Category | Types | Notes |
|----------|-------|-------|
| Integer | `INTEGER`, `BIGINT`, `SMALLINT` | Whole numbers |
| Decimal | `DECIMAL(p,s)`, `NUMERIC(p,s)` | Exact; use for money |
| Float | `REAL`, `FLOAT`, `DOUBLE` | Approximate; avoid for money |
| Text | `CHAR(n)`, `VARCHAR(n)`, `TEXT` | Fixed / variable length |
| Date/Time | `DATE`, `TIME`, `TIMESTAMP` | Date and/or time |
| Boolean | `BOOLEAN` | TRUE / FALSE |

### Constraints

```sql
CREATE TABLE employees (
    emp_id     INTEGER      PRIMARY KEY,
    email      VARCHAR(200) NOT NULL UNIQUE,
    dept_id    INTEGER      REFERENCES departments(dept_id),
    salary     DECIMAL(10,2) CHECK (salary > 0),
    status     TEXT         DEFAULT 'active'
);
```

### ALTER TABLE

```sql
ALTER TABLE products ADD COLUMN weight_kg REAL;
ALTER TABLE products DROP COLUMN description;
ALTER TABLE products RENAME TO inventory;
```

### DROP TABLE

```sql
DROP TABLE IF EXISTS old_data;
```

`IF EXISTS` prevents an error if the table does not exist.

### Dependency-Aware Schema Creation

Always create tables in an order that satisfies foreign-key dependencies: referenced tables first, referencing tables last. Use `DROP TABLE` in the *reverse* order.

```sql
-- Teardown order (reverse of creation)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;

-- Creation order
CREATE TABLE customers  (...);
CREATE TABLE products   (...);
CREATE TABLE orders     (...);
CREATE TABLE order_items(...);
```

---

## Assignment

**File to create:** `module_07_ddl.sql`

Design and implement a database for a **hospital** with the following requirements:

**Entities and required columns:**

- **hospitals** — `hospital_id` PK, `name` NOT NULL, `city` NOT NULL, `capacity` INTEGER CHECK > 0
- **doctors** — `doctor_id` PK, `name` NOT NULL, `specialty` NOT NULL, `hospital_id` FK → hospitals, `email` UNIQUE NOT NULL
- **patients** — `patient_id` PK, `name` NOT NULL, `date_of_birth` DATE, `hospital_id` FK → hospitals
- **appointments** — `appointment_id` PK, `doctor_id` FK, `patient_id` FK, `appointment_date` TIMESTAMP NOT NULL, `notes` TEXT, `status` TEXT DEFAULT 'scheduled'

Tasks:

1. Write `DROP TABLE IF EXISTS` statements in the correct teardown order (at the top of your file, so the script is re-runnable).
2. Write `CREATE TABLE` statements in the correct creation order, using appropriate data types and all constraints listed above.
3. Insert sample data: 2 hospitals, 3 doctors, 4 patients, and 5 appointments.
4. Use `ALTER TABLE` to add a `phone` column (TEXT) to the `patients` table.
5. Write a query that lists each appointment with the doctor's name, patient's name, and appointment date.
