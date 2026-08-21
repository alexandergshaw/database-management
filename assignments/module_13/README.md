# Module 13 — Procedural SQL

## Introduction

Most SQL is *declarative* — you say *what* you want and the database figures out *how* to get it. **Procedural SQL** adds programming-style constructs (variables, loops, conditionals) that let you express *how* to perform complex multi-step operations inside the database itself.

The syntax varies by database. This module uses **PostgreSQL** syntax (`PL/pgSQL`). If you are using SQLite, write the code as shown and note in comments that SQLite would require an external language (Python, etc.) for equivalent procedural logic.

### Database Functions

A **function** takes inputs, performs computation, and returns a result. Functions can be called inside `SELECT`, `WHERE`, or other SQL expressions.

```sql
CREATE OR REPLACE FUNCTION calculate_tax(price NUMERIC, rate NUMERIC)
RETURNS NUMERIC AS $$
BEGIN
    RETURN price * rate;
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT name, price, calculate_tax(price, 0.08) AS tax FROM products;
```

### Stored Procedures

A **stored procedure** is like a function but is called with `CALL` and typically does not return a value (though it can use `OUT` parameters). Procedures are best for multi-step operations with side effects.

```sql
CREATE OR REPLACE PROCEDURE transfer_funds(
    from_id INTEGER, to_id INTEGER, amount NUMERIC
)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE accounts SET balance = balance - amount WHERE account_id = from_id;
    UPDATE accounts SET balance = balance + amount WHERE account_id = to_id;
    COMMIT;
END;
$$;

-- Usage
CALL transfer_funds(1, 2, 200.00);
```

### Triggers

A **trigger** is a function that executes automatically in response to a database event (`INSERT`, `UPDATE`, or `DELETE`).

```sql
-- Step 1: create the trigger function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 2: attach it to a table
CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
```

Now every time a row in `products` is updated, `updated_at` is automatically set to the current timestamp.

### Automated Calculations with Triggers

Triggers can maintain derived columns automatically:

```sql
CREATE OR REPLACE FUNCTION update_order_total()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE orders
    SET total = (
        SELECT SUM(quantity * unit_price) FROM order_items WHERE order_id = NEW.order_id
    )
    WHERE order_id = NEW.order_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_recalculate_total
AFTER INSERT OR UPDATE OR DELETE ON order_items
FOR EACH ROW EXECUTE FUNCTION update_order_total();
```

---

## Assignment

**File to create:** `module_13_procedural.sql`

> Use PostgreSQL syntax. If using SQLite, annotate each section with a comment explaining what SQLite limitation applies.

Schema:
- **products** — `product_id` PK, `name`, `price` NUMERIC, `stock` INTEGER, `last_updated` TIMESTAMP
- **sales** — `sale_id` PK AUTOINCREMENT, `product_id` FK, `quantity` INTEGER, `sale_total` NUMERIC, `sale_date` TIMESTAMP DEFAULT NOW()

Insert 5 products with prices and stock levels.

1. **(Function)** Create a function `discounted_price(product_id INTEGER, discount_pct NUMERIC)` that returns the price of the given product after applying the discount percentage. Call it in a `SELECT` to show all product names with their discounted prices at 15% off.

2. **(Stored procedure)** Create a procedure `record_sale(p_product_id INTEGER, p_quantity INTEGER)` that:
   - Checks whether `stock >= p_quantity`. If not, raise an exception with the message `'Insufficient stock'`.
   - Deducts `p_quantity` from the product's `stock`.
   - Inserts a row into `sales` with the correct `sale_total` (`price * quantity`).

3. **(Trigger — timestamp)** Create a trigger that automatically updates `products.last_updated` to `CURRENT_TIMESTAMP` whenever a product row is updated.

4. **(Trigger — stock check)** Create a trigger on `sales` that, after each insert, raises a warning (using `RAISE NOTICE`) if the product's remaining stock falls below 5.

5. **(Test)** Call `record_sale` three times, then `SELECT * FROM products` and `SELECT * FROM sales` to verify the results.
