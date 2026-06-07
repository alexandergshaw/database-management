-- Enterprise Database Management Portal schema for Supabase
create extension if not exists "pgcrypto";

create table if not exists departments (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  cost_center text not null,
  created_at timestamptz not null default now()
);

create table if not exists employees (
  id uuid primary key default gen_random_uuid(),
  department_id uuid references departments(id) on delete set null,
  first_name text not null,
  last_name text not null,
  email text not null unique,
  title text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid references employees(id) on delete set null,
  budget numeric(12,2) not null default 0,
  status text not null default 'planned',
  created_at timestamptz not null default now()
);

create table if not exists project_assignments (
  project_id uuid not null references projects(id) on delete cascade,
  employee_id uuid not null references employees(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  primary key (project_id, employee_id)
);

alter table departments enable row level security;
alter table employees enable row level security;
alter table projects enable row level security;
alter table project_assignments enable row level security;

create policy "Allow authenticated read for departments"
  on departments for select
  to authenticated
  using (true);

create policy "Allow authenticated read for employees"
  on employees for select
  to authenticated
  using (true);

create policy "Allow authenticated read for projects"
  on projects for select
  to authenticated
  using (true);

create policy "Allow authenticated read for project assignments"
  on project_assignments for select
  to authenticated
  using (true);
