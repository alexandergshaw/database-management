# Week 3 — ERDs & Business Rules

A mission can visit many planets, and a planet is visited by many missions — a
**many-to-many** relationship, resolved with a junction table.

## Concepts
- Many-to-many → a junction table whose primary key is the pair of foreign keys.
- A **business rule** enforced by a `CHECK` constraint (launch year > 1950).

## Problems (in `assignments/week03/starter.sql`)
1. Create the `missions` table with a `CHECK` on launch year.
2. Create the `mission_targets` junction table.
3. Insert a few missions.
4. Link missions to the planets they visited (at least one mission visits two+).

## Done when
- Planet cards show mission chips, and a Missions panel appears.
- The Week 3 planet is **Unlocked**.

---

**Retry anytime:** re-run the script — it drops its own objects first.
