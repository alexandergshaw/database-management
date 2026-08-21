# Module 6 — Relational Algebra and Query Writing

## SQL Has Math Underneath It

You've been writing SQL for a few weeks now. Have you ever wondered *why* it works the way it does? Where did the `WHERE` clause come from? Why does `JOIN` work the way it works?

It all comes from **relational algebra** — a branch of mathematics invented in the 1970s by a researcher named Edgar Codd. He described a set of operations you could perform on tables (which he called *relations*) to produce new tables. When SQL was invented, it was essentially a human-friendly way of writing those same mathematical operations.

You don't need to be a math expert to understand this. Think of each operation as a different tool in a toolbox — and SQL is just a way of saying which tools you want to use, and in what order.

---

## The Core Operations

### Selection (σ) — "Give Me Only the Rows I Care About"

Selection is like running a filter. You have a full table and you want to throw out the rows that don't match your condition.

**Math notation:** σ<sub>grade ≥ 90</sub>(students) — "Take the students table, keep only rows where grade is 90 or higher."

**In SQL:**
```sql
SELECT * FROM students WHERE grade >= 90;
```

The `WHERE` clause *is* selection.

### Projection (π) — "Give Me Only the Columns I Care About"

Projection is like hiding certain columns in a spreadsheet. You have a table with 10 columns but you only care about 2 of them.

**Math notation:** π<sub>name, grade</sub>(students) — "Take the students table, keep only the `name` and `grade` columns."

**In SQL:**
```sql
SELECT name, grade FROM students;
```

The column list in your `SELECT` *is* projection.

### Join (⋈) — "Stitch Two Tables Together"

Join is like looking up a foreign key and "expanding" it with the full row from the other table. It takes two tables and combines their columns wherever their values match.

**Math notation:** students ⋈ departments (where dept_id matches)

**In SQL:**
```sql
SELECT students.name, departments.dept_name
FROM students
JOIN departments ON students.dept_id = departments.dept_id;
```

Think of it like a VLOOKUP in Excel — you have an ID number in one column, and you want to pull in the full details from another table.

### Set Operations — Combining Results From Multiple Queries

| Operation | SQL Keyword | What it does |
|---|---|---|
| Union (∪) | `UNION` | Everything from query A **plus** everything from query B (no duplicates) |
| Intersection (∩) | `INTERSECT` | Only rows that appear in **both** query A and query B |
| Difference (−) | `EXCEPT` | Rows in query A that are **not** in query B |

---

## Composing Operations — Building Complex Queries Step by Step

The real power comes from chaining these operations together. Each step produces a new "virtual table," and the next step works on that.

**Example question:** "What are the names of students in the Computer Science department with a GPA above 3.5?"

Let's think through it step by step before writing any SQL:

1. Filter `departments` to find Computer Science → gives us Computer Science's `dept_id`
2. Join `students` with that result to get only CS students
3. Filter those results to keep only students with GPA > 3.5
4. Project (select) only the `name` column

**The SQL:**
```sql
SELECT s.name
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
WHERE d.dept_name = 'Computer Science'
  AND s.gpa > 3.5;
```

Notice how we can read this almost like English: "Get student names, from students joined with departments where the department name is Computer Science, and the student's GPA is above 3.5."

---

## Assignment

**File to create:** `module_06_queries.sql`

Build the following schema (write all `CREATE TABLE` and `INSERT` statements yourself):

- **departments** — `dept_id` (PK), `dept_name`
- **professors** — `prof_id` (PK), `name`, `dept_id` (FK)
- **students** — `student_id` (PK), `name`, `gpa` (REAL), `dept_id` (FK)
- **courses** — `course_id` (PK), `title`, `dept_id` (FK), `prof_id` (FK)
- **enrollments** — `student_id` (FK), `course_id` (FK), `grade` (TEXT)

Insert enough sample data across multiple departments so that each query below returns at least one meaningful result.

For each task below, write the SQL query **and** a short comment above it that describes what relational algebra operation(s) it performs (e.g., `-- Selection on students where gpa > 3.5`). Don't worry about formal math notation — plain English is fine.

1. List all students with a GPA above 3.5. (Selection)
2. List only the course titles — no other columns, no duplicates. (Projection)
3. List each student's name next to the name of their department. (Join)
4. List the names of students who are enrolled in at least one course taught by a professor in the 'Engineering' department. (Composed join + selection)
5. Show each department name alongside the average GPA of the students in it. (Join + Group By)
6. Produce a combined list of names from both `students` and `professors` using `UNION`. (Set operation)
