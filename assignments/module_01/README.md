# Module 1 — SQL Foundations

## Introduction

A **database** is an organized collection of data stored and accessed electronically. Almost every application you use — from social media to banking apps — relies on a database behind the scenes.

**SQL** (Structured Query Language) is the standard language for talking to relational databases. It lets you create structures to hold data, add new data, retrieve it, change it, and delete it — all with plain, English-like commands.

### Key Concepts

| Concept | What it means |
|---------|---------------|
| **Table** | A grid of rows and columns, like a spreadsheet, that holds one type of data (e.g., `students`, `orders`). |
| **Row (record)** | A single entry in a table — one student, one order, etc. |
| **Column (field)** | One piece of information shared by every row — a student's `name`, `age`, etc. |
| **Data type** | The kind of value a column stores: `INTEGER`, `TEXT`, `REAL`, `DATE`, etc. |

### Creating a Table

```sql
CREATE TABLE students (
    id      INTEGER,
    name    TEXT,
    grade   INTEGER
);
```

This creates a table called `students` with three columns.

### Inserting Records

```sql
INSERT INTO students (id, name, grade) VALUES (1, 'Alice', 90);
INSERT INTO students (id, name, grade) VALUES (2, 'Bob',   85);
```

### Querying Data

```sql
-- Get every row and column
SELECT * FROM students;

-- Get only the name and grade columns
SELECT name, grade FROM students;

-- Filter rows with WHERE
SELECT name FROM students WHERE grade >= 90;
```

### Updating and Deleting Rows

```sql
-- Change Bob's grade to 88
UPDATE students SET grade = 88 WHERE name = 'Bob';

-- Remove a row
DELETE FROM students WHERE id = 2;
```

### Basic Aggregate Functions

Aggregate functions summarize many rows into a single result.

```sql
SELECT COUNT(*)       FROM students;          -- how many rows
SELECT AVG(grade)     FROM students;          -- average grade
SELECT MAX(grade)     FROM students;          -- highest grade
SELECT MIN(grade)     FROM students;          -- lowest grade
SELECT SUM(grade)     FROM students;          -- total of all grades
```

---

## Assignment

**File to create:** `module_01_queries.sql`

Complete the following tasks inside that file. Write all answers in SQL and include a comment above each section identifying which task it answers (e.g., `-- Task 1`).

1. **Create a table** called `books` with the following columns:
   - `id` — an integer
   - `title` — text
   - `author` — text
   - `year_published` — an integer
   - `price` — a decimal number (`REAL`)

2. **Insert at least five records** into `books`. Choose any real or made-up books you like.

3. **Write a query** that retrieves every column and every row from `books`.

4. **Write a query** that returns only the `title` and `author` columns for books published after the year 2000.

5. **Update** the `price` of one book to a new value.

6. **Delete** one book from the table.

7. **Write queries** that show:
   - The total number of books remaining in the table.
   - The average price of all books.
   - The earliest (minimum) year published.
