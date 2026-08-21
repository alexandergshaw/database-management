# Module 13 — Procedural SQL

## From "What Do I Want?" to "Here's How to Do It"

All the SQL you've written so far has been **declarative** — you describe *what* result you want, and the database figures out *how* to get it. `SELECT * FROM orders WHERE status = 'pending'` says "give me pending orders" — you don't specify which rows to check or in what order.

But sometimes the logic you need is too complicated to express as a single query. Maybe you need to:
- Check a condition, then do different things depending on the answer
- Loop through a list of rows and process each one
- Automatically update several tables every time something happens

That's where **procedural SQL** comes in. It adds programming-style features (variables, IF statements, loops) directly into the database. The logic lives *inside* the database, runs automatically, and is available to any application that connects to it.

> **Note:** The syntax in this module is **PostgreSQL** (`PL/pgSQL`). If you're using SQLite, SQLite doesn't support stored procedures or triggers natively in SQL — write the code as shown and add a comment on each section noting this limitation.

---

## Functions — A Reusable Calculation

A **function** is a block of SQL logic that you give a name to, and then call whenever you need it. It takes inputs, does something with them, and returns a result — exactly like a function in Python or JavaScript.

```sql
-- Define the function once
CREATE OR REPLACE FUNCTION calculate_tax(price NUMERIC, tax_rate NUMERIC)
RETURNS NUMERIC AS $$
BEGIN
    RETURN price * tax_rate;
END;
$$ LANGUAGE plpgsql;

-- Call it in a query — now every product automatically shows its tax
SELECT name, price, calculate_tax(price, 0.08) AS tax_amount
FROM products;
```

The `$$` marks are just delimiters that tell the database where the function body starts and ends.

---

## Stored Procedures — A Multi-Step Operation With a Name

A **stored procedure** is like a function, but it's designed for complex operations that have side effects (like inserting into multiple tables or sending notifications). You call it with `CALL`.

```sql
CREATE OR REPLACE PROCEDURE process_order(
    p_customer_id INTEGER,
    p_product_id  INTEGER,
    p_quantity    INTEGER
)
LANGUAGE plpgsql AS $$
BEGIN
    -- Step 1: Reduce the stock
    UPDATE products
    SET stock = stock - p_quantity
    WHERE product_id = p_product_id;

    -- Step 2: Create the order record
    INSERT INTO orders (customer_id, product_id, quantity, order_date)
    VALUES (p_customer_id, p_product_id, p_quantity, CURRENT_DATE);

    COMMIT;
END;
$$;

-- Call it
CALL process_order(42, 7, 3);
```

Now any app that needs to place an order just calls `process_order` — the logic is in one place, not scattered across different apps.

---

## Triggers — Automatic Reactions to Database Events

A **trigger** is a procedure that fires automatically when something happens to a table — an insert, update, or delete. You set it up once and forget about it; the database handles it from then on.

**Analogy:** Think of a trigger like a motion-sensor light. You don't manually flip the switch every time you enter a room. You set up the sensor once, and after that the light turns on automatically whenever you walk in.

**Example: Automatically record when a row was last changed**

```sql
-- Step 1: Write the trigger function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;   -- set the timestamp on the NEW (incoming) row
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 2: Attach the trigger to a table
CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
```

Now whenever any product row is updated, the `updated_at` column automatically gets set to the current time. You never have to remember to set it in your queries.

**Example: Automatically recalculate a total after line items change**

```sql
CREATE OR REPLACE FUNCTION recalculate_order_total()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE orders
    SET total = (
        SELECT SUM(quantity * unit_price)
        FROM order_items
        WHERE order_id = NEW.order_id
    )
    WHERE order_id = NEW.order_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_order_total
AFTER INSERT OR UPDATE OR DELETE ON order_items
FOR EACH ROW EXECUTE FUNCTION recalculate_order_total();
```

Every time an order item is added, changed, or removed, the order's total is automatically recalculated. Clean.

---

## Assignment

**File to create:** `module_13_procedural.sql`

> Use PostgreSQL syntax. Add a comment on any statement that SQLite doesn't support, noting the limitation.

**Schema:**
- **products** — `product_id` PK, `name`, `price` NUMERIC NOT NULL, `stock` INTEGER NOT NULL DEFAULT 0, `last_updated` TIMESTAMP
- **sales** — `sale_id` PK AUTOINCREMENT, `product_id` FK, `quantity` INTEGER NOT NULL, `sale_total` NUMERIC, `sale_date` TIMESTAMP DEFAULT NOW()

Insert 5 products with realistic names, prices, and stock levels.

**Tasks:**

1. **(Function)** Create a function `discounted_price(p_product_id INTEGER, discount_pct NUMERIC)` that returns the price of the given product after applying the discount. Test it by writing a `SELECT` that shows every product's name alongside its price at 15% off.

2. **(Stored procedure)** Create a procedure `record_sale(p_product_id INTEGER, p_quantity INTEGER)` that:
   - Checks if `stock >= p_quantity`. If not, raises an exception with the message `'Insufficient stock'`.
   - Subtracts `p_quantity` from the product's `stock`.
   - Inserts a row into `sales` with the correct `sale_total` (price × quantity).
   Write a comment explaining what would happen if you didn't wrap this in a single procedure — what could go wrong if an app did these steps separately?

3. **(Trigger — timestamp)** Create a trigger that automatically sets `products.last_updated` to `CURRENT_TIMESTAMP` every time a product row is updated.

4. **(Trigger — low stock warning)** Create a trigger on the `sales` table that, after each insert, raises a notice (`RAISE NOTICE`) if the product's remaining stock has dropped below 5.

5. **(Test it)** Call `record_sale` for three different products. Then `SELECT * FROM products` and `SELECT * FROM sales` to confirm the stock levels went down and the sales were recorded correctly.
