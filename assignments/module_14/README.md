# Module 14 — Data Warehousing and Analytics

## Introduction

Most databases are designed for fast, concurrent **transactional** workloads — inserting orders, updating customer records, processing payments. A **data warehouse** is designed for a very different purpose: answering analytical questions across large volumes of historical data.

### Operational vs. Analytical Databases

| Aspect | Operational (OLTP) | Analytical (OLAP / Warehouse) |
|---|---|---|
| Purpose | Record transactions | Analyze trends and history |
| Query type | Many small, targeted reads/writes | Few large, complex reads |
| Data age | Current | Historical (months–years) |
| Schema style | Normalized (3NF) | Denormalized (star/snowflake) |
| Optimization | Write speed, concurrency | Read speed, aggregation |

### Star Schema

A **star schema** organizes a data warehouse into:
- One central **fact table** that records measurable events (sales, clicks, transactions).
- Multiple **dimension tables** that provide context (who, what, when, where).

```
fact_sales
├── date_key        → dim_date
├── product_key     → dim_product
├── customer_key    → dim_customer
├── store_key       → dim_store
├── quantity_sold
└── revenue
```

### Fact and Dimension Tables

- **Fact table** — rows represent events; columns are foreign keys to dimensions and numeric measures.
- **Dimension table** — rows describe entities; columns are descriptive attributes used for filtering and grouping.

### Date Dimension

A **date dimension** is one of the most important dimensions. It pre-computes calendar attributes for every date so analytical queries can group by year, quarter, month, day-of-week, etc. without complex date functions.

```sql
CREATE TABLE dim_date (
    date_key     INTEGER PRIMARY KEY,  -- e.g., 20240115
    full_date    DATE,
    year         INTEGER,
    quarter      INTEGER,
    month        INTEGER,
    month_name   TEXT,
    week         INTEGER,
    day_of_week  TEXT,
    is_weekend   BOOLEAN
);
```

### Window Functions

**Window functions** perform calculations across a set of rows related to the current row, *without* collapsing rows the way `GROUP BY` does.

```sql
-- Running total of revenue over time
SELECT sale_date, revenue,
       SUM(revenue) OVER (ORDER BY sale_date) AS running_total
FROM fact_sales;

-- Rank products by revenue within each category
SELECT product_name, category, revenue,
       RANK() OVER (PARTITION BY category ORDER BY revenue DESC) AS rank_in_category
FROM fact_sales JOIN dim_product USING (product_key);
```

Common window functions: `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `SUM()`, `AVG()`, `LAG()`, `LEAD()`.

---

## Assignment

**File to create:** `module_14_warehouse.sql`

Build a mini data warehouse for a retail company.

**Schema to create:**

- **dim_date** — `date_key` PK (INTEGER YYYYMMDD), `full_date`, `year`, `quarter`, `month`, `month_name`, `day_of_week`, `is_weekend`
- **dim_product** — `product_key` PK, `product_name`, `category`, `unit_price`
- **dim_customer** — `customer_key` PK, `customer_name`, `city`, `state`
- **fact_sales** — `sale_id` PK, `date_key` FK, `product_key` FK, `customer_key` FK, `quantity` INTEGER, `revenue` REAL

Insert:
- At least 10 rows in `dim_date` spanning two months.
- At least 4 products across 2 categories.
- At least 5 customers.
- At least 20 rows in `fact_sales`.

Tasks:

1. Write a query that shows total revenue by year and month, sorted chronologically.
2. Write a query that shows the top 3 products by total revenue.
3. Write a query using a window function (`SUM … OVER`) to compute a running total of revenue ordered by date.
4. Write a query that ranks customers by total spending using `RANK() OVER`.
5. Write a query using `LAG()` to show each month's revenue alongside the previous month's revenue in the same row.
6. In comments, explain the difference between an OLTP database and a data warehouse, and why normalization is less important in a warehouse context.
