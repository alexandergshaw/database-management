# Week 6 — SQL Fundamentals: SELECT, INSERT, UPDATE, DELETE

These four verbs are the everyday tools of SQL. This week you create an
`observations` table (an astronomer logging a planet's brightness) and use all
four on it.

## The four verbs (in plain English)
- **INSERT** adds new rows.
- **SELECT** reads rows.
- **UPDATE** changes existing rows that match a condition.
- **DELETE** removes rows that match a condition.

## Worked example (a different topic)
```sql
-- Example only — NOT the answer:
insert into tasks (title, status) values ('Write report', 'todo');
update tasks set status = 'done' where status = 'todo';
delete from tasks where status = 'cancelled';
select * from tasks order by created_at;
```

## A handy trick for Problem 2
To insert a row that references another table by name (not by its hidden id),
look the id up as you insert:
```sql
-- Example only — NOT the answer:
insert into reviews (book_id, stars)
select id, 5 from books where title = 'Dune';
```

## Your tasks (in `assignments/week06/starter.sql`)
1. Create the `observations` table (foreign keys to astronomers and planets).
2. **INSERT** at least three observations.
3. **UPDATE** the "logged" ones to "confirmed", then **DELETE** a "cancelled" one.
4. **SELECT** the rows that remain.

## Done when
- An observation log appears once Week 10's join view is built.
- The Week 6 planet is **Unlocked**.
