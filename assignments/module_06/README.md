# Module 6 — Relational Algebra and Query Writing

## Introduction

**Relational algebra** is the mathematical foundation of SQL. Understanding it helps you reason about what a query actually computes — and why it produces the results it does.

### Core Operations

#### Selection (σ) — filter rows

Keeps only the rows that satisfy a condition. Corresponds to `WHERE` in SQL.

Relational algebra: σ<sub>grade ≥ 90</sub>(students)

```sql
SELECT * FROM students WHERE grade >= 90;
```

#### Projection (π) — filter columns

Keeps only specified columns. Corresponds to the column list in `SELECT`.

Relational algebra: π<sub>name, grade</sub>(students)

```sql
SELECT name, grade FROM students;
```

#### Join (⋈) — combine tables

Combines rows from two tables based on a matching condition. Corresponds to `JOIN … ON` in SQL.

Relational algebra: students ⋈<sub>students.dept_id = departments.dept_id</sub> departments

```sql
SELECT students.name, departments.dept_name
FROM students
JOIN departments ON students.dept_id = departments.dept_id;
```

#### Union (∪), Intersection (∩), Difference (−)

| Operation | SQL | Meaning |
|-----------|-----|---------|
| Union | `UNION` | Rows in A **or** B (deduplicates) |
| Intersection | `INTERSECT` | Rows in A **and** B |
| Difference | `EXCEPT` | Rows in A but **not** in B |

### Composing Operations

Complex queries layer these operations. Think of each step as transforming a relation into a new one.

**Example:** "Names of students in the 'Computer Science' department with a grade above 85."

1. σ<sub>dept_name = 'Computer Science'</sub>(departments) → departments filtered
2. students ⋈ filtered departments → joined relation
3. σ<sub>grade > 85</sub>(joined relation) → further filtered
4. π<sub>name</sub>(further filtered) → final result

```sql
SELECT s.name
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
WHERE d.dept_name = 'Computer Science'
  AND s.grade > 85;
```

---

## Assignment

**File to create:** `module_06_queries.sql`

Use the following schema (write the `CREATE TABLE` and `INSERT` statements yourself):

- **departments** — `dept_id` (PK), `dept_name`
- **professors** — `prof_id` (PK), `name`, `dept_id` (FK)
- **students** — `student_id` (PK), `name`, `gpa` (REAL), `dept_id` (FK)
- **courses** — `course_id` (PK), `title`, `dept_id` (FK), `prof_id` (FK)
- **enrollments** — `student_id` (FK), `course_id` (FK), `grade` (TEXT)

Insert enough sample data to make each query below return at least one row.

For each task, write the SQL query **and** a comment above it expressing the equivalent relational algebra operation (use plain-text notation such as `sigma`, `pi`, `join`).

1. (Selection) List all students with a GPA above 3.5.
2. (Projection) List only the `title` of every course — no duplicates.
3. (Join) List each student's name alongside the name of their department.
4. (Composed) List the names of students enrolled in courses taught by professors in the 'Engineering' department.
5. (Aggregate + Group) Show each department name and the average GPA of its students.
6. (Set operation) Using `UNION`, produce a combined list of names from both `students` and `professors`.
