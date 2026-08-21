# Module 11 — Database Security

## Introduction

A database often holds the most sensitive data in an organization — personal information, financial records, health data. Proper security controls ensure that each user can access only what they are authorized to access, and nothing more.

### Users and Roles

Most production databases separate *authentication* (who you are) from *authorization* (what you can do).

- A **user** is an individual account that can connect to the database.
- A **role** is a named collection of privileges that can be granted to users, making privilege management easier.

```sql
-- PostgreSQL / standard SQL
CREATE USER analyst WITH PASSWORD 'secure_password';
CREATE ROLE readonly;
```

> SQLite does not have users or roles — these concepts apply to client/server databases like PostgreSQL, MySQL, and SQL Server.

### GRANT and REVOKE

`GRANT` gives a privilege to a user or role. `REVOKE` takes it away.

```sql
-- Grant SELECT on a specific table
GRANT SELECT ON products TO analyst;

-- Grant multiple privileges
GRANT SELECT, INSERT, UPDATE ON orders TO app_user;

-- Grant a role to a user
GRANT readonly TO analyst;

-- Revoke a privilege
REVOKE DELETE ON products FROM analyst;
```

Common privileges: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `REFERENCES`, `ALL PRIVILEGES`.

### Principle of Least Privilege

Users and applications should be granted **only the permissions they need** to perform their function — no more. This limits the damage caused by mistakes, compromised accounts, or malicious insiders.

| Role Example | Appropriate Privileges |
|---|---|
| Report reader | `SELECT` on specific views |
| Application backend | `SELECT`, `INSERT`, `UPDATE` on specific tables |
| DBA | `ALL PRIVILEGES` |

### Security Views

A view can act as a security boundary: grant users access to the view instead of the base table, and the view filters out sensitive columns or rows.

```sql
-- Hide the salary column from most users
CREATE VIEW employee_directory AS
SELECT emp_id, name, department, email
FROM employees;  -- salary column is NOT included

GRANT SELECT ON employee_directory TO general_staff;
```

### Row-Level Security (RLS)

Row-level security restricts which *rows* a user can see, not just which columns. This is natively supported in PostgreSQL:

```sql
-- Enable RLS on the table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: users can only see their own orders
CREATE POLICY user_own_orders ON orders
    USING (customer_id = current_setting('app.current_user_id')::INTEGER);
```

---

## Assignment

**File to create:** `module_11_security.sql`

> Note: If you are using SQLite, write the SQL statements as you would for PostgreSQL and add a comment noting that SQLite does not support users/roles/RLS. The goal is to demonstrate understanding of the concepts.

Use a schema with these tables:
- **employees** — `emp_id` PK, `name`, `department`, `salary` REAL, `email` UNIQUE
- **projects** — `project_id` PK, `title`, `budget` REAL, `department`
- **assignments** — `emp_id` FK, `project_id` FK

Insert at least 6 employees across 3 departments and 4 projects.

1. Create three roles: `hr_manager`, `project_manager`, and `employee_viewer`.
2. Grant `hr_manager` full access (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) to `employees`.
3. Grant `project_manager` full access to `projects` and `assignments`, and `SELECT` on `employees`.
4. Grant `employee_viewer` only `SELECT` on a view (see task 5).
5. Create a security view called `employee_public_info` that exposes only `emp_id`, `name`, and `department` from `employees` (hiding `salary` and `email`). Grant `SELECT` on this view to `employee_viewer`.
6. Create a user `carol` and grant her the `employee_viewer` role.
7. Write a `REVOKE` statement that removes `DELETE` from `hr_manager` on the `employees` table.
8. In a comment, explain in 3–5 sentences how row-level security could be used to ensure that employees can only see their own row in the `employees` table.
