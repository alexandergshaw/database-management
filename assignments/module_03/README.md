# Module 3 — Schema Implementation I

## Moving From Blueprint to Building

In Module 2, you learned how to *design* a schema — drawing the blueprints. Now you're going to *build* it — pouring the concrete. This means writing SQL that actually enforces your design decisions so the database refuses to accept bad data.

Think of it like building a form on a website. A good form won't let you submit it if you leave the "Email" field blank, or if you type letters into a "Phone Number" field. Constraints in SQL do the same thing — they make the database picky on purpose, so junk data can't sneak in.

---

## Making the Database Picky: Constraints

A **constraint** is a rule attached to a column (or a whole table) that the database enforces automatically. You write it once, and from then on the database checks every INSERT and UPDATE against it.

### `PRIMARY KEY` — The Row's Unique ID

You already know this one. Every table needs a primary key so rows can be uniquely identified.

```sql
CREATE TABLE departments (
    dept_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    dept_name TEXT NOT NULL
);
```

`AUTOINCREMENT` (or `SERIAL` in PostgreSQL) tells the database to automatically assign the next available number — you never have to pick the ID yourself. It's like a ticket counter at the DMV: the next person gets the next number, automatically.

### `NOT NULL` — This Field Can't Be Left Blank

```sql
name TEXT NOT NULL
```

Just like a form that won't let you submit with an empty "Name" field, `NOT NULL` means this column must always have a value.

### `UNIQUE` — No Duplicates Allowed

```sql
email TEXT UNIQUE
```

Every row must have a different value here. Perfect for email addresses or usernames — you don't want two accounts sharing the same email.

### `CHECK` — Must Pass a Test

```sql
age INTEGER CHECK (age >= 0)
price REAL CHECK (price > 0)
```

`CHECK` lets you write any condition. If the condition is false, the database rejects the insert. You'll never end up with a product that costs -$5.

### `DEFAULT` — A Fallback Value

```sql
status TEXT DEFAULT 'active'
```

If you insert a row without specifying this column, the database fills it in with the default. Like a form field that's pre-filled to "United States" until you change it.

### `REFERENCES` (Foreign Key) — Link to Another Table

```sql
CREATE TABLE employees (
    emp_id  INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT NOT NULL,
    dept_id INTEGER REFERENCES departments(dept_id)
);
```

`REFERENCES` enforces the connection. You can't set `dept_id = 999` unless department 999 actually exists. The database won't let you create a broken link.

---

## Many-to-Many Relationships: The Bridge Table

Some relationships are more complicated than "one points to many." Consider students and courses:

- One student can be enrolled in *many* courses.
- One course can have *many* students enrolled.

This is a **many-to-many** relationship, and you can't represent it with just a foreign key on one of the two tables. The solution is a **junction table** (also called a bridge table) that sits in the middle and holds one row per connection.

Think of it like a sign-up sheet at a club fair. The sheet itself isn't the club, and it isn't the student — it's just the link between them.

```sql
CREATE TABLE enrollments (
    student_id INTEGER REFERENCES students(student_id),
    course_id  INTEGER REFERENCES courses(course_id),
    PRIMARY KEY (student_id, course_id)   -- combination of both is the unique key
);
```

The **composite primary key** `(student_id, course_id)` means a student can only appear once per course — no accidental double-enrollments.

---

## Order Matters: Create the Referenced Table First

Here's a rule that trips up beginners: you have to create a table *before* another table can reference it. If `employees` has a foreign key pointing to `departments`, you must create `departments` first.

```sql
-- ✅ Correct order
CREATE TABLE departments (...);   -- created first because employees references it
CREATE TABLE employees   (...);   -- references departments, so it comes second

-- ❌ This will error — employees can't reference a table that doesn't exist yet
CREATE TABLE employees   (...);
CREATE TABLE departments (...);
```

---

## Assignment

**File to create:** `module_03_implementation.sql`

You're building a database for a **music streaming service**. Here are the tables you need:

- **artists** — `artist_id` (PK, AUTOINCREMENT), `name` (NOT NULL), `country`
- **albums** — `album_id` (PK, AUTOINCREMENT), `title` (NOT NULL), `release_year`, `artist_id` (FK → artists)
- **songs** — `song_id` (PK, AUTOINCREMENT), `title` (NOT NULL), `duration_seconds` (must be > 0), `album_id` (FK → albums)
- **playlists** — `playlist_id` (PK, AUTOINCREMENT), `name` (NOT NULL), `created_date`
- **playlist_songs** — junction table linking playlists and songs (a playlist can have many songs; a song can be in many playlists). Use a composite primary key.

**Your tasks:**

1. Write the `CREATE TABLE` statements **in the correct order** — referenced tables come first. Add all the constraints described above.

2. Insert sample data:
   - At least 2 artists
   - At least 2 albums per artist
   - At least 3 songs per album
   - At least 2 playlists
   - At least 5 entries in `playlist_songs` (add songs to playlists)

3. Write a query that lists every song in one of your playlists, showing the playlist name, song title, and album title all in the same result. (Hint: you'll need to join multiple tables together.)
