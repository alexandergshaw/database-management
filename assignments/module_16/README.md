# Module 16 — Enterprise Database Capstone

## You've Learned Everything — Now Use It All

Over the past 15 weeks, you've gone from "what is a database?" to understanding normalization, security, transactions, triggers, and performance tuning. This capstone is your chance to put it all together and build something real from scratch — the way a professional database engineer would.

There's no lecture section this week. This is your project.

---

## What Does "Enterprise-Quality" Actually Mean?

In a professional setting, a database isn't just a bunch of tables you slapped together. It's a carefully thought-out system. Here's what separates a beginner's database from a professional one:

| Beginner | Professional |
|---|---|
| Tables exist but columns are poorly named | Every table and column has a clear, consistent name and purpose |
| Data can be inserted in obviously broken states | Constraints prevent invalid data from ever entering |
| Everything is in one table or tables aren't linked | Tables are normalized, linked with foreign keys |
| Everyone can read and write everything | Roles and privileges limit access to what each person needs |
| Business logic is scattered across multiple apps | Stored procedures and triggers handle logic in one place |
| No thought given to query speed | Indexes are placed on columns that are actually searched |
| There's no way to get a report without writing a new query | Views make common reports reusable |

Your goal this week is to build a database that would pass review at a real company.

---

## Your Project: A University Course Registration System

You're building the backend database for a university's **course registration system**. Students enroll in course sections, instructors teach those sections, and the university collects tuition payments.

**Think through the design first.** Before writing a single line of SQL, ask yourself:
- What are the "things" in this system? (entities)
- What do we know about each thing? (attributes / columns)
- How are the things connected? (relationships / foreign keys)
- What could go wrong if we don't have a constraint? (what constraints do we need?)
- Who needs access to what? (security roles)
- What reports will people need? (views and queries)

---

## Required Tables

Here's what to build. You may add more columns or tables if you think they're needed.

| Table | Columns |
|---|---|
| **departments** | `dept_id` PK, `name` NOT NULL UNIQUE, `building` |
| **instructors** | `instructor_id` PK, `name` NOT NULL, `email` UNIQUE NOT NULL, `dept_id` FK, `hire_date` DATE |
| **courses** | `course_id` PK, `code` UNIQUE NOT NULL, `title` NOT NULL, `credits` INTEGER with CHECK between 1 and 6, `dept_id` FK |
| **course_sections** | `section_id` PK, `course_id` FK, `instructor_id` FK, `semester` TEXT, `year` INTEGER, `capacity` INTEGER, `enrolled` INTEGER DEFAULT 0 |
| **students** | `student_id` PK, `name` NOT NULL, `email` UNIQUE NOT NULL, `enrollment_date` DATE, `gpa` REAL DEFAULT 0.0 |
| **enrollments** | `enrollment_id` PK, `student_id` FK, `section_id` FK, `grade` TEXT, and a UNIQUE constraint on the combination of `(student_id, section_id)` so a student can't enroll in the same section twice |
| **payments** | `payment_id` PK, `student_id` FK, `amount` REAL CHECK > 0, `payment_date` DATE, `description` TEXT |

---

## Tasks

**File to create:** `module_16_capstone.sql`

Label every section with a clear comment header (e.g., `-- ============ Task 1: Entity Modeling ============`).

### Task 1 — Entity Modeling (Comments Only)

At the very top of your file, write a comment block that describes:
- Each table's purpose in one sentence
- How each table relates to other tables (e.g., "A course_section is one offering of a course, taught by one instructor, in a specific semester")
- Any design decisions you made and why (e.g., "I put `enrolled` on course_sections so I can quickly check if a section is full without counting enrollments")

### Task 2 — DDL: Build the Schema

Write `DROP TABLE IF EXISTS` statements in teardown order at the top (so your script can be run repeatedly), then `CREATE TABLE` statements in creation order. Include every constraint from the table above.

### Task 3 — Sample Data

Insert realistic data that tells a story:
- At least 3 departments
- At least 5 instructors
- At least 8 courses
- At least 10 course sections across two semesters
- At least 15 students
- At least 30 enrollments (mix students and sections — have some students in multiple sections)
- At least 10 payment records

### Task 4 — Transactional Workflow: Enroll a Student

Write a stored procedure (PostgreSQL) or a `BEGIN … COMMIT` transaction block (SQLite) called `enroll_student` that:

1. Accepts a `student_id` and a `section_id` as inputs.
2. Checks whether the section's `enrolled` count is less than `capacity`. If the section is full, raise an error: `'Section is full — cannot enroll student'`.
3. Inserts a new row into `enrollments`.
4. Increments `course_sections.enrolled` by 1.

All of this must happen inside a single transaction — either everything works, or nothing changes.

Test it by calling it for at least 3 different student/section combinations.

### Task 5 — Security: Roles, Grants, and a Security View

Create three roles with appropriate privileges:

| Role | What they should be able to do |
|---|---|
| `registrar` | Full access to `enrollments` and `course_sections`; read-only (`SELECT`) on everything else |
| `student_portal` | `SELECT` on `courses`, `course_sections`, `departments`; `INSERT` and `SELECT` on their own `enrollments` and `payments` |
| `instructor_view` | `SELECT` on `enrollments`, `students`, `courses`, `course_sections` |

Create a security view called `student_grades` that shows: `student_id`, `student_name`, `course_code`, `semester`, `year`, and `grade`. Grant `SELECT` on this view to `instructor_view`.

### Task 6 — Reporting Queries

Write these four analytical queries. Each should return meaningful results given your sample data.

**a.** The top 5 most enrolled courses across all sections (show course title and total enrollment count).

**b.** Each student's calculated GPA based on their grades in `enrollments`. Use these point values: A=4.0, B=3.0, C=2.0, D=1.0, F=0.0. (Hint: use `CASE WHEN grade = 'A' THEN 4.0 ... END` inside `AVG()`.)

**c.** Total tuition collected per department. You'll need to trace the chain: `payments → students → enrollments → course_sections → courses → departments`.

**d.** Using a window function (`RANK() OVER`), rank instructors within each department by the number of sections they teach.

### Task 7 — Performance: Indexes

Add at least four indexes that would help the queries in Task 6 run faster. For each index, write a comment explaining:
- Which query or queries benefit from it
- Why this specific column is a good choice to index

### Task 8 — Documentation

At the very end of your file, write a comment block of at least 15 lines that covers:
- The biggest design decisions you made and the reasoning behind them
- Any trade-offs (e.g., "I denormalized X because Y")
- How the security model protects sensitive data
- What you would do differently if this were a real production system
