# Module 14 — Data Warehousing and Analytics

## Two Very Different Jobs for a Database

Most of the databases you've built so far are designed to run a *business in real time* — recording a new order the moment a customer clicks "Buy," looking up a user's profile when they log in, updating inventory when a sale happens. This kind of database is called **OLTP** (Online Transaction Processing), and it's optimized for thousands of small, fast read/write operations happening every second.

But now imagine the CEO asks: "How did our sales compare between Q1 and Q2 last year? Which product categories are growing? Which regions are slowing down?" These questions don't need one row — they need to analyze *millions* of rows and find patterns over time.

A regular OLTP database is terrible at this. It's like trying to calculate the total words in a book by looking up one word at a time in the index.

A **data warehouse** is a *completely separate* database built specifically for this kind of big-picture analysis.

| | OLTP Database | Data Warehouse |
|---|---|---|
| Purpose | Run the business right now | Understand the business over time |
| Queries | Many small, targeted reads/writes | Few enormous, complex reads |
| Data | Current, live | Historical (months or years) |
| Schema | Normalized (3NF, split into many tables) | Denormalized (fewer, wider tables) |
| Optimized for | Writing speed | Reading and aggregation speed |

---

## The Star Schema — Simple and Fast

A data warehouse almost always uses a **star schema**, named because when you draw it, it looks like a star: one big table in the middle surrounded by smaller tables pointing outward.

- The **fact table** in the center holds measurable events — a sale, a click, a payment. It contains numbers (how many? how much?) and foreign keys to the surrounding tables.
- The **dimension tables** around it describe the *context* of each event — who, what, when, where.

```
fact_sales
├── date_key      → dim_date      (WHEN did it happen?)
├── product_key   → dim_product   (WHAT was sold?)
├── customer_key  → dim_customer  (WHO bought it?)
├── store_key     → dim_store     (WHERE was it sold?)
├── quantity_sold
└── revenue
```

When you want to answer "how much did we sell in Q3 by product category?", you join `fact_sales` to `dim_date` (to filter by Q3) and `dim_product` (to group by category). Because the design is so simple, these queries run fast even on billions of rows.

---

## The Date Dimension — Your Most Important Dimension

Nearly every analytical question involves time. The **date dimension** is a pre-built table where each row represents one calendar day and includes every useful attribute of that date — year, quarter, month name, whether it was a weekend, whether it was a holiday.

```sql
CREATE TABLE dim_date (
    date_key    INTEGER PRIMARY KEY,   -- e.g., 20240915 (YYYYMMDD as a number)
    full_date   DATE,
    year        INTEGER,
    quarter     INTEGER,               -- 1, 2, 3, or 4
    month       INTEGER,               -- 1 through 12
    month_name  TEXT,                  -- 'September'
    week        INTEGER,
    day_of_week TEXT,                  -- 'Thursday'
    is_weekend  BOOLEAN
);
```

Now instead of calling complex date functions in every query, you just join to `dim_date` and filter on `year = 2024 AND quarter = 3`. Simple.

---

## Window Functions — Calculations That See the Bigger Picture

Aggregate functions like `SUM()` and `AVG()` collapse rows into a single summary. But sometimes you want to *keep* all the rows and just add an extra column that shows a calculation across related rows.

That's what **window functions** do. The "window" is a set of rows the function looks at for each row in the output.

### Running Total

```sql
-- Show each sale and a running total of revenue so far
SELECT sale_date, revenue,
       SUM(revenue) OVER (ORDER BY sale_date) AS running_total
FROM fact_sales;
```

Each row gets its own running total — not a single collapsed sum. The `OVER` clause defines the "window."

### Rank Within a Group

```sql
-- Rank products by revenue within each category
SELECT product_name, category, revenue,
       RANK() OVER (PARTITION BY category ORDER BY revenue DESC) AS rank_in_category
FROM fact_sales
JOIN dim_product USING (product_key);
```

`PARTITION BY category` means "restart the ranking for each category." `ORDER BY revenue DESC` means "rank by revenue, highest first."

### Looking at Previous Rows: `LAG`

```sql
-- Compare this month's revenue to last month's
SELECT month_name, revenue,
       LAG(revenue) OVER (ORDER BY month) AS previous_month_revenue
FROM monthly_sales;
```

`LAG()` "looks back" one row. Incredibly useful for month-over-month or year-over-year comparisons.

---

## Assignment

**File to create:** `module_14_warehouse.sql`

Build a mini data warehouse for a fictional retail company.

**Schema to create:**

- **dim_date** — `date_key` PK (INTEGER YYYYMMDD format), `full_date`, `year`, `quarter`, `month`, `month_name`, `day_of_week`, `is_weekend`
- **dim_product** — `product_key` PK, `product_name`, `category`, `unit_price`
- **dim_customer** — `customer_key` PK, `customer_name`, `city`, `state`
- **fact_sales** — `sale_id` PK, `date_key` FK, `product_key` FK, `customer_key` FK, `quantity` INTEGER, `revenue` REAL

**Insert:**
- At least 10 rows in `dim_date` spanning two different months
- At least 4 products across 2 categories
- At least 5 customers
- At least 20 rows in `fact_sales`

**Tasks:**

1. Write a query that shows total revenue grouped by year and month, sorted from earliest to latest. (Join `fact_sales` → `dim_date`, group by year and month.)

2. Write a query that shows the top 3 products by total revenue. (Hint: `GROUP BY` product, `ORDER BY` total revenue descending, `LIMIT 3`.)

3. Write a query using `SUM(...) OVER (ORDER BY date_key)` to add a running total of revenue alongside each individual sale.

4. Write a query using `RANK() OVER (ORDER BY total_spent DESC)` to rank customers by how much they've spent in total.

5. Write a query using `LAG(revenue) OVER (ORDER BY month)` to show each month's revenue next to the previous month's revenue in the same row.

6. In a comment block of at least 8 sentences, explain: What is the difference between an OLTP database and a data warehouse? Why do warehouses use star schemas instead of normalized 3NF schemas? Why is the date dimension so useful?
