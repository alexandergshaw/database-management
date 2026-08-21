# Module 5 — Database Normalization

## The Trouble With Putting Everything in One Place

Imagine a school secretary who tracks everything in one enormous spreadsheet:

| student_id | student_name | student_email | course_id | course_name | instructor_id | instructor_name | grade |
|---|---|---|---|---|---|---|---|
| 1 | Alice | alice@uni.edu | 101 | Databases | 10 | Dr. Smith | A |
| 1 | Alice | alice@uni.edu | 102 | Networking | 11 | Dr. Jones | B |
| 2 | Bob | bob@uni.edu | 101 | Databases | 10 | Dr. Smith | B+ |

It looks organized, but it's hiding some nasty problems. Let's name them:

**Problem 1 — Update Anomaly:** Alice changes her email. Now you have to update *every row* that has Alice in it. Forget one row and you have two different emails for the same person. The data is now inconsistent — and you might never notice.

**Problem 2 — Insertion Anomaly:** You want to add a new course ("Cloud Computing, Course 103, taught by Dr. Lee") to the system, but no student has signed up yet. You can't add it — there's no student_id to put in the row!

**Problem 3 — Deletion Anomaly:** Bob drops his last course. You delete that row. But now *all trace of Bob ever existing* is gone too, because his personal information was only stored inside a course enrollment row.

**Normalization** is the process of restructuring your database to eliminate these problems. It's done in stages called **normal forms**.

---

## First Normal Form (1NF) — One Value Per Cell

The first rule is simple: **every cell in the table holds exactly one value**. No lists, no comma-separated values stuffed into a single cell.

❌ **Breaks 1NF** — two values crammed into one cell:
```
order_id | products
1        | "Pen, Notebook, Stapler"
```

✅ **Satisfies 1NF** — one row per item:
```
order_id | product
1        | Pen
1        | Notebook
1        | Stapler
```

Think of it like a form where every field can only accept one answer. You wouldn't write "Alice, Bob" in a "First Name" field.

---

## Second Normal Form (2NF) — Every Column Is About the Whole Key

2NF only matters when a table has a **composite primary key** (a primary key made of two or more columns). The rule is: every non-key column must depend on the *entire* key, not just *part* of it.

Consider an `order_items` table where the primary key is `(order_id, product_id)`:

| order_id | product_id | product_name | quantity |
|---|---|---|---|

`quantity` depends on *both* order_id and product_id — it's asking "how many of this product in this order?" ✅

`product_name` depends only on `product_id` — you could look up the name knowing *just* the product, regardless of any order. ❌

**Fix:** Move `product_name` into its own `products` table where `product_id` is the primary key. The product name belongs there — not in an order.

---

## Third Normal Form (3NF) — No Chain Reactions

3NF says: a non-key column should tell you something directly about the primary key — not about *another non-key column*.

Consider:
| employee_id | dept_id | dept_name |
|---|---|---|

`dept_name` depends on `dept_id`, not on `employee_id`. If you know an employee's ID, you look up their `dept_id`, *then* look up the `dept_name` from that. That's a chain — a **transitive dependency**.

**Fix:** Move `dept_id` and `dept_name` into a `departments` table. The `employees` table keeps `dept_id` as a foreign key, and looks up the name when needed.

---

## The Payoff

After normalization, each piece of information lives in exactly **one place**. Alice's email is stored once, in the `students` table. If she updates it, one change fixes everything. New courses can be added to the `courses` table even without any students. Deleting an enrollment doesn't erase the student.

---

## Assignment

**File to create:** `module_05_normalization.sql`

You're given this **badly designed** single table. Your job is to recognize the problems and fix them.

Start by creating and populating this unnormalized table:

```sql
-- This is the BROKEN starting point
CREATE TABLE student_courses (
    student_id      INTEGER,
    student_name    TEXT,
    student_email   TEXT,
    course_id       INTEGER,
    course_name     TEXT,
    instructor_id   INTEGER,
    instructor_name TEXT,
    grade           TEXT
);
```

Insert this data:
- Student 1 (Alice, alice@uni.edu) → Course 101 (Databases, Instructor 10 — Dr. Smith) → grade A
- Student 1 (Alice, alice@uni.edu) → Course 102 (Networking, Instructor 11 — Dr. Jones) → grade B
- Student 2 (Bob, bob@uni.edu) → Course 101 (Databases, Instructor 10 — Dr. Smith) → grade B+

**Your tasks:**

1. In **SQL comments** at the top of your file, explain:
   - What update anomaly exists in this table?
   - What insertion anomaly exists?
   - What deletion anomaly exists?
   - Which columns violate 2NF and why?
   - Which columns violate 3NF and why?

2. **Design and create normalized tables** that fix all of these problems. You should end up with at least 4 tables. Give every table a clearly named primary key.

3. **Insert the same three student/course/grade records** into your new normalized tables.

4. **Write a single `SELECT` query** that joins all your normalized tables back together to reproduce all the columns from the original `student_courses` table.
