# Module 7 — SQL DDL

## Building the Container Before You Fill It

Imagine you're setting up a filing system for a doctor's office. Before you can file a single patient record, you need to decide: how many filing cabinets? What drawer labels? What folders go in each drawer? You have to **define the structure** before you can store anything.

In SQL, that's exactly what **DDL** (Data Definition Language) does. DDL is the set of SQL commands that creates, changes, and destroys the *containers* for your data — the tables, indexes, and other structures. It doesn't touch the actual data inside the containers; it just builds, modifies, or removes the containers themselves.

The three main DDL commands are:
- `CREATE` — build something new
- `ALTER` — modify something that already exists
- `DROP` — tear it down completely

---

## `CREATE TABLE` — The Blueprint

When you create a table, you're telling the database exactly what kind of information it will hold. Each column gets a **name** and a **data type** — and you can add extra rules (constraints) to keep the data clean.

```sql
CREATE TABLE products (
    product_id   INTEGER       PRIMARY KEY AUTOINCREMENT,
    name         VARCHAR(100)  NOT NULL,
    description  TEXT,
    price        DECIMAL(10,2) NOT NULL,
    in_stock     BOOLEAN       DEFAULT TRUE,
    created_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
```

Let's break down `DECIMAL(10,2)`: the `10` means the total number of digits, and the `2` means two of those digits come after the decimal point. So `DECIMAL(10,2)` can store numbers like `12345678.99`. This is important for money — you want to store `$19.99` exactly, not as a rounded approximation.

### Picking the Right Data Type

Choosing the right type is like choosing the right kind of form field on a website. A "birthday" field should be a date picker, not a free-text box — otherwise someone might type "tomorrow" and break your system.

| What you're storing | Use this type |
|---|---|
| Whole numbers (IDs, quantities, ages) | `INTEGER` |
| Money, measurements (need precision) | `DECIMAL(p, s)` or `NUMERIC(p, s)` |
| Approximate numbers (scientific data) | `REAL` or `FLOAT` |
| Short text with a max length | `VARCHAR(n)` |
| Long text (descriptions, notes) | `TEXT` |
| Calendar date only | `DATE` |
| Date and time together | `TIMESTAMP` |
| True/False | `BOOLEAN` |

---

## `ALTER TABLE` — Renovating Without Moving Out

Once your table is built and has data in it, you can still change its structure with `ALTER TABLE` — without losing any data. It's like renovating a room while people are still living in it.

```sql
-- Add a brand new column
ALTER TABLE products ADD COLUMN weight_kg REAL;

-- Delete a column you no longer need
ALTER TABLE products DROP COLUMN description;

-- Rename the whole table
ALTER TABLE products RENAME TO inventory;
```

---

## `DROP TABLE` — Tear It Down

`DROP TABLE` permanently deletes a table and all its data. There's no undo button, so use it carefully.

```sql
DROP TABLE IF EXISTS old_data;
```

The `IF EXISTS` part prevents an error message if the table doesn't exist yet — useful when you're running a script multiple times during development.

### Script Tip: Always Start With Teardown

When you're developing and running your script over and over, it's handy to drop your tables at the *top* of the script and recreate them fresh each time. Drop them in **reverse order** of how you create them (because you can't drop a table that other tables still reference):

```sql
-- Drop in reverse order (children before parents)
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS doctors;
DROP TABLE IF EXISTS hospitals;

-- Create in forward order (parents before children)
CREATE TABLE hospitals   (...);
CREATE TABLE doctors     (...);
CREATE TABLE patients    (...);
CREATE TABLE appointments(...);
```

---

## Assignment

**File to create:** `module_07_ddl.sql`

You're building the database for a small **hospital system**.

**Required tables and columns:**

| Table | Columns |
|---|---|
| hospitals | `hospital_id` PK AUTOINCREMENT, `name` NOT NULL, `city` NOT NULL, `capacity` INTEGER with a CHECK that it's > 0 |
| doctors | `doctor_id` PK AUTOINCREMENT, `name` NOT NULL, `specialty` NOT NULL, `hospital_id` FK → hospitals, `email` UNIQUE NOT NULL |
| patients | `patient_id` PK AUTOINCREMENT, `name` NOT NULL, `date_of_birth` DATE, `hospital_id` FK → hospitals |
| appointments | `appointment_id` PK AUTOINCREMENT, `doctor_id` FK, `patient_id` FK, `appointment_date` TIMESTAMP NOT NULL, `notes` TEXT, `status` TEXT DEFAULT 'scheduled' |

**Tasks:**

1. At the very top of your file, write `DROP TABLE IF EXISTS` statements in the correct teardown order so your script can be run repeatedly without errors.
2. Write `CREATE TABLE` statements in the correct creation order with all constraints listed above.
3. Insert sample data: 2 hospitals, 3 doctors, 4 patients, and 5 appointments.
4. Use `ALTER TABLE` to add a `phone TEXT` column to the `patients` table.
5. Write a query that shows each appointment with the doctor's name, the patient's name, and the appointment date all in one result.
