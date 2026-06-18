import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { PGlite } from "@electric-sql/pglite";

/**
 * The migrations harness runs the student's SQL migrations against a fresh,
 * in-process PostgreSQL instance (pglite). The exact same SQL that Supabase
 * applies in production is replayed here, so a passing test means the migration
 * is safe to push. No Docker or external database required.
 */

const MIGRATIONS_DIR = path.join(process.cwd(), "supabase", "migrations");
const ASSIGNMENTS_DIR = path.join(process.cwd(), "assignments");

// Supabase databases ship with these roles; vanilla Postgres does not. Create
// them up front so migrations that reference them (e.g. RLS GRANTs to `anon`)
// apply cleanly in the in-process test database too.
const BOOTSTRAP_ROLES = `
do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then create role anon nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then create role authenticated nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'service_role') then create role service_role nologin; end if;
end
$$;
`;

export function listMigrationFiles(): string[] {
  return readdirSync(MIGRATIONS_DIR)
    .filter((file) => file.endsWith(".sql"))
    .sort();
}

export function readMigration(file: string): string {
  return readFileSync(path.join(MIGRATIONS_DIR, file), "utf8");
}

/** Read a file from an assignment folder (used by query-based assessments). */
export function readAssignmentFile(folder: string, file: string): string {
  return readFileSync(path.join(ASSIGNMENTS_DIR, folder, file), "utf8");
}

/**
 * Build a fresh database with migrations applied in order.
 *
 * Pass `through` (a migration filename or its numeric prefix, e.g. "0001") to
 * stop after that migration — per-week tests replay only weeks 0..N so each
 * assignment is graded on the cumulative schema it inherits.
 */
export async function buildDatabase(through?: string): Promise<PGlite> {
  const db = new PGlite();
  const cutoff = through ? prefixOf(through) : null;

  await db.exec(BOOTSTRAP_ROLES);

  for (const file of listMigrationFiles()) {
    if (cutoff !== null && prefixOf(file) > cutoff) {
      break;
    }
    await db.exec(readMigration(file));
  }

  return db;
}

function prefixOf(value: string): string {
  const match = value.match(/^(\d+)/);
  return match ? match[1] : value;
}
