# Week 11 — Transactions & Security

Two advanced topics in one week: make booking telescope time **atomic**, and
**protect** sensitive data while publishing a safe public view.

## Concepts
- A `plpgsql` function body runs as one **transaction**; `SELECT ... FOR UPDATE`
  locks a row (concurrency); `RAISE EXCEPTION` rolls everything back.
- **Row-Level Security** hides rows from the public `anon` role unless a policy
  grants access; a **view** can publish only safe columns.

## Problems (in `assignments/week11/starter.sql`)
1. Create `telescopes` (+ seed) and `telescope_bookings`.
2. Write the atomic `book_nights(code, nights)` function and call it once.
3. Create a private `proposal_secrets` table, enable RLS, and add a
   `service_role`-only policy.
4. Create the `public_catalog` view (safe planet columns) and grant it to `anon`.

## Done when
- A Security posture panel appears on the homepage.
- The Week 11 planet is **Unlocked** (the function and view both exist).

---

**Retry anytime:** re-run the script — it drops its own objects first.
