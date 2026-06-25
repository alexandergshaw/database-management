# Week 14 — Security, Access Control, Data Protection

Protect private data (grant proposals), and expose only what's safe (a public
planet catalog).

## Concepts
- **Row-Level Security**: with RLS on and no policy for the public `anon` role,
  rows are hidden from the public API.
- A **view** can publish a safe subset of columns; `GRANT` controls who reads it.

## Problems (in `assignments/week14/starter.sql`)
1. Create a private `proposal_secrets` table and add a row.
2. Enable RLS with a `service_role`-only read policy.
3. Create a `public_catalog` view (safe planet columns) and grant it to `anon`.

## Done when
- A Security posture panel appears on the homepage.
- The Week 14 planet is **Unlocked**.

---

**Retry anytime:** re-run the script — it drops its own objects first.
