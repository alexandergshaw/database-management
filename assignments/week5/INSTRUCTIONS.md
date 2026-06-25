# Week 5 — Keys, Constraints, Referential Integrity

Add the people who do the cataloguing — astronomers — with the keys and
constraints that keep data trustworthy.

## Concepts
- **Primary key** identifies each astronomer; **UNIQUE** stops duplicate emails;
  **NOT NULL** requires fields.
- A **foreign key** from sites to astronomers enforces referential integrity
  between two new tables.

## Problems (in `assignments/week5/starter.sql`)
1. Create the `astronomers` table (unique email).
2. Create `astronomer_sites` with a foreign key to astronomers.
3. Insert a few astronomers.
4. Insert a site for one of them.

## Done when
- The Week 5 planet is **Unlocked** (astronomers feed the stats bar from Week 9).

---

**Retry anytime:** re-run the script — it drops its own objects first.
