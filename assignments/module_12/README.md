# Module 12 — Transactions and Concurrency

## Introduction

When multiple users or processes interact with a database simultaneously, things can go wrong — data can be lost, corrupted, or become inconsistent. **Transactions** and **concurrency controls** prevent these problems.

### ACID Properties

Every transaction in a well-designed database must satisfy four properties:

| Property | Meaning |
|----------|---------|
| **Atomicity** | All operations in a transaction succeed together, or none of them do. There is no partial success. |
| **Consistency** | A transaction takes the database from one valid state to another valid state. It cannot violate constraints. |
| **Isolation** | Concurrent transactions do not interfere with each other; each sees a consistent view of the data. |
| **Durability** | Once a transaction commits, its changes are permanent — even if the system crashes immediately after. |

### Transaction Control Statements

```sql
-- Begin a transaction
BEGIN;

-- Make some changes
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;

-- Save changes permanently
COMMIT;

-- Or undo all changes since BEGIN
ROLLBACK;
```

**Savepoints** let you roll back to a specific point within a transaction:

```sql
BEGIN;
INSERT INTO orders (customer_id, order_date) VALUES (1, '2024-01-15');
SAVEPOINT after_order;
INSERT INTO order_items (order_id, product_id, quantity) VALUES (99, 5, 2);
-- Something went wrong with order_items — roll back to savepoint only
ROLLBACK TO after_order;
-- The order INSERT is still in play; commit just that
COMMIT;
```

### Locks

Databases use **locks** to prevent conflicting access:
- **Shared lock (read lock)** — multiple transactions can hold this simultaneously; used for reads.
- **Exclusive lock (write lock)** — only one transaction can hold this; used for writes.

### Isolation Levels

Higher isolation provides more protection but reduces concurrency (throughput).

| Level | Dirty Reads | Non-Repeatable Reads | Phantom Reads |
|-------|-------------|----------------------|---------------|
| READ UNCOMMITTED | Possible | Possible | Possible |
| READ COMMITTED | Prevented | Possible | Possible |
| REPEATABLE READ | Prevented | Prevented | Possible |
| SERIALIZABLE | Prevented | Prevented | Prevented |

```sql
-- Set isolation level (syntax varies by database)
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

### Concurrency Problems

- **Lost update** — two transactions read the same value, both modify it, and one overwrites the other's change.
- **Dirty read** — a transaction reads data written by another transaction that has not yet committed.
- **Non-repeatable read** — a transaction reads the same row twice and gets different values because another transaction modified it in between.
- **Phantom read** — a transaction re-executes a query and gets different rows because another transaction inserted or deleted rows in between.

---

## Assignment

**File to create:** `module_12_transactions.sql`

Use a **bank account** schema:

- **accounts** — `account_id` PK, `owner_name` NOT NULL, `balance` REAL NOT NULL CHECK (balance >= 0)
- **transactions** — `txn_id` PK AUTOINCREMENT, `from_account` FK (nullable), `to_account` FK (nullable), `amount` REAL NOT NULL CHECK (amount > 0), `txn_type` TEXT, `txn_timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP

Insert 4 accounts with initial balances.

1. **(Successful transfer)** Write a transaction that transfers $150 from account 1 to account 2. Both `UPDATE` statements and one `INSERT` into `transactions` must be inside the same `BEGIN … COMMIT` block.
2. **(Failed transaction / ROLLBACK)** Write a transaction that attempts to withdraw $10,000 from an account that only has $200. Use a `ROLLBACK` to cancel it. Explain in a comment why ROLLBACK is the correct action.
3. **(Savepoint)** Write a transaction that inserts a new account, sets a savepoint, then tries an operation that should fail. Roll back to the savepoint and commit only the new account insert.
4. **(Explain in comments)** For each of the four concurrency problems (lost update, dirty read, non-repeatable read, phantom read), write a short scenario using the bank schema that would cause that problem, and state which isolation level would prevent it.
5. **(Verify)** After all transactions, write a `SELECT` that shows all account balances and verify they are consistent with the operations above.
