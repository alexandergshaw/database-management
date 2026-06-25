import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { weeks } from "@/lib/weeks";

export type Row = Record<string, unknown>;

export interface Db {
  query: (sql: string) => Promise<Row[]>;
  dispose?: () => Promise<void>;
}

// Supabase ships these roles; vanilla Postgres (pglite) doesn't. Create them so
// the Week 14 security SQL (RLS GRANTs to `anon`) applies in local preview too.
const BOOTSTRAP_ROLES = `
do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then create role anon nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then create role authenticated nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'service_role') then create role service_role nologin; end if;
end
$$;
`;

let pool: { query: (sql: string) => Promise<{ rows: Row[] }> } | null = null;

/**
 * Returns a database to read from. In production (SUPABASE_DB_URL set) this is
 * the student's live Supabase project — exactly what they ran in the SQL editor.
 * Locally it's an in-process Postgres seeded from the reference solution.sql
 * files, so the template homepage renders without any connection.
 */
export async function getDb(): Promise<Db> {
  const url = process.env.SUPABASE_DB_URL;
  return url ? getProdDb(url) : getLocalDb();
}

async function getProdDb(connectionString: string): Promise<Db> {
  if (!pool) {
    const { Pool } = await import("pg");
    pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false }, max: 3 });
  }
  return { query: async (sql) => (await pool!.query(sql)).rows };
}

async function getLocalDb(): Promise<Db> {
  const { PGlite } = await import("@electric-sql/pglite");
  const db = new PGlite();
  await db.exec(BOOTSTRAP_ROLES);

  for (const week of weeks) {
    const file = path.join(process.cwd(), "assignments", week.folder, "solution.sql");
    if (!existsSync(file)) continue;
    try {
      await db.exec(readFileSync(file, "utf8"));
    } catch {
      // A week not yet solved just stays absent — its features render locked.
    }
  }

  return {
    query: async (sql) => (await db.query<Row>(sql)).rows,
    dispose: () => db.close(),
  };
}

// --- probe helpers (used by week definitions) ---

export async function objectExists(db: Db, identifier: string): Promise<boolean> {
  try {
    const rows = await db.query(`select to_regclass('${identifier}') is not null as ok`);
    return Boolean(rows[0]?.ok);
  } catch {
    return false;
  }
}

export async function functionExists(db: Db, signature: string): Promise<boolean> {
  try {
    const rows = await db.query(`select to_regprocedure('${signature}') is not null as ok`);
    return Boolean(rows[0]?.ok);
  } catch {
    return false;
  }
}

export async function hasRows(db: Db, relation: string): Promise<boolean> {
  try {
    const rows = await db.query(`select 1 from ${relation} limit 1`);
    return rows.length > 0;
  } catch {
    return false;
  }
}
