import { functionExists, hasRows, objectExists, type Db } from "@/lib/db";

export type ModuleType = "assignment" | "review" | "exam";

export interface Week {
  week: number;
  slug: string;
  /** Folder under /assignments holding INSTRUCTIONS.md + starter.sql + solution.sql. */
  folder: string;
  title: string;
  summary: string;
  type: ModuleType;
  /** Probed against the live database; a module unlocks only when its objects exist. */
  probe: (db: Db) => Promise<boolean>;
}

export const weeks: Week[] = [
  {
    week: 0,
    slug: "week-0-setup-deploy",
    folder: "week00",
    title: "Setup & Deploy",
    summary: "Connect Supabase + Vercel and run your first SQL: name your catalog.",
    type: "assignment",
    probe: (db) => hasRows(db, "catalog_settings"),
  },
  {
    week: 1,
    slug: "week-1-relational-foundations",
    folder: "week01",
    title: "Relational Foundations",
    summary: "Create your first table, planets, and seed it. Planet cards appear.",
    type: "assignment",
    probe: (db) => hasRows(db, "planets"),
  },
  {
    week: 2,
    slug: "week-2-data-modeling",
    folder: "week02",
    title: "Data Modeling",
    summary: "Add moons related to planets (one-to-many). Cards show moon counts.",
    type: "assignment",
    probe: async (db) =>
      (await objectExists(db, "public.moons")) && (await hasRows(db, "moons")),
  },
  {
    week: 3,
    slug: "week-3-erds-business-rules",
    folder: "week03",
    title: "ERDs & Business Rules",
    summary: "Model missions many-to-many with planets, plus a CHECK rule.",
    type: "assignment",
    probe: async (db) =>
      (await objectExists(db, "public.mission_targets")) && (await hasRows(db, "missions")),
  },
  {
    week: 4,
    slug: "week-4-normalization",
    folder: "week04",
    title: "Normalization",
    summary: "Split denormalized import tables into 1NF, 2NF, and 3NF.",
    type: "assignment",
    probe: async (db) =>
      (await hasRows(db, "nf_stars")) &&
      (await objectExists(db, "public.nf_bodies")) &&
      (await objectExists(db, "public.planet_gases")) &&
      (await objectExists(db, "public.instruments")),
  },
  {
    week: 5,
    slug: "week-5-keys-constraints",
    folder: "week05",
    title: "Keys & Constraints",
    summary: "Add astronomers + sites with keys, uniqueness, and integrity.",
    type: "assignment",
    probe: (db) => hasRows(db, "astronomers"),
  },
  {
    week: 6,
    slug: "week-6-review-1",
    folder: "review01",
    title: "Review 1",
    summary: "Views consolidating weeks 1-5.",
    type: "review",
    probe: async (db) =>
      (await objectExists(db, "public.review1_planet_moons")) &&
      (await objectExists(db, "public.review1_planet_missions")) &&
      (await objectExists(db, "public.review1_body_normalized")) &&
      (await objectExists(db, "public.review1_astronomer_directory")),
  },
  {
    week: 7,
    slug: "week-7-test-1",
    folder: "test01",
    title: "Test 1",
    summary: "Assessed views across weeks 1-5.",
    type: "exam",
    probe: async (db) =>
      (await objectExists(db, "public.test1_planets_per_type")) &&
      (await objectExists(db, "public.test1_avg_radius")) &&
      (await objectExists(db, "public.test1_missions_by_agency")) &&
      (await objectExists(db, "public.test1_star_body_counts")),
  },
  {
    week: 8,
    slug: "week-8-sql-crud",
    folder: "week08",
    title: "SQL CRUD",
    summary: "Create observations and practice INSERT/UPDATE/DELETE/SELECT.",
    type: "assignment",
    probe: (db) => hasRows(db, "observations"),
  },
  {
    week: 9,
    slug: "week-9-filtering-aggregation",
    folder: "week09",
    title: "Filtering & Aggregation",
    summary: "Build the catalog_stats + inner_planets views. A stats bar appears.",
    type: "assignment",
    probe: async (db) =>
      (await objectExists(db, "public.catalog_stats")) &&
      (await objectExists(db, "public.inner_planets")),
  },
  {
    week: 10,
    slug: "week-10-joins",
    folder: "week10",
    title: "Joins",
    summary: "Join observations, astronomers, and planets into a log view.",
    type: "assignment",
    probe: async (db) =>
      (await objectExists(db, "public.observation_log")) &&
      (await objectExists(db, "public.planet_observation_counts")),
  },
  {
    week: 11,
    slug: "week-11-review-2",
    folder: "review02",
    title: "Review 2",
    summary: "Views for weeks 8-10.",
    type: "review",
    probe: async (db) =>
      (await objectExists(db, "public.review2_most_observed")) &&
      (await objectExists(db, "public.review2_close_planets")) &&
      (await objectExists(db, "public.review2_obs_by_status")),
  },
  {
    week: 12,
    slug: "week-12-test-2",
    folder: "test02",
    title: "Test 2",
    summary: "Assessed querying, filtering, and joins.",
    type: "exam",
    probe: async (db) =>
      (await objectExists(db, "public.test2_obs_by_astronomer")) &&
      (await objectExists(db, "public.test2_never_observed")) &&
      (await objectExists(db, "public.test2_obs_by_magnitude")),
  },
  {
    week: 13,
    slug: "week-13-transactions",
    folder: "week13",
    title: "Transactions",
    summary: "Write an atomic telescope-booking function over your own tables.",
    type: "assignment",
    probe: (db) => functionExists(db, "book_nights(text,integer)"),
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
    summary: "Create the type_summary analytics view. A chart appears.",
    type: "assignment",
    probe: (db) => objectExists(db, "public.type_summary"),
  },
  {
    week: 16,
    slug: "week-16-final",
    folder: "final",
    title: "Final Review & Presentation",
    summary: "Capstone views: type summary, moon leaders, bookings, public listing.",
    type: "exam",
    probe: async (db) =>
      (await objectExists(db, "public.final_type_summary")) &&
      (await objectExists(db, "public.final_moon_leaders")) &&
      (await objectExists(db, "public.final_booking_log")) &&
      (await objectExists(db, "public.final_public_listing")),
  },
];
