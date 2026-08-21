# Module 3 — Schema Implementation I

## Introduction

In this module you move from *designing* a schema on paper to *implementing* it correctly in SQL. Getting the implementation right means choosing appropriate constraints, handling multi-table relationships, and creating tables in the correct order.

### Primary Keys in SQL

Declare a primary key with the `PRIMARY KEY` constraint. SQLite and most databases also support `AUTOINCREMENT` (or `SERIAL` in PostgreSQL) so the database assigns IDs automatically.

```sql
CREATE TABLE departments (
    dept_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    dept_name TEXT NOT NULL
);
```

### Foreign Keys

Declare a foreign key with `REFERENCES`:

```sql
CREATE TABLE employees (
    emp_id    INTEGER PRIMARY KEY AUTOINCREMENT,
    name      TEXT NOT NULL,
    dept_id   INTEGER REFERENCES departments(dept_id)
);
```

`employees.dept_id` must match a value in `departments.dept_id`.

### Many-to-Many Relationships

Two tables have a **many-to-many** relationship when one row in table A can relate to many rows in table B, and vice versa. Implement this with a **junction table** (also called a bridge or associative table) that holds a foreign key to each of the two tables.

```sql
-- A student can enroll in many courses; a course can have many students.
CREATE TABLE enrollments (
    student_id INTEGER REFERENCES students(student_id),
    course_id  INTEGER REFERENCES courses(course_id),
    PRIMARY KEY (student_id, course_id)   -- composite primary key
);
```

### Constraints

| Constraint | Purpose |
|------------|---------|
| `PRIMARY KEY` | Uniquely identifies each row; cannot be NULL. |
| `NOT NULL` | Prevents a column from storing NULL. |
| `UNIQUE` | Ensures no two rows have the same value in this column. |
| `CHECK` | Validates that a value meets a condition (e.g., `CHECK (age > 0)`). |
| `DEFAULT` | Provides a value when none is supplied. |
| `REFERENCES` | Enforces referential integrity (foreign key). |

### Table-Creation Order

Because a foreign key must reference a table that already exists, you must **create the referenced table first**.

```
-- Correct order
CREATE TABLE departments ...   -- referenced by employees
CREATE TABLE employees    ...  -- references departments
```

If you try to create `employees` before `departments`, you will get an error.

---

## Assignment

**File to create:** `module_03_implementation.sql`

Implement a database for a **music streaming service** with the following entities:

- **artists** — `artist_id` (PK), `name` (NOT NULL), `country`
- **albums** — `album_id` (PK), `title` (NOT NULL), `release_year`, `artist_id` (FK → artists)
- **songs** — `song_id` (PK), `title` (NOT NULL), `duration_seconds` (CHECK > 0), `album_id` (FK → albums)
- **playlists** — `playlist_id` (PK), `name` (NOT NULL), `created_date`
- **playlist_songs** — junction table linking `playlists` and `songs` (many-to-many), with a composite primary key

Tasks:

1. Write the `CREATE TABLE` statements in the correct order (referenced tables first).
2. Add all constraints listed above.
3. Insert sample data: at least 2 artists, 2 albums per artist, 3 songs per album, 2 playlists, and several playlist–song links.
4. Write a query that lists every song in a specific playlist, showing the playlist name, song title, and album title.
