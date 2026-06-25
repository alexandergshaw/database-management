# Week 2 — Data Modeling: Entities, Attributes, Relationships

What orbits your planets? Add a second entity — moons — and relate it to planets.

## Concepts
- A new **entity** (moons) gets its own table.
- A **one-to-many** relationship: one planet has many moons, modeled with a
  **foreign key** on moons. We never change the planets table.

## Problems (in `assignments/week2/starter.sql`)
1. Create the `moons` table with a foreign key to `planets`.
2. Insert several moons, each tied to a planet (Mercury and Venus have none).

## Done when
- Each planet card shows its moon count.
- The Week 2 planet is **Unlocked**.

---

**Retry anytime:** re-run the script — it drops its own objects first.
