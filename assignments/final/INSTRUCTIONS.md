# Week 15 — Final Exam (Cumulative)

The capstone. These views draw on **every** part of the course — relationships,
normalization, CRUD, aggregation, joins, transactions, security, and analytics —
and the fully assembled catalog is your demo.

## Problems (in `assignments/final/starter.sql`)
1. **Relationships + joins + CRUD** — `final_planet_overview`: each planet with
   its moon, mission, and observation counts.
2. **Normalization** — `final_normalized_stars`: the 3NF star tables joined.
3. **Aggregation + joins** — `final_observations_by_type`: observations and
   average magnitude per planet type.
4. **Transactions** — `final_telescope_usage`: availability vs nights booked.
5. **Security + analytics** — `final_public_catalog_summary`: a summary from the
   safe `public_catalog` view.

## Done when
- The Final Exam planet is **Unlocked** (all five views exist).

## Presentation checklist
- Walk through the homepage and name the SQL behind each section.
- Explain one design decision from each block (a junction table, a normalization
  split, the transaction function, an RLS policy).

---

**Retry anytime:** re-run the script (`create or replace view`).
