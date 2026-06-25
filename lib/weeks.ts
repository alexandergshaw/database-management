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

// Cadence (matches the data-structures template): three blocks of three
// assignments, each block followed by a Review then a Test.
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
    slug: "week-1-relational-keys",
    folder: "week01",
    title: "Relational Foundations & Keys",
    summary: "Create planets and astronomers with keys, constraints, and integrity.",
    type: "assignment",
    probe: async (db) =>
      (await hasRows(db, "planets")) &&
      (await hasRows(db, "astronomers")) &&
      (await objectExists(db, "public.astronomer_sites")),
  },
  {
    week: 2,
    slug: "week-2-modeling-erds",
    folder: "week02",
    title: "Data Modeling & ERDs",
    summary: "Add moons (1:M) and missions (M:N junction) plus a CHECK rule.",
    type: "assignment",
    probe: async (db) =>
      (await objectExists(db, "public.moons")) &&
      (await hasRows(db, "moons")) &&
      (await objectExists(db, "public.mission_targets")) &&
      (await hasRows(db, "missions")),
  },
  {
    week: 3,
    slug: "week-3-review-1",
    folder: "review01",
    title: "Review 1",
    summary: "Views consolidating weeks 1-2.",
    type: "review",
    probe: async (db) =>
      (await objectExists(db, "public.review1_planet_moons")) &&
      (await objectExists(db, "public.review1_planet_missions")) &&
      (await objectExists(db, "public.review1_astronomer_directory")),
  },
  {
    week: 4,
    slug: "week-4-test-1",
    folder: "test01",
    title: "Test 1",
    summary: "Assessed views across weeks 1-2.",
    type: "exam",
    probe: async (db) =>
      (await objectExists(db, "public.test1_planets_per_type")) &&
      (await objectExists(db, "public.test1_avg_radius")) &&
      (await objectExists(db, "public.test1_missions_by_agency")),
  },
  {
    week: 5,
    slug: "week-5-normalization",
    folder: "week05",
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
    week: 6,
    slug: "week-6-sql-crud",
    folder: "week06",
    title: "SQL CRUD",
    summary: "Create observations and practice INSERT/UPDATE/DELETE/SELECT.",
    type: "assignment",
    probe: (db) => hasRows(db, "observations"),
  },
  {
    week: 7,
    slug: "week-7-filtering-aggregation",
    folder: "week07",
    title: "Filtering & Aggregation",
    summary: "Build the catalog_stats + inner_planets views. A stats bar appears.",
    type: "assignment",
    probe: async (db) =>
      (await objectExists(db, "public.catalog_stats")) &&
      (await objectExists(db, "public.inner_planets")),
  },
  {
    week: 8,
    slug: "week-8-review-2",
    folder: "review02",
    title: "Review 2",
    summary: "Views consolidating weeks 5-7.",
    type: "review",
    probe: async (db) =>
      (await objectExists(db, "public.review2_body_normalized")) &&
      (await objectExists(db, "public.review2_obs_by_status")) &&
      (await objectExists(db, "public.review2_close_planets")),
  },
  {
    week: 9,
    slug: "week-9-test-2",
    folder: "test02",
    title: "Test 2",
    summary: "Assessed views across weeks 5-7.",
    type: "exam",
    probe: async (db) =>
      (await objectExists(db, "public.test2_star_body_counts")) &&
      (await objectExists(db, "public.test2_never_observed")) &&
      (await objectExists(db, "public.test2_cold_planets")),
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
    slug: "week-11-transactions-security",
    folder: "week11",
    title: "Transactions & Security",
    summary: "Write an atomic booking function, add RLS, and a public_catalog view.",
    type: "assignment",
    probe: async (db) =>
      (await functionExists(db, "book_nights(text,integer)")) &&
      (await objectExists(db, "public.public_catalog")),
  },
  {
    week: 12,
    slug: "week-12-analytics-performance",
    folder: "week12",
    title: "Analytics & Performance",
    summary: "Create the type_summary analytics view. A chart appears.",
    type: "assignment",
    probe: (db) => objectExists(db, "public.type_summary"),
  },
  {
    week: 13,
    slug: "week-13-review-3",
    folder: "review03",
    title: "Review 3",
    summary: "Views consolidating weeks 10-12.",
    type: "review",
    probe: async (db) =>
      (await objectExists(db, "public.review3_busiest_observers")) &&
      (await objectExists(db, "public.review3_booking_log")) &&
      (await objectExists(db, "public.review3_public_listing")) &&
      (await objectExists(db, "public.review3_type_summary")),
  },
  {
    week: 14,
    slug: "week-14-test-3",
    folder: "test03",
    title: "Test 3",
    summary: "Assessed views across weeks 10-12.",
    type: "exam",
    probe: async (db) =>
      (await objectExists(db, "public.test3_obs_by_astronomer")) &&
      (await objectExists(db, "public.test3_bookings_by_telescope")) &&
      (await objectExists(db, "public.test3_public_by_type")) &&
      (await objectExists(db, "public.test3_max_radius_by_type")),
  },
];
