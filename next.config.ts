import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pglite ships a WASM asset it loads from node_modules at runtime; keep it out
  // of the server bundle so its asset paths resolve correctly. Only used for the
  // local migration-preview fallback — production reads from Supabase.
  serverExternalPackages: ["@electric-sql/pglite", "pg"],
  // The homepage reads these at runtime (fs): test results drive unlocking, and
  // the migration files back the local-preview fallback. Make sure they're
  // bundled into the serverless functions on deploy.
  outputFileTracingIncludes: {
    "/": ["./.test-results.json", "./supabase/migrations/**"],
    "/week/[module]": ["./.test-results.json", "./assignments/**/INSTRUCTIONS.md"],
  },
};

export default nextConfig;
