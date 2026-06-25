# Week 11 — Transactions & Security

Two advanced topics in one week.

## Part A — Transactions
Booking telescope time has two steps that must happen **together**: record the
booking, and subtract the nights. A **transaction** guarantees "all or nothing."
You'll wrap the steps in a database **function** so they always run as one unit.
- `select ... for update` **locks** the row you read, so two bookings can't both
  spend the last night (this is **concurrency** control).
- `raise exception '...'` aborts and undoes everything done so far.

### Worked example (a different topic — yours books telescope nights)
```sql
-- Example only — NOT the answer. The shape of an "all-or-nothing" function:
create or replace function withdraw(p_account text, p_amount numeric)
returns void
language plpgsql
as $$
declare
  v_balance numeric;
begin
  select balance into v_balance from accounts where id = p_account for update;
  if v_balance < p_amount then
    raise exception 'insufficient funds';   -- undoes the whole function
  end if;
  update accounts set balance = balance - p_amount where id = p_account;
end;
$$;
```

## Part B — Security
- **Row-Level Security (RLS)**: once you turn it on for a table, the public role
  sees *no* rows unless a **policy** allows it — good for private data.
- A **view** can publish only the safe columns of a table, and `grant select`
  decides who may read it.

## Your tasks (in `assignments/week11/starter.sql`)
1. Create `telescopes` and `telescope_bookings`.
2. Write the atomic `book_nights(code, nights)` function (and call it once).
3. Create a private `proposal_secrets` table, enable RLS, add a policy.
4. Publish a `public_catalog` view of safe planet columns and grant it to `anon`.

## Watch & learn
- **Video:** [PL/pgSQL functions (YouTube)](https://www.youtube.com/results?search_query=postgresql+plpgsql+function+tutorial) · [Supabase Row-Level Security (YouTube)](https://www.youtube.com/results?search_query=supabase+row+level+security+tutorial)
- **Tutorial:** [PostgreSQL — PL/pgSQL](https://www.postgresql.org/docs/current/plpgsql.html) · [PostgreSQL — transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html) · [Supabase — Row-Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)

## Done when
- A Security posture panel appears on the homepage.
- The Week 11 planet is **Unlocked**.
