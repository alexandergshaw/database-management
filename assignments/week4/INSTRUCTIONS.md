# Week 4 — Database Design Principles & Normalization (1NF, 2NF, 3NF)

Normalize three messy import tables — one per normal form — all created this
week, so you can drop and retry freely.

## Concepts
- **1NF** — every column holds a single atomic value (no comma-separated lists).
- **2NF** — no non-key column depends on only *part* of a composite key.
- **3NF** — no non-key column depends on another non-key column (transitive).

## Problems (in `assignments/week4/starter.sql`)
1. **1NF** — split a comma-separated `gases` column into one row per gas.
2. **2NF** — pull an instrument name that depends only on its code out of a
   `(probe_no, instrument_code)` table.
3. **3NF** — move a star's class (which repeats per star) into its own
   `nf_stars` table referenced by `nf_bodies`.

## Done when
- The Normalization panel shows the import normalized into stars.
- The Week 4 planet is **Unlocked**.

---

**Retry anytime:** re-run the script — it drops its own objects first.
