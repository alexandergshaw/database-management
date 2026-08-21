# Module 5 — Database Normalization

## Introduction

**Normalization** is the process of organizing a database to reduce redundancy and avoid update anomalies. It works by applying a series of rules called **normal forms**.

### Why Normalization Matters

Consider a single flat table that stores order information:

| order_id | customer_name | customer_email | product | price |
|----------|--------------|----------------|---------|-------|
| 1 | Alice | alice@x.com | Pen | 1.00 |
| 2 | Alice | alice@x.com | Notebook | 3.00 |
| 3 | Bob | bob@y.com | Pen | 1.00 |

Problems with this design:

- **Insertion anomaly** — you cannot add a customer until they place an order.
- **Update anomaly** — if Alice changes her email, you must update every row for her. Miss one and the data is inconsistent.
- **Deletion anomaly** — deleting Bob's order also deletes all knowledge that Bob exists.

### First Normal Form (1NF)

A table is in **1NF** when:
- Every column contains **atomic** (indivisible) values — no lists or comma-separated values inside a cell.
- Each row is unique (there is a primary key).

**Violates 1NF:**
```
order_id | products
1        | "Pen, Notebook"   ← two values in one cell
```

**Satisfies 1NF:** Store one product per row (add a junction table if needed).

### Second Normal Form (2NF)

A table is in **2NF** when it is in 1NF **and** every non-key column depends on the *entire* primary key (not just part of it). 2NF only applies to tables with a composite primary key.

**Violates 2NF:**
```
order_id | product_id | product_name | quantity
```
`product_name` depends only on `product_id`, not on the full key `(order_id, product_id)`. Move `product_name` to a `products` table.

### Third Normal Form (3NF)

A table is in **3NF** when it is in 2NF **and** every non-key column depends *directly* on the primary key — not on another non-key column (no **transitive dependencies**).

**Violates 3NF:**
```
employee_id | dept_id | dept_name
```
`dept_name` depends on `dept_id`, not on `employee_id`. Move `dept_name` to a `departments` table.

### Summary

| Normal Form | Key Rule |
|-------------|----------|
| 1NF | Atomic values; no repeating groups. |
| 2NF | No partial dependency on a composite key. |
| 3NF | No transitive dependency on a non-key column. |

---

## Assignment

**File to create:** `module_05_normalization.sql`

You are given this unnormalized table (write the `CREATE TABLE` and `INSERT` statements for it yourself):

```
student_courses (
    student_id, student_name, student_email,
    course_id, course_name, instructor_id, instructor_name,
    grade
)
```

Sample data to insert:
- Student 1 (Alice, alice@uni.edu) in Course 101 (Databases, taught by Instructor 10 — Dr. Smith), grade A
- Student 1 (Alice, alice@uni.edu) in Course 102 (Networking, taught by Instructor 11 — Dr. Jones), grade B
- Student 2 (Bob, bob@uni.edu) in Course 101 (Databases, taught by Instructor 10 — Dr. Smith), grade B+

Tasks:

1. **Explain (in SQL comments)** which 1NF, 2NF, and 3NF violations exist in the unnormalized table.
2. **Normalize to 3NF** by writing `CREATE TABLE` statements for the properly decomposed tables. Every table must have a clearly named primary key.
3. **Insert the same sample data** into the normalized tables.
4. **Write a query** that reproduces all the columns of the original unnormalized table by joining your normalized tables together.
