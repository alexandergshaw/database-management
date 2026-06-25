import { functionExists, hasRows, objectExists, type Db } from "@/lib/db";

export type ModuleType = "assignment" | "review" | "exam";

export interface Week {
  week: number;
  slug: string;
  /** Folder under /assignments holding INSTRUCTIONS.md + solution.sql. */
  folder: string;
  title: string;
  summary: string;
  type: ModuleType;
  /**
   * Has the student completed this week? Probed against the live database — a
   * module unlocks only when the objects the assignment asks for actually exist.
   */
  probe: (db: Db) => Promise<boolean>;
}

export const weeks: Week[] = [
  {
    week: 0,
    slug: "week-0-setup-deploy",
    folder: "week0",
    title: "Setup & Deploy",
    summary: "Connect Supabase + Vercel and run your first SQL: name your store.",
    type: "assignment",
    probe: (db) => hasRows(db, "store_settings"),
  },
  {
    week: 1,
    slug: "week-1-relational-foundations",
    folder: "week1",
    title: "Relational Foundations",
    summary: "Create your first table, products, and seed it. Product cards appear.",
    type: "assignment",
    probe: (db) => hasRows(db, "products"),
  },
  {
    week: 2,
    slug: "week-2-data-modeling",
    folder: "week2",
    title: "Data Modeling",
    summary: "Add suppliers and a product↔supplier link table. Cards show suppliers.",
    type: "assignment",
    probe: async (db) =>
      (await objectExists(db, "public.product_suppliers")) && (await hasRows(db, "suppliers")),
  },
  {
    week: 3,
    slug: "week-3-erds-business-rules",
    folder: "week3",
    title: "ERDs & Business Rules",
    summary: "Model categories many-to-many with a junction table and CHECK rules.",
    type: "assignment",
    probe: async (db) =>
      (await objectExists(db, "public.product_categories")) && (await hasRows(db, "categories")),
  },
  {
    week: 4,
    slug: "week-4-normalization",
    folder: "week4",
    title: "Normalization",
    summary: "Split a denormalized import table into 3NF tables you create.",
    type: "assignment",
    probe: async (db) =>
      (await hasRows(db, "nf_brands")) && (await objectExists(db, "public.nf_catalog")),
  },
  {
    week: 5,
    slug: "week-5-keys-constraints",
    folder: "week5",
    title: "Keys & Constraints",
    summary: "Add customers + addresses with keys, uniqueness, and referential integrity.",
    type: "assignment",
    probe: (db) => hasRows(db, "customers"),
  },
  {
    week: 6,
    slug: "week-6-review-1",
    folder: "review1",
    title: "Review 1",
    summary: "Build a view joining products to their suppliers.",
    type: "review",
    probe: (db) => objectExists(db, "public.review1_supplier_catalog"),
  },
  {
    week: 7,
    slug: "week-7-test-1",
    folder: "test1",
    title: "Test 1",
    summary: "Assessed views: products per category and inventory value.",
    type: "exam",
    probe: async (db) =>
      (await objectExists(db, "public.test1_products_per_category")) &&
      (await objectExists(db, "public.test1_inventory_value")),
  },
  {
    week: 8,
    slug: "week-8-sql-crud",
    folder: "week8",
    title: "SQL CRUD",
    summary: "Create orders + order_items and practice INSERT/UPDATE/DELETE on them.",
    type: "assignment",
    probe: (db) => hasRows(db, "orders"),
  },
  {
    week: 9,
    slug: "week-9-filtering-aggregation",
    folder: "week9",
    title: "Filtering & Aggregation",
    summary: "Create the store_stats view. A stats bar appears.",
    type: "assignment",
    probe: (db) => objectExists(db, "public.store_stats"),
  },
  {
    week: 10,
    slug: "week-10-joins",
    folder: "week10",
    title: "Joins",
    summary: "Create the order_history view joining orders, customers, and products.",
    type: "assignment",
    probe: (db) => objectExists(db, "public.order_history"),
  },
  {
    week: 11,
    slug: "week-11-review-2",
    folder: "review2",
    title: "Review 2",
    summary: "Build a top-sellers view.",
    type: "review",
    probe: (db) => objectExists(db, "public.review2_top_sellers"),
  },
  {
    week: 12,
    slug: "week-12-test-2",
    folder: "test2",
    title: "Test 2",
    summary: "Assessed views: spend by customer and products never ordered.",
    type: "exam",
    probe: async (db) =>
      (await objectExists(db, "public.test2_spend_by_customer")) &&
      (await objectExists(db, "public.test2_never_ordered")),
  },
  {
    week: 13,
    slug: "week-13-transactions",
    folder: "week13",
    title: "Transactions",
    summary: "Write an atomic place_order function over your own checkout tables.",
    type: "assignment",
    probe: (db) => functionExists(db, "place_order(text,integer)"),
  },
  {
    week: 14,
    slug: "week-14-security",
    folder: "week14",
    title: "Security & Access Control",
    summary: "Add an RLS-protected table and a safe public_catalog view.",
    type: "assignment",
    probe: (db) => objectExists(db, "public.public_catalog"),
  },
  {
    week: 15,
    slug: "week-15-analytics-performance",
    folder: "week15",
    title: "Analytics & Performance",
    summary: "Create the category_revenue analytics view. A revenue chart appears.",
    type: "assignment",
    probe: (db) => objectExists(db, "public.category_revenue"),
  },
  {
    week: 16,
    slug: "week-16-final",
    folder: "final",
    title: "Final Review & Presentation",
    summary: "Capstone views: category revenue and low-stock products.",
    type: "exam",
    probe: async (db) =>
      (await objectExists(db, "public.final_category_revenue")) &&
      (await objectExists(db, "public.final_low_stock")),
  },
];
