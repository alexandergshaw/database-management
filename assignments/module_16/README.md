# Module 16 — Enterprise Database Capstone

## Introduction

This capstone module brings together everything you have learned across the course. You will plan, design, implement, test, secure, and document a complete database system — just as you would in a professional setting.

### What "Enterprise-Quality" Means

An enterprise database is not just a collection of tables. It has:

- **Clear documentation** of what each entity and column represents.
- **Referential integrity** — every foreign key points to a real row.
- **Appropriate constraints** — data types, NOT NULL, CHECK, UNIQUE are used correctly.
- **Normalized design** — no unnecessary redundancy.
- **Security controls** — users and roles with least-privilege access.
- **Procedural logic** — functions, stored procedures, and/or triggers for complex operations.
- **Performance** — indexes on high-traffic columns, optimized queries.
- **Analytical capability** — views or queries for reporting needs.

### Planning Process

Follow this order when building a production database:

1. **Understand the domain** — read the requirements carefully. Ask: what entities exist? What events happen? What reports are needed?
2. **Entity-Relationship (ER) modeling** — sketch entities, attributes, and relationships.
3. **Schema design** — translate the ER model into tables, choosing primary keys, foreign keys, and constraints.
4. **DDL** — write `CREATE TABLE` statements in dependency order.
5. **Sample data** — insert realistic data to test the schema and queries.
6. **Transactional workflows** — implement stored procedures or transactions for key operations.
7. **Security** — create roles and grant appropriate privileges.
8. **Reporting** — create views and analytical queries.
9. **Optimization** — add indexes, review execution plans, rewrite slow queries.
10. **Documentation** — comment your SQL thoroughly.

---

## Assignment

**File to create:** `module_16_capstone.sql`

You will design and implement a database for a **university course registration system**. The system must support:

- Storing information about students, instructors, departments, courses, and course sections.
- Enrolling students in course sections with a grade recorded after the term ends.
- Tracking tuition payments made by students.
- Reporting on course popularity, student GPAs, and department revenue.

### Requirements

#### Entities (minimum columns required; you may add more)

| Entity | Columns |
|---|---|
| departments | dept_id PK, name NOT NULL UNIQUE, building |
| instructors | instructor_id PK, name NOT NULL, email UNIQUE NOT NULL, dept_id FK, hire_date DATE |
| courses | course_id PK, code UNIQUE NOT NULL, title NOT NULL, credits INTEGER CHECK (credits BETWEEN 1 AND 6), dept_id FK |
| course_sections | section_id PK, course_id FK, instructor_id FK, semester TEXT, year INTEGER, capacity INTEGER, enrolled INTEGER DEFAULT 0 |
| students | student_id PK, name NOT NULL, email UNIQUE NOT NULL, enrollment_date DATE, gpa REAL DEFAULT 0.0 |
| enrollments | enrollment_id PK, student_id FK, section_id FK, grade TEXT, UNIQUE(student_id, section_id) |
| payments | payment_id PK, student_id FK, amount REAL CHECK (amount > 0), payment_date DATE, description TEXT |

#### Tasks

1. **(Entity modeling)** At the top of your file, write comments describing each entity, its purpose, and its relationships to other entities.

2. **(DDL)** Write `DROP TABLE IF EXISTS` statements in teardown order, then `CREATE TABLE` statements in creation order. Include all constraints from the table above.

3. **(Sample data)** Insert realistic data:
   - At least 3 departments.
   - At least 5 instructors.
   - At least 8 courses.
   - At least 10 course sections across two semesters.
   - At least 15 students.
   - At least 30 enrollments.
   - At least 10 payment records.

4. **(Transactional workflow)** Write a stored procedure (PostgreSQL) or a transaction block (SQLite) called `enroll_student` that:
   - Accepts `p_student_id` and `p_section_id`.
   - Checks that the section's `enrolled` count is less than `capacity`. If not, raise an error: `'Section is full'`.
   - Inserts a row into `enrollments`.
   - Increments `course_sections.enrolled` by 1.
   - All steps must be in a single transaction.

5. **(Security)** Create roles and grant privileges:
   - `registrar` — full access to `enrollments`, `course_sections`; SELECT on everything else.
   - `student_portal` — SELECT on `courses`, `course_sections`, `departments`; INSERT/SELECT on `enrollments` and `payments` for the student's own rows only.
   - `instructor_view` — SELECT on `enrollments`, `students`, `courses`, `course_sections`.
   - Create a security view `student_grades` that shows `student_id`, `student_name`, `course_code`, `section semester/year`, and `grade`. Grant SELECT on it to `instructor_view`.

6. **(Reporting queries)** Write the following analytical queries:
   a. The top 5 most enrolled courses (by total enrollments across all sections).
   b. Each student's GPA — calculate it from the `enrollments` table using standard grade-point values (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0).
   c. Total tuition collected per department (join payments → students → enrollments → sections → courses → departments).
   d. Using a window function, rank instructors within each department by the number of sections they teach.

7. **(Performance)** Add at least four indexes that would benefit the reporting queries above. For each index, write a comment explaining which query it helps and why.

8. **(Documentation)** At the end of your file, write a comment block (at least 15 lines) summarizing: the schema design decisions you made, any trade-offs, and how the security model protects the data.
