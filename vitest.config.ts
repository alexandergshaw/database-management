import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    include: ["lib/**/*.test.ts"],
    // The sanity test seeds an in-process Postgres (pglite/WASM) from the
    // reference solutions, which takes a moment.
    hookTimeout: 60000,
    testTimeout: 60000,
  },
});
