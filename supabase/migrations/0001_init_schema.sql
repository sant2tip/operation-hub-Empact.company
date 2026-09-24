-- Company OS — initial schema
-- Multi-organization-ready from the start: every business entity carries
-- organization_id so a single company is never hardcoded into the model.

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────
-- Organizations
-- ─────────────────────────────────────────────────────────────────────────
create table organizations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  created_at  timestamptz not null default now()
);

-- Profiles (one per auth user, scoped to one organization for the MVP)
create table profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid not null references organizations(id) on delete cascade,
  name            text not null,
  email           text not null,
  avatar_url      text,
  role            text not null default 'member' check (role in ('admin', 'member')),
  status          text not null default 'active' check (status in ('active', 'inactive')),
  created_at      timestamptz not null default now()
);

-- organization_members: join table, kept separate from profiles so a future
-- multi-org-per-user model doesn't require reshaping profiles.
create table organization_members (
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id         uuid not null references auth.users(id) on delete cascade,
  role            text not null default 'member' check (role in ('admin', 'member')),
  created_at      timestamptz not null default now(),
  primary key (organization_id, user_id)
);

-- ─────────────────────────────────────────────────────────────────────────
-- Schedules
-- ─────────────────────────────────────────────────────────────────────────
create table shifts (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  employee_id     uuid not null references profiles(id) on delete cascade,
  start           timestamptz not null,
  "end"           timestamptz not null,
  notes           text,
  status          text not null default 'scheduled'
                    check (status in ('scheduled', 'confirmed', 'open', 'completed')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint shift_end_after_start check ("end" > start)
);

create index shifts_org_start_idx on shifts (organization_id, start);

-- ─────────────────────────────────────────────────────────────────────────
-- Finance
-- ─────────────────────────────────────────────────────────────────────────
create table revenue (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  date            date not null,
  description     text not null,
  client          text,
  category        text not null default 'other',
  amount          numeric(12,2) not null check (amount >= 0),
  status          text not null default 'pending' check (status in ('paid', 'pending')),
  created_by      uuid not null references profiles(id),
  created_at      timestamptz not null default now()
);

create index revenue_org_date_idx on revenue (organization_id, date);

create table expenses (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  date            date not null,
  description     text not null,
  supplier        text,
  category        text not null default 'other',
  amount          numeric(12,2) not null check (amount >= 0),
  created_by      uuid not null references profiles(id),
  created_at      timestamptz not null default now()
);

create index expenses_org_date_idx on expenses (organization_id, date);

-- financial_goals: one target per organization per month. Never store
-- profit/margin/progress — those are always derived (see lib/calculations).
create table financial_goals (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  month           date not null, -- first day of the month, e.g. 2026-09-01
  target_amount   numeric(12,2) not null check (target_amount >= 0),
  created_at      timestamptz not null default now(),
  unique (organization_id, month)
);

-- ─────────────────────────────────────────────────────────────────────────
-- Social feed
-- ─────────────────────────────────────────────────────────────────────────
create table posts (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  author_id       uuid not null references profiles(id) on delete cascade,
  content         text not null,
  created_at      timestamptz not null default now()
);

create table comments (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid not null references posts(id) on delete cascade,
  author_id   uuid not null references profiles(id) on delete cascade,
  content     text not null,
  created_at  timestamptz not null default now()
);

create table reactions (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid not null references posts(id) on delete cascade,
  user_id     uuid not null references profiles(id) on delete cascade,
  type        text not null default 'like' check (type in ('like', 'celebrate', 'support')),
  created_at  timestamptz not null default now(),
  unique (post_id, user_id, type)
);
