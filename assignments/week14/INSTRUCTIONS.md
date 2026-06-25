# Week 14 — Security, Access Control, Data Protection

Protect private data, and expose only what's safe.

## Concepts
- **Row-Level Security**: with RLS on and no policy for the public `anon` role,
  rows are hidden from the public API.
- A **view** can publish a safe subset of columns; `GRANT` controls who reads it.

## Your SQL task
Open and complete `assignments/week14/starter.sql`. It creates a private `customer_pii` table,
enables RLS with a `service_role`-only read policy, and publishes a
`public_catalog` view (safe product columns) granted to `anon`.

## Done when
- A Security posture panel appears on the homepage.
- The Week 14 planet is **Unlocked**.

---

**Retry anytime:** re-run the script — it drops its own objects first. Clear by
hand with `drop table if exists customer_pii cascade; drop view if exists public_catalog;`.
