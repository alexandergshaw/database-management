-- Week 3 — Categories (many-to-many) + a business rule.

drop table if exists product_categories cascade;
drop table if exists categories cascade;

-- Problem 1 — create the categories table. Add a CHECK so a name is never blank:
--   id uuid pk default gen_random_uuid(),
--   name text not null unique check (length(trim(name)) > 0),
--   created_at timestamptz not null default now()
-- TODO:


-- Problem 2 — create the product_categories junction table:
--   product_id  uuid references products(id) on delete cascade
--   category_id uuid references categories(id) on delete cascade
--   primary key (product_id, category_id)
-- TODO:


-- Problem 3 — insert at least 4 categories.
-- TODO:


-- Problem 4 — link products to categories. At least one product should be in
-- TWO categories (that's what makes it many-to-many).
-- TODO:
