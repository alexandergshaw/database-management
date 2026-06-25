import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pglite ships a WASM asset it loads from node_modules at runtime; keep it out
  // of the server bundle so its asset paths resolve correctly. Only used for the
  // local migration-preview fallback — production reads from Supabase.
  serverExternalPackages: ["@electric-sql/pglite", "pg"],
  // The local-preview fallback reads the reference solution.sql at runtime, and
  // the week detail page reads INSTRUCTIONS.md. Bundle them into the serverless
  // functions so they resolve on deploy.
  outputFileTracingIncludes: {
    "/": ["./assignments/**/solution.sql"],
    "/dashboard": ["./assignments/**/solution.sql"],
    "/week/[module]": ["./assignments/**/solution.sql", "./assignments/**/INSTRUCTIONS.md"],
  },
};

export default nextConfig;
