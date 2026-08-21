# Module 11 — Database Security

## Your Database Knows Everything — Protect It

Think about what's stored in a typical company's database: employee salaries, customer credit card numbers, health records, private messages. If the wrong person gets access, the consequences can be catastrophic — legal liability, financial ruin, destroyed trust.

Database security isn't just a nice-to-have. It's a legal requirement in many industries (healthcare, finance, education). This module covers how databases control *who* can do *what* to the data.

---

## The Core Idea: Not Everyone Gets the Same Keys

Imagine a hospital. A receptionist can view a patient's appointment date but should never see their diagnosis. A doctor can read and update their own patients' records but shouldn't edit billing. The CFO can access financial reports but has no business reading patient charts.

Databases enforce this separation with **users**, **roles**, and **privileges**.

> **Note:** SQLite (the database you've likely been using) is a lightweight, file-based database that doesn't have users or roles — it's meant for single-user apps. The concepts in this module apply to production databases like **PostgreSQL**, **MySQL**, and **SQL Server**. Write your SQL as shown, and add a comment if your environment is SQLite.

---

## Users and Roles

A **user** is an account that can connect to the database. Think of it like a login.

A **role** is a group of permissions that you can assign to one or more users. Instead of giving every employee their permissions one by one, you create a role (like "HR Manager") with the right permissions, and then add employees to that role.

```sql
-- Create a user (PostgreSQL)
CREATE USER analyst WITH PASSWORD 'a_strong_password_here';

-- Create a role
CREATE ROLE readonly_role;
```

---

## `GRANT` and `REVOKE` — Handing Out and Taking Back Keys

`GRANT` gives a user or role permission to do something. `REVOKE` takes that permission away.

```sql
-- Let the analyst read the products table — nothing else
GRANT SELECT ON products TO analyst;

-- Let the app_user read, insert, and update orders (but NOT delete)
GRANT SELECT, INSERT, UPDATE ON orders TO app_user;

-- Give analyst the readonly_role (they inherit all of that role's permissions)
GRANT readonly_role TO analyst;

-- Oops — we don't want app_user deleting things. Take that away.
REVOKE DELETE ON orders FROM app_user;
```

The most common privileges are: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, and `ALL PRIVILEGES`.

---

## The Principle of Least Privilege — Give Only What's Needed

This is the golden rule of security: **grant only the minimum permissions necessary to do the job.**

If your customer-facing app only needs to read the product catalog, give it `SELECT` on the `products` table — nothing else. If the app gets hacked, the attacker can only read products. They can't delete your data, modify prices, or steal customer records.

| Person / App | What they should be able to do | Appropriate privileges |
|---|---|---|
| Public website | Browse products | `SELECT` on `products` |
| Customer app | See own orders, create new orders | `SELECT`, `INSERT` on `orders` (their own rows only) |
| Employee | Update their own profile | `UPDATE` on specific columns |
| Admin | Everything | `ALL PRIVILEGES` |

---

## Security Views — Show Only What's Safe to Show

A view (from Module 10) can double as a security tool. Instead of granting access to a sensitive table directly, you create a view that hides the sensitive columns and grant access to the view instead.

```sql
-- The real employees table has a salary column — very sensitive
-- Create a view that leaves salary out entirely
CREATE VIEW employee_directory AS
SELECT emp_id, name, department, email
FROM employees;
-- salary is not in here — nobody who only has access to this view can see it

-- Grant access to the SAFE view, not the raw table
GRANT SELECT ON employee_directory TO general_staff;
```

---

## Row-Level Security — Controlling Which *Rows* Someone Can See

What if you want each employee to see *their own* record but not anyone else's? That's **row-level security (RLS)** — a feature in PostgreSQL that adds an automatic filter to every query based on who's logged in.

```sql
-- Turn on RLS for the table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: users can only see orders that belong to them
CREATE POLICY own_orders_only ON orders
    USING (customer_id = current_setting('app.current_user_id')::INTEGER);
```

Now even if an employee writes `SELECT * FROM orders`, they'll only get back their own rows. The database silently adds the filter.

---

## Assignment

**File to create:** `module_11_security.sql`

> If you're using SQLite, write the SQL as shown and add a comment on each PostgreSQL-specific statement explaining that SQLite would use a different approach (like application-level filtering).

**Schema to create:**
- **employees** — `emp_id` PK, `name`, `department`, `salary` REAL, `email` UNIQUE
- **projects** — `project_id` PK, `title`, `budget` REAL, `department`
- **assignments** — `emp_id` FK, `project_id` FK (who is working on what)

Insert at least 6 employees across 3 departments and 4 projects.

**Tasks:**

1. Create three roles: `hr_manager`, `project_manager`, and `employee_viewer`.
2. Grant `hr_manager` full access (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) on the `employees` table.
3. Grant `project_manager` full access on `projects` and `assignments`, and `SELECT` only on `employees`.
4. Create a security view called `employee_public_info` that exposes only `emp_id`, `name`, and `department` — no `salary`, no `email`. Grant `SELECT` on this view to `employee_viewer`.
5. Create a user `carol` and grant her the `employee_viewer` role.
6. Write a `REVOKE` statement that removes `DELETE` from `hr_manager` on the `employees` table.
7. In a comment of at least 5 sentences, explain: How would you use row-level security to make sure each employee can only see their own row when they query `employees`? What's the SQL? Why is this better than just trusting the application to filter correctly?
