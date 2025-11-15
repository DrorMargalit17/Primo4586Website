-- Create enum for roles
create type public.app_role as enum ('admin', 'moderator', 'user');

-- Create user_roles table
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamp with time zone default now(),
  unique (user_id, role)
);

-- Enable RLS
alter table public.user_roles enable row level security;

-- Create security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Migrate existing admin users from profiles to user_roles
insert into public.user_roles (user_id, role)
select user_id, 'admin'::app_role
from public.profiles
where is_admin = true
on conflict (user_id, role) do nothing;

-- Create RLS policies for user_roles
create policy "Users can view their own roles"
on public.user_roles
for select
to authenticated
using (user_id = auth.uid());

create policy "Admins can view all roles"
on public.user_roles
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can manage roles"
on public.user_roles
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Update RLS policies on other tables to use has_role function
drop policy if exists "Only admins can create resources" on public.resources;
drop policy if exists "Only admins can update resources" on public.resources;
drop policy if exists "Only admins can delete resources" on public.resources;

create policy "Only admins can create resources"
on public.resources
for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Only admins can update resources"
on public.resources
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Only admins can delete resources"
on public.resources
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Update sponsors policies
drop policy if exists "Only admins can create sponsors" on public.sponsors;
drop policy if exists "Only admins can update sponsors" on public.sponsors;
drop policy if exists "Only admins can delete sponsors" on public.sponsors;

create policy "Only admins can create sponsors"
on public.sponsors
for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Only admins can update sponsors"
on public.sponsors
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Only admins can delete sponsors"
on public.sponsors
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Update events policies
drop policy if exists "Only admins can create events" on public.events;
drop policy if exists "Only admins can update events" on public.events;
drop policy if exists "Only admins can delete events" on public.events;

create policy "Only admins can create events"
on public.events
for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Only admins can update events"
on public.events
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Only admins can delete events"
on public.events
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Update community_activities policies
drop policy if exists "Only admins can create community activities" on public.community_activities;
drop policy if exists "Only admins can update community activities" on public.community_activities;
drop policy if exists "Only admins can delete community activities" on public.community_activities;

create policy "Only admins can create community activities"
on public.community_activities
for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Only admins can update community activities"
on public.community_activities
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Only admins can delete community activities"
on public.community_activities
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Update editable_content policies
drop policy if exists "Only admins can create content" on public.editable_content;
drop policy if exists "Only admins can update content" on public.editable_content;

create policy "Only admins can create content"
on public.editable_content
for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Only admins can update content"
on public.editable_content
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Update content_versions policies
drop policy if exists "Only admins can create versions" on public.content_versions;

create policy "Only admins can create versions"
on public.content_versions
for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

-- Update profiles policies to use has_role
drop policy if exists "Admins can update any profile" on public.profiles;
drop policy if exists "Admins can view user management data" on public.profiles;

create policy "Admins can update any profile"
on public.profiles
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can view user management data"
on public.profiles
for select
to authenticated
using ((auth.uid() IS NOT NULL) AND public.has_role(auth.uid(), 'admin'));

-- Update get_current_user_admin_status function to check user_roles
create or replace function public.get_current_user_admin_status()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_role(auth.uid(), 'admin');
$$;