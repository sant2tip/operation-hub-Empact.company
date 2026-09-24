-- Company OS — Row Level Security
-- Rule: authenticated users can read everything within their own
-- organization; write access is role-gated where it matters (admin-only
-- for shifts, financial goals, and org membership changes).

create or replace function auth_organization_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select organization_id from profiles where id = auth.uid()
$$;

create or replace function auth_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  )
$$;

alter table organizations enable row level security;
alter table profiles enable row level security;
alter table organization_members enable row level security;
alter table shifts enable row level security;
alter table revenue enable row level security;
alter table expenses enable row level security;
alter table financial_goals enable row level security;
alter table posts enable row level security;
alter table comments enable row level security;
alter table reactions enable row level security;

-- organizations: members can read their own organization row.
create policy "org_select_own" on organizations
  for select using (id = auth_organization_id());

-- profiles: members can read everyone in their organization; a user can
-- update their own row, admins can update anyone in the organization.
create policy "profiles_select_org" on profiles
  for select using (organization_id = auth_organization_id());

create policy "profiles_update_self_or_admin" on profiles
  for update using (
    id = auth.uid() or (organization_id = auth_organization_id() and auth_is_admin())
  );

-- organization_members: readable by org members, writable by admins only.
create policy "org_members_select" on organization_members
  for select using (organization_id = auth_organization_id());

create policy "org_members_admin_write" on organization_members
  for all using (organization_id = auth_organization_id() and auth_is_admin())
  with check (organization_id = auth_organization_id() and auth_is_admin());

-- shifts: everyone in the org can read; only admins create/edit/delete.
create policy "shifts_select_org" on shifts
  for select using (organization_id = auth_organization_id());

create policy "shifts_admin_write" on shifts
  for all using (organization_id = auth_organization_id() and auth_is_admin())
  with check (organization_id = auth_organization_id() and auth_is_admin());

-- revenue / expenses: everyone in the org can read; any org member can
-- create entries (created_by = self), only admins can edit/delete.
create policy "revenue_select_org" on revenue
  for select using (organization_id = auth_organization_id());

create policy "revenue_insert_self" on revenue
  for insert with check (organization_id = auth_organization_id() and created_by = auth.uid());

create policy "revenue_admin_modify" on revenue
  for update using (organization_id = auth_organization_id() and auth_is_admin());

create policy "revenue_admin_delete" on revenue
  for delete using (organization_id = auth_organization_id() and auth_is_admin());

create policy "expenses_select_org" on expenses
  for select using (organization_id = auth_organization_id());

create policy "expenses_insert_self" on expenses
  for insert with check (organization_id = auth_organization_id() and created_by = auth.uid());

create policy "expenses_admin_modify" on expenses
  for update using (organization_id = auth_organization_id() and auth_is_admin());

create policy "expenses_admin_delete" on expenses
  for delete using (organization_id = auth_organization_id() and auth_is_admin());

-- financial_goals: readable by org, writable by admins only.
create policy "goals_select_org" on financial_goals
  for select using (organization_id = auth_organization_id());

create policy "goals_admin_write" on financial_goals
  for all using (organization_id = auth_organization_id() and auth_is_admin())
  with check (organization_id = auth_organization_id() and auth_is_admin());

-- feed: everyone in the org can read and post; authors can edit/delete
-- their own posts/comments/reactions, admins can moderate.
create policy "posts_select_org" on posts
  for select using (organization_id = auth_organization_id());

create policy "posts_insert_self" on posts
  for insert with check (organization_id = auth_organization_id() and author_id = auth.uid());

create policy "posts_modify_self_or_admin" on posts
  for update using (author_id = auth.uid() or (organization_id = auth_organization_id() and auth_is_admin()));

create policy "posts_delete_self_or_admin" on posts
  for delete using (author_id = auth.uid() or (organization_id = auth_organization_id() and auth_is_admin()));

create policy "comments_select_org" on comments
  for select using (post_id in (select id from posts where organization_id = auth_organization_id()));

create policy "comments_insert_self" on comments
  for insert with check (
    author_id = auth.uid()
    and post_id in (select id from posts where organization_id = auth_organization_id())
  );

create policy "comments_delete_self_or_admin" on comments
  for delete using (author_id = auth.uid() or auth_is_admin());

create policy "reactions_select_org" on reactions
  for select using (post_id in (select id from posts where organization_id = auth_organization_id()));

create policy "reactions_insert_self" on reactions
  for insert with check (
    user_id = auth.uid()
    and post_id in (select id from posts where organization_id = auth_organization_id())
  );

create policy "reactions_delete_self" on reactions
  for delete using (user_id = auth.uid());
