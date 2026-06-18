# Week 14 — Database Security, Access Control, Data Protection

Not all data should be public. Customer records must be protected; the product
catalog can be shared — but only safe columns. This week you lock things down.

## Concepts in play
- **Row-Level Security (RLS)**: with RLS enabled and no policy granting the
  public `anon` role access, rows are hidden from the public API.
- **Policies** grant specific roles specific access.
- A **view** can expose a safe subset of columns; `GRANT` controls who reads it.

## Your SQL task
Edit **`supabase/migrations/0014_week14_security.sql`**:
1. `enable row level security` on `customers`.
2. Add a `select` policy for the trusted `service_role`.
3. Create a `public_catalog` view exposing only `id, name, description, price`
   (no stock, no internal data) and `grant select` on it to `anon`.

## Done when
- `assignments/week14/test.ts` passes (RLS on, a policy exists, public_catalog
  exposes only safe columns).
- A **Security posture** panel appears on the homepage.
