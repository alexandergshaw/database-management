# Week 2 — Data Modeling & ERDs

Model what orbits and what explores: moons (a one-to-many relationship) and
missions (a many-to-many relationship), with a business rule.

## Concepts
- **One-to-many** (a planet has many moons): a foreign key on the many side.
- **Many-to-many** (missions visit many planets, planets are visited by many
  missions): resolved with a junction table keyed on the pair of foreign keys.
- A **business rule** enforced by a `CHECK` constraint.

## Problems (in `assignments/week02/starter.sql`)
1. Create the `moons` table with a foreign key to `planets`.
2. Insert moons, each tied to a planet.
3. Create `missions` (with a `CHECK` on launch year) and the `mission_targets`
   junction table.
4. Insert missions and link them to the planets they visited.

## Done when
- Cards show moon counts and mission chips; a Missions panel appears.
- The Week 2 planet is **Unlocked**.

---

**Retry anytime:** re-run the script — it drops its own objects first.
