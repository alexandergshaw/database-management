// Rebuild the database from the migration files — the easy way to recover when
// a database is in a bad state. Because the schema is fully derived from the
// migrations, replaying them always lands you back in a consistent state.
//
//   npm run db:reset             reset the local Supabase dev database
//   npm run db:reset -- --linked reset your live (linked) Supabase project
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const linked = args.includes("--linked");

console.log(
  `Resetting the ${linked ? "LINKED (live)" : "local"} Supabase database — replaying every migration...\n`
);

const result = spawnSync("npx", ["--yes", "supabase", "db", "reset", ...args], {
  stdio: "inherit",
  shell: true,
});

if (result.status !== 0) {
  console.error(
    "\nReset failed. Check the Supabase CLI can reach your database:\n" +
      "  - local DB: run `npx supabase start` first\n" +
      "  - your project: run `npx supabase login` and use `npm run db:reset -- --linked`"
  );
}

process.exit(result.status ?? 1);
