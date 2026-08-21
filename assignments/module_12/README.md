# Module 12 — Transactions and Concurrency

## The Bank Transfer Problem

Imagine you're transferring $100 from your savings account to your checking account. The bank's system does two things:

1. Subtract $100 from savings.
2. Add $100 to checking.

What if the power goes out between step 1 and step 2? Step 1 happened — your savings went down by $100. Step 2 never happened — your checking didn't go up. You just lost $100 out of thin air!

This is why databases use **transactions** — a way to group multiple operations into one "all or nothing" unit. Either every step succeeds, or none of them do. There's no in-between.

---

## What Is a Transaction?

A **transaction** is a sequence of SQL statements that are treated as a single unit of work. You wrap them with `BEGIN` and `COMMIT`:

```sql
BEGIN;                          -- "Start a transaction — nothing is permanent yet"

UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;   -- subtract from savings
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;   -- add to checking

COMMIT;                         -- "Everything worked — make it permanent"
```

If something goes wrong in the middle, you use `ROLLBACK` to undo everything since `BEGIN`:

```sql
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
-- Uh oh — something went wrong. Undo everything.
ROLLBACK;                       -- savings balance is restored, like it never happened
```

---

## ACID — The Four Guarantees of a Good Transaction

Database engineers describe what a proper transaction must guarantee using the acronym **ACID**:

| Letter | Property | Plain English |
|---|---|---|
| **A** | Atomicity | It's all or nothing. No half-done work. |
| **C** | Consistency | The database goes from one valid state to another. No constraints get broken. |
| **I** | Isolation | Two people using the database at the same time don't mess up each other's work. |
| **D** | Durability | Once you commit, the change sticks — even if the server crashes a second later. |

The bank transfer example needs **Atomicity** — if step 2 fails, step 1 must be undone. No money should disappear.

---

## Savepoints — Undoing Just Part of a Transaction

What if you want to undo only *part* of a transaction, not all of it? Use a **savepoint** — it's like setting a checkpoint in a video game. You can go back to the checkpoint without starting over from the beginning.

```sql
BEGIN;

INSERT INTO orders (customer_id, order_date) VALUES (5, '2024-03-15');

SAVEPOINT after_order;          -- "Checkpoint saved here"

INSERT INTO order_items VALUES (99, 5, 2);  -- this has an error
ROLLBACK TO after_order;        -- "Go back to the checkpoint — undo only the last insert"

-- The first INSERT is still in the transaction
COMMIT;                         -- Only the order is saved, not the bad order_item
```

---

## When Multiple People Use the Database at Once: Concurrency

Most real databases are used by hundreds or thousands of people simultaneously. This creates a new set of problems. Here are the four main ones:

### Lost Update — Two People Edit the Same Thing at Once

Alice and Bob both read the ticket count for a concert: 1 ticket left. Alice buys it — the system reads 1 and writes 0. But Bob's purchase was processing at the exact same time. His system also read 1 and writes 0. Now you've sold the last ticket *twice*.

### Dirty Read — Reading Someone Else's Unfinished Work

Carlos starts a transaction and updates a price from $10 to $50. Before he commits (finalizes), Dana reads the price and sees $50. Then Carlos cancels his transaction (ROLLBACK) — the price goes back to $10. Dana made a decision based on a price that never officially existed.

### Non-Repeatable Read — The Same Query Returns Different Results

Eve runs a query and sees a hotel room available. She starts filling in her booking form (still in the same transaction). Frank books the room in between. Eve runs the availability query again — now the room is gone. Same query, different result. Confusing!

### Phantom Read — New Rows Appear Mid-Transaction

Grace queries "show me all orders over $500" and gets 3 results. Henry places a new $600 order while Grace is still working. Grace runs the query again — now she gets 4 results. A new row "appeared" (a "phantom") between her two queries.

---

## Isolation Levels — Choosing Your Protection

You can tell the database how strict to be about isolation. Stricter means safer but slower (because the database has to block more simultaneous work):

| Level | What it prevents | Trade-off |
|---|---|---|
| `READ UNCOMMITTED` | Nothing — most dangerous | Fastest |
| `READ COMMITTED` | Dirty reads | Default in most databases |
| `REPEATABLE READ` | Dirty reads + non-repeatable reads | Slower |
| `SERIALIZABLE` | All four problems | Slowest but safest |

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;
-- your queries here
COMMIT;
```

---

## Assignment

**File to create:** `module_12_transactions.sql`

Build a **bank account** database:

- **accounts** — `account_id` PK, `owner_name` NOT NULL, `balance` REAL NOT NULL CHECK (balance >= 0)
- **transactions** — `txn_id` PK AUTOINCREMENT, `from_account` (nullable FK), `to_account` (nullable FK), `amount` REAL NOT NULL CHECK (amount > 0), `txn_type` TEXT, `txn_timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP

Insert 4 accounts with starting balances (e.g., $500, $200, $1000, $350).

**Tasks** (label each with `-- Task N`):

1. **(Successful transfer)** Write a complete transaction (`BEGIN` → `COMMIT`) that moves $150 from account 1 to account 2. Include both `UPDATE` statements and an `INSERT` into `transactions` to record the event.

2. **(Failed transaction)** Write a transaction that tries to withdraw $10,000 from an account with only $200. Use `ROLLBACK` to cancel it. In a comment, explain *why* rolling back is the right choice here.

3. **(Savepoint)** Write a transaction that inserts a new account, sets a savepoint, attempts an operation that fails, rolls back to the savepoint, and then commits — so only the new account creation is saved.

4. **(Explain the four problems in comments)** For each of the four concurrency problems (lost update, dirty read, non-repeatable read, phantom read), write a 2–3 sentence scenario using your bank schema that would cause that problem. Then name the isolation level that prevents it.

5. **(Verify)** Write a final `SELECT` query showing all account balances. Confirm in a comment that the numbers match what you'd expect after tasks 1–3.
