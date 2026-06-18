// Start a single week over: restore that week's file(s) to the version on
// `main`, discarding your edits. Then re-run the tests (and `npm run db:reset`
// if you'd already pushed a bad migration).
//
//   npm run reset:week -- week4
//   npm run reset:week -- review1
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const arg = process.argv[2];
if (!arg) {
  console.error("Usage: npm run reset:week -- <folder>   e.g. week4 or review1");
  process.exit(1);
}

const folder = /^\d+$/.test(arg) ? `week${arg}` : arg;
const root = process.cwd();
const assignmentDir = path.join(root, "assignments", folder);

if (!existsSync(assignmentDir)) {
  console.error(`No assignment folder: assignments/${folder}`);
  process.exit(1);
}

// This week's migration is named ..._<folder>_..., e.g. 0004_week4_normalization.sql.
const migrationsDir = path.join(root, "supabase", "migrations");
const migration = existsSync(migrationsDir)
  ? readdirSync(migrationsDir).find((f) => f.includes(`_${folder}_`) && f.endsWith(".sql"))
  : undefined;

const paths = [];
if (migration) paths.push(`supabase/migrations/${migration}`);
for (const f of readdirSync(assignmentDir)) {
  if (f.endsWith(".sql")) paths.push(`assignments/${folder}/${f}`);
}

if (paths.length === 0) {
  console.error(`Nothing editable to reset for ${folder}.`);
  process.exit(1);
}

const restoreFrom = (ref) =>
  spawnSync("git", ["checkout", ref, "--", ...paths], { stdio: "inherit", shell: true }).status === 0;

if (!restoreFrom("main") && !restoreFrom("origin/main")) {
  console.error("Could not restore from `main` or `origin/main`. Run this inside the repo.");
  process.exit(1);
}

console.log(`\nRestored ${folder} to the version on main:`);
for (const p of paths) console.log("  " + p);
console.log(
  "\nNext: run `npm test`. If you'd already applied a bad migration to Supabase, run `npm run db:reset -- --linked`."
);
process.exit(0);
