# Module 2 — Relational Schema Design

## The Problem With One Giant Spreadsheet

Imagine your school tried to track everything in a single Google Sheet — every student, every course, every grade, all in one massive table. It might start like this:

| student_name | student_email | course_name | instructor | grade |
|---|---|---|---|---|
| Alice | alice@uni.edu | Databases | Dr. Smith | A |
| Alice | alice@uni.edu | Networking | Dr. Jones | B |
| Bob | bob@uni.edu | Databases | Dr. Smith | B+ |

At first glance this looks fine. But what happens when Alice changes her email address? You have to find and update *every single row* that mentions Alice. Miss one and now you have two different emails for the same person — the data is broken.

What if you want to add a new course before any students have signed up for it? You can't — there's no student to put in the row yet!

This is the core problem that **relational database design** solves. Instead of one giant table, you split the data into **multiple focused tables**, each covering one topic, and then **link them together**. This is called the **relational model**.

---

## The Big Ideas

### One Table, One Topic

Think of each table like a dedicated notebook. You have one notebook for students, one for courses, one for grades. Each notebook only contains information about its own subject — no mixing.

- A `students` table knows *everything about students* (name, email, ID number).
- A `courses` table knows *everything about courses* (course name, instructor, room number).
- A separate table records *which students are in which courses*.

### Primary Keys — Every Row Gets a Unique ID

Imagine you have two students both named "Alex Smith." How does the database tell them apart? By giving every row a unique identification number called a **primary key**. Think of it like a student ID number — no two students share the same one, and it never changes.

```sql
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,   -- this is the unique ID
    name       TEXT,
    email      TEXT
);
```

`PRIMARY KEY` tells the database: "This column must be unique for every row, and it can never be empty."

### Foreign Keys — How Tables Talk to Each Other

A **foreign key** is a column in one table that stores the primary key of a row in another table. It's like writing a student's ID number on a course enrollment slip instead of writing out their full name — the ID is a pointer back to the full record.

```sql
CREATE TABLE enrollments (
    enrollment_id INTEGER PRIMARY KEY,
    student_id    INTEGER,    -- this is a foreign key pointing to students.student_id
    course_id     INTEGER,    -- this is a foreign key pointing to courses.course_id
    grade         TEXT
);
```

Now `enrollments` doesn't need to store Alice's email or name — it just stores her `student_id`. If Alice changes her email, you update it in *one place* (the `students` table) and everything that references her ID automatically reflects the change.

### Referential Integrity — No Dangling Pointers

**Referential integrity** is the database's promise that a foreign key always points to something real. If `enrollments.student_id = 42`, there must be a student with `student_id = 42` in the `students` table. The database will refuse to let you create a broken link. Think of it as a rule that says "you can't enroll a student who doesn't exist."

---

## How to Design a Schema From Scratch

When someone hands you a real-world scenario, use this process to turn it into a schema:

1. **Find the nouns** — they become tables. People, places, things, events.
2. **List the facts about each noun** — they become columns.
3. **Give each table a primary key** — usually an ID number.
4. **Find the relationships** — which nouns are connected? How? (One-to-many? Many-to-many?)
5. **Add foreign keys** to express those relationships.

**Example:** A library lends books to members.

- **Nouns (tables):** `members`, `books`, `loans`
- **Relationships:** one member can have many loans; one book can appear in many loans → a `loans` table links them.

| Table | Columns | Primary Key |
|-------|---------|-------------|
| members | member_id, name, email | member_id |
| books | book_id, title, author | book_id |
| loans | loan_id, member_id, book_id, due_date | loan_id |

`loans` has two foreign keys: `member_id` (points to `members`) and `book_id` (points to `books`). It's the glue that connects the other two tables.

---

## Assignment

**File to create:** `module_02_schema.sql`

A small school needs to track its **courses**, **students**, and **enrollments** (who is taking which course).

Work through the design steps before writing any SQL:

1. **Plan your tables in comments** at the top of your file. List:
   - Each table's name and columns
   - Which column is the primary key
   - How the tables relate to each other (write it in plain English, like "one student can have many enrollments")

2. **Write `CREATE TABLE` statements** for `students`, `courses`, and `enrollments`. Each must have a clearly named primary key column.

3. **Add foreign key columns** to `enrollments`: one that points to `students`, and one that points to `courses`.

4. **Insert sample data:**
   - At least 3 students
   - At least 3 courses
   - At least 5 enrollments (mix students and courses — have some students in multiple courses)

5. **Write a query** that lists every enrollment showing the student's name, the course name, and the grade. You'll need to connect all three tables to do this — we'll cover exactly how in later modules, but try using this pattern:

```sql
SELECT students.name, courses.name, enrollments.grade
FROM enrollments
JOIN students ON enrollments.student_id = students.student_id
JOIN courses  ON enrollments.course_id  = courses.course_id;
```
