# Module 1 — SQL Foundations

## What Are We Even Doing Here?

Think about your phone's contacts app. It stores your friends' names, phone numbers, and emails. Now imagine you have a thousand contacts — how does the app keep all that straight? The answer is a **database**: a super-organized digital filing cabinet that stores information and lets you find, change, or delete it instantly.

Almost every app you've ever used — Instagram, Spotify, your bank, your university's grading portal — has a database humming away in the background. **SQL** (say it like the letters: S-Q-L, or "sequel") is the language we use to talk to that filing cabinet. It looks a little like English, which is one of the reasons it's been the most popular database language for over 40 years.

---

## Databases Are Just Fancy Spreadsheets (Kind Of)

The easiest way to picture a database table is to imagine a Google Sheet. You've got **columns** across the top (Name, Age, Grade) and **rows** of data going down (one row per person). That's all a table is.

| id | name  | grade |
|----|-------|-------|
| 1  | Alice | 90    |
| 2  | Bob   | 85    |

A real database might have dozens of these tables, all linked together — but we'll get there. For now, one table at a time.

### The Four Things You'll Do With Data (Over and Over Again)

Every database operation boils down to four actions. Developers have a nickname for them: **CRUD**.

| Action | SQL Keyword | Real-Life Analogy |
|--------|-------------|-------------------|
| **C**reate data | `INSERT` | Writing a new entry in your notebook |
| **R**ead data | `SELECT` | Looking something up |
| **U**pdate data | `UPDATE` | Crossing out old info and writing new info |
| **D**elete data | `DELETE` | Ripping a page out of your notebook |

---

## The SQL Commands, One at a Time

### Step 1 — Build the Filing Cabinet Drawer: `CREATE TABLE`

Before you can store anything, you need to tell the database *what kind of information* it will be storing. This is like drawing the column headers on a blank spreadsheet before you fill it in.

```sql
CREATE TABLE students (
    id      INTEGER,
    name    TEXT,
    grade   INTEGER
);
```

Breaking this down:
- `CREATE TABLE students` — "Make a new table called students."
- `id INTEGER` — "The first column is called `id` and it holds whole numbers."
- `name TEXT` — "The second column is called `name` and it holds text (words)."
- `grade INTEGER` — "The third column is called `grade` and it also holds whole numbers."

**Common data types** (think of these as the "type" of value a column can hold):

| Type | What it stores | Example |
|------|---------------|---------|
| `INTEGER` | Whole numbers | 1, 42, -7 |
| `TEXT` | Words and sentences | 'Alice', 'Hello!' |
| `REAL` | Decimal numbers | 3.14, 19.99 |
| `DATE` | Calendar dates | '2024-09-01' |

### Step 2 — Add Data: `INSERT INTO`

Now you can add rows, just like typing into a spreadsheet row.

```sql
INSERT INTO students (id, name, grade) VALUES (1, 'Alice', 90);
INSERT INTO students (id, name, grade) VALUES (2, 'Bob',   85);
```

Reading it aloud: "Insert into the students table, in the columns id/name/grade, the values 1, Alice, 90."

Notice that text values go in **single quotes** (`'Alice'`), but numbers don't need them.

### Step 3 — Look Things Up: `SELECT`

`SELECT` is the command you'll write the most. It's how you ask the database a question.

```sql
-- Show me EVERYTHING in the students table
SELECT * FROM students;

-- Show me ONLY the name and grade columns
SELECT name, grade FROM students;

-- Show me names of students who scored 90 or above
SELECT name FROM students WHERE grade >= 90;
```

The `*` is a wildcard that means "all columns." The `WHERE` part is like a filter — "only show me rows where this condition is true."

### Step 4 — Change Existing Data: `UPDATE`

Made a typo? Need to fix a grade? `UPDATE` lets you change data that's already in the table.

```sql
-- Change Bob's grade to 88
UPDATE students SET grade = 88 WHERE name = 'Bob';
```

⚠️ **Always include `WHERE`** when you update. If you forget it, you'll change *every single row* in the table — not just the one you meant to fix.

### Step 5 — Remove Data: `DELETE`

```sql
-- Remove the row where id is 2
DELETE FROM students WHERE id = 2;
```

⚠️ Same warning as `UPDATE` — always use `WHERE`, or you'll delete everything.

### Bonus: Quick Math on Your Data — Aggregate Functions

Sometimes you don't want individual rows — you want a summary. These functions crunch all the rows and give you one answer.

```sql
SELECT COUNT(*) FROM students;    -- How many students are there? → 2
SELECT AVG(grade) FROM students;  -- What's the average grade?    → 87.5
SELECT MAX(grade) FROM students;  -- What's the highest grade?    → 90
SELECT MIN(grade) FROM students;  -- What's the lowest grade?     → 85
SELECT SUM(grade) FROM students;  -- What do all grades add up to? → 175
```

---

## Assignment

**File to create:** `module_01_queries.sql`

Create a new file called `module_01_queries.sql` in this folder. Write your SQL inside it. Put a comment (a line starting with `--`) above each section labeling which task it is, like this:

```sql
-- Task 1
CREATE TABLE ...
```

Here's what to do:

1. **Create a table** called `books` with these columns:
   - `id` — a whole number
   - `title` — text
   - `author` — text
   - `year_published` — a whole number
   - `price` — a decimal number (`REAL`)

2. **Add at least five books** to your table using `INSERT INTO`. Use real books, made-up books, whatever you like!

3. **Write a query** that shows every single column and row in your `books` table.

4. **Write a query** that shows only the `title` and `author` columns, but only for books published after the year 2000.

5. **Update** the price of one book to a different amount.

6. **Delete** one book from the table.

7. **Write three separate queries** that each show one of the following:
   - How many books are still in the table
   - The average price of all remaining books
   - The year of the oldest book (earliest `year_published`)
