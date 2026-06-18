export type ModuleType = "assignment" | "review" | "exam";

export interface CourseModule {
  week: number;
  slug: string;
  /** Folder under /assignments holding INSTRUCTIONS.md + test.ts. */
  folder: string;
  /** Migration filename prefix this week ships, when it has one. */
  migrationPrefix?: string;
  title: string;
  summary: string;
  type: ModuleType;
}

// A module unlocks when the tests in its folder pass (see lib/progress.ts +
// lib/test-status.ts). The homepage feature each week powers renders from the
// live database independently (see lib/store-data.ts).
export const courseModules: CourseModule[] = [
  {
    week: 0,
    slug: "week-0-setup-deploy",
    folder: "week0",
    migrationPrefix: "0000",
    title: "Setup & Deploy",
    summary: "Wire up Supabase + Vercel and ship your first migration: name your store.",
    type: "assignment",
  },
  {
    week: 1,
    slug: "week-1-relational-foundations",
    folder: "week1",
    migrationPrefix: "0001",
    title: "Relational Foundations",
    summary: "Create your first table, products, and seed it. Product cards appear.",
    type: "assignment",
  },
  {
    week: 2,
    slug: "week-2-data-modeling",
    folder: "week2",
    migrationPrefix: "0002",
    title: "Data Modeling",
    summary: "Add suppliers and relate products to them. Each card shows its supplier.",
    type: "assignment",
  },
  {
    week: 3,
    slug: "week-3-erds-business-rules",
    folder: "week3",
    migrationPrefix: "0003",
    title: "ERDs & Business Rules",
    summary: "Model categories (many-to-many) and add constraints. Cards gain chips.",
    type: "assignment",
  },
  {
    week: 4,
    slug: "week-4-normalization",
    folder: "week4",
    migrationPrefix: "0004",
    title: "Normalization",
    summary: "Move supplier country to where it belongs (3NF). Suppliers panel fills in.",
    type: "assignment",
  },
  {
    week: 5,
    slug: "week-5-keys-constraints",
    folder: "week5",
    migrationPrefix: "0005",
    title: "Keys & Constraints",
    summary: "Add customers with proper keys, uniqueness, and integrity.",
    type: "assignment",
  },
  {
    week: 6,
    slug: "week-6-review-1",
    folder: "review1",
    title: "Review 1",
    summary: "Consolidated query drills across weeks 1-5.",
    type: "review",
  },
  {
    week: 7,
    slug: "week-7-test-1",
    folder: "test1",
    title: "Test 1",
    summary: "Assessed schema design and querying.",
    type: "exam",
  },
  {
    week: 8,
    slug: "week-8-sql-crud",
    folder: "week8",
    migrationPrefix: "0008",
    title: "SQL CRUD",
    summary: "INSERT/UPDATE/DELETE orders and inventory. Recent orders appear.",
    type: "assignment",
  },
  {
    week: 9,
    slug: "week-9-filtering-aggregation",
    folder: "week9",
    migrationPrefix: "0009",
    title: "Filtering & Aggregation",
    summary: "Build the store_stats view. A stats bar appears.",
    type: "assignment",
  },
  {
    week: 10,
    slug: "week-10-joins",
    folder: "week10",
    migrationPrefix: "0010",
    title: "Joins",
    summary: "Join orders, customers, and products into an order-history view.",
    type: "assignment",
  },
  {
    week: 11,
    slug: "week-11-review-2",
    folder: "review2",
    title: "Review 2",
    summary: "Query drills for joins and aggregation.",
    type: "review",
  },
  {
    week: 12,
    slug: "week-12-test-2",
    folder: "test2",
    title: "Test 2",
    summary: "Assessed querying, filtering, and joins.",
    type: "exam",
  },
  {
    week: 13,
    slug: "week-13-transactions",
    folder: "week13",
    migrationPrefix: "0013",
    title: "Transactions",
    summary: "Write an atomic place_order function (insert order + decrement stock).",
    type: "assignment",
  },
  {
    week: 14,
    slug: "week-14-security",
    folder: "week14",
    migrationPrefix: "0014",
    title: "Security & Access Control",
    summary: "Add RLS and a public_catalog view. A security panel appears.",
    type: "assignment",
  },
  {
    week: 15,
    slug: "week-15-analytics-performance",
    folder: "week15",
    migrationPrefix: "0015",
    title: "Analytics & Performance",
    summary: "Add indexes and the category_revenue view. A revenue chart appears.",
    type: "assignment",
  },
  {
    week: 16,
    slug: "week-16-final",
    folder: "final",
    title: "Final Review & Presentation",
    summary: "Capstone: the fully assembled storefront is your demo.",
    type: "exam",
  },
];
