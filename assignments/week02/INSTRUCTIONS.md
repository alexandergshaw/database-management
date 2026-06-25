# Week 2 — Data Modeling & ERDs

Now you'll model **relationships** between tables — the heart of database design.

## The concepts (in plain English)
- **One-to-many** — one row on the "one" side connects to many rows on the
  "many" side. Example: one planet has many moons. You model it by putting a
  **foreign key** on the *many* side (each moon stores which planet it belongs to).
- **Many-to-many** — both sides can connect to many of the other. Example: a
  mission can visit many planets, and a planet can be visited by many missions.
  You can't do that with a single foreign key, so you create a third table — a
  **junction table** — with one row per pairing.
- **Business rule** — a `CHECK` constraint that encodes a real-world rule.

## Worked example (a different topic — yours is moons and missions)
```sql
-- Example only — NOT the answer.
-- one-to-many: one owner has many pets
create table pets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references owners(id) on delete cascade,
  name text not null
);

-- many-to-many: pets play with many toys, toys are shared by many pets
create table pet_toys (
  pet_id uuid not null references pets(id) on delete cascade,
  toy_id uuid not null references toys(id) on delete cascade,
  primary key (pet_id, toy_id)   -- the pair is the key
);
```

## Your tasks (in `assignments/week02/starter.sql`)
1. Create `moons` with a foreign key to `planets`, and insert several moons.
2. Create `missions` (with a CHECK that launch year is sensible) and a
   `mission_targets` junction table, then link missions to the planets they
   visited (make at least one mission visit two or more planets).

## Watch & learn
- **Video:** [Create a many-to-many relationship (junction table)](https://www.youtube.com/watch?v=0pPzSUGGHO4)
- **Tutorial:** [Lucidchart — ER diagrams & relationships](https://www.lucidchart.com/pages/er-diagrams) · [W3Schools — foreign keys](https://www.w3schools.com/sql/sql_foreignkey.asp)

## Done when
- Cards show moon counts and mission chips; a Missions panel appears.
- The Week 2 planet is **Unlocked**.

## Made a mistake?
Fix it and run the file again — it clears its own tables first.
