# Week 2 — Data Modeling: Entities, Attributes, Relationships

Who makes your products? Add a second entity and relate it to products.

## Concepts
- A new **entity** (suppliers) gets its own table.
- We relate products and suppliers with a **link (junction) table** instead of
  changing the products table — so this week only ever creates *new* tables.

## Your SQL task
Open and complete `assignments/week2/starter.sql`. It creates `suppliers` and a
`product_suppliers` link table (product_id + supplier_id), then seeds suppliers
and links each product to one.

## Done when
- Each product card shows its supplier.
- The Week 2 planet is **Unlocked**.

---

**Retry anytime:** re-run the script — it drops its own objects first. Clear one
object by hand with `drop table if exists <name> cascade;`.
