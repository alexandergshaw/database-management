# Module 2 — Relational Schema Design

## Introduction

A **schema** is the blueprint of a database — it defines what tables exist, what columns each table has, and how tables relate to one another. Designing a good schema before writing any SQL saves enormous time later.

### The Relational Model

In the **relational model**, data is organized into tables (called *relations*). Each table represents one real-world entity — for example, `customers`, `products`, or `orders`. Tables are linked together through shared values rather than by physically storing the data in one place.

### Primary Keys

A **primary key** is a column (or combination of columns) whose values uniquely identify every row in a table. No two rows can share the same primary key value, and a primary key can never be NULL.

```sql
CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    name        TEXT,
    email       TEXT
);
```

`customer_id` is the primary key of `customers`. Every customer gets a unique ID.

### Foreign Keys

A **foreign key** is a column in one table that points to the primary key of another table, creating a link between the two.

```sql
CREATE TABLE orders (
    order_id    INTEGER PRIMARY KEY,
    customer_id INTEGER,           -- foreign key → customers.customer_id
    order_date  TEXT
);
```

Here, `orders.customer_id` refers to `customers.customer_id`. This means every order is associated with exactly one customer.

### Referential Integrity

**Referential integrity** is the guarantee that a foreign key value always points to a row that actually exists. You cannot add an order for a customer who does not exist, and (without special handling) you cannot delete a customer who still has orders.

### Translating Real-World Scenarios into Schemas

Follow these steps when designing a schema from scratch:

1. **Identify entities** — the "things" in the scenario (people, products, events, places).
2. **List attributes** — the properties each entity has (name, date, price).
3. **Choose a primary key** for each entity.
4. **Identify relationships** — which entities are connected, and how (one-to-many, many-to-many).
5. **Add foreign keys** to express those relationships.

**Example scenario:** A library lends books to members.

| Entity | Attributes | Primary Key |
|--------|-----------|-------------|
| `members` | member_id, name, email | member_id |
| `books` | book_id, title, author | book_id |
| `loans` | loan_id, member_id, book_id, due_date | loan_id |

`loans` has two foreign keys: one to `members` and one to `books`.

---

## Assignment

**File to create:** `module_02_schema.sql`

A small school needs a database to track its **courses**, **students**, and **enrollments** (which students are taking which courses).

1. **Identify entities and attributes.** Before writing any SQL, write comments at the top of your file listing the entities, their attributes, and the primary key you chose for each.

2. **Design the relationships.** In comments, describe how the entities are related (e.g., "one course can have many students").

3. **Write `CREATE TABLE` statements** for each entity. Each table must have a clearly named primary key column.

4. **Add a foreign key column** to the `enrollments` table that references `students`, and another that references `courses`.

5. **Insert sample data** — at least 3 students, 3 courses, and 5 enrollments — to demonstrate that your schema works.

6. **Write a query** that lists every enrollment alongside the student's name and the course name (you will need to join all three tables).
