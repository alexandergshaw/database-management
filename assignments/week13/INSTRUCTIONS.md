# Week 13 — Transactions & Concurrency

Booking telescope time must be atomic — the booking and the decrement happen
together, or not at all — on a sandbox you create this week.

## Concepts
- A `plpgsql` function body runs as one transaction.
- `SELECT ... FOR UPDATE` locks the row so two bookings can't oversubscribe a
  telescope; `RAISE EXCEPTION` rolls everything back.

## Problems (in `assignments/week13/starter.sql`)
1. Create `telescopes` (with available nights) and seed a couple.
2. Create `telescope_bookings`.
3. Write `book_nights(code, nights)`: lock the telescope, guard availability,
   insert the booking, decrement nights — atomically.
4. Call the function once to prove it works.

## Done when
- The Week 13 planet is **Unlocked** (the `book_nights` function exists).

---

**Retry anytime:** re-run the script — it drops its own objects first.
