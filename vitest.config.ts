import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    include: ["lib/**/*.test.ts", "assignments/**/test.ts"],
    // Each suite spins up an in-process Postgres (pglite/WASM). Run files
    // sequentially so many WASM instances don't contend, and allow generous
    // time for the heavier full-chain builds.
    fileParallelism: false,
    hookTimeout: 60000,
    testTimeout: 60000,
    // Emit a machine-readable results file. The homepage reads this to decide
    // which modules are unlocked — a module unlocks only when its test passes.
    reporters: [
      "default",
      ["json", { outputFile: "./.test-results.json" }],
    ],
  },
});
