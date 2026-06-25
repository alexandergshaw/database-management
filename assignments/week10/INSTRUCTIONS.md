# Week 10 — Joins & Multi-Table Queries

An observation stores IDs, not names. **Join** across tables to make it readable,
and use a **LEFT JOIN** to keep rows that have no match.

## Problems (in `assignments/week10/starter.sql`)
1. **Inner joins** — an `observation_log` view joining observations, astronomers,
   and planets.
2. **LEFT JOIN** — a `planet_observation_counts` view that includes planets with
   zero observations.

## Done when
- An observation log table appears on the homepage.
- The Week 10 planet is **Unlocked**.

---

**Retry anytime:** re-run the script (`create or replace view`).
