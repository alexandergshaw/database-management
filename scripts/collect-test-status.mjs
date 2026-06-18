// Runs the test suite and writes .test-results.json (via the Vitest json
// reporter configured in vitest.config.ts). The homepage reads that file to
// decide which modules are unlocked.
//
// Crucially, this never fails the build: a student mid-semester has later weeks
// still failing, and those modules should simply stay locked rather than block
// the deploy.
import { spawnSync } from "node:child_process";

const result = spawnSync("npx", ["vitest", "run"], {
  stdio: "inherit",
  shell: true,
});

if (result.status !== 0) {
  console.log(
    "\n[collect-test-status] Some tests failed — those modules stay locked. Continuing build."
  );
}

process.exit(0);
