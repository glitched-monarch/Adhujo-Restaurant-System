-- Create an enum for roles
create type public.app_role as enum ('admin', 'manager', 'staff');

-- Create user_roles table
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id bigint references public.users(id) on delete cascade not null,
    role app_role not null,
    created_at timestamp with time zone default now(),
    unique (user_id, role)
);

-- Enable RLS
alter table public.user_roles enable row level security;

-- Create a security definer function to check roles
create or replace function public.has_role(_user_id bigint, _role app_role)
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

-- Create a function to get user role
create or replace function public.get_user_role(_user_id bigint)
returns app_role
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.user_roles
  where user_id = _user_id
  limit 1
$$;

-- RLS Policies for user_roles
create policy "Users can view all roles"
on public.user_roles
for select
to public
using (true);

create policy "Only admins can insert roles"
on public.user_roles
for insert
to public
with check (
  exists (
    select 1 from public.user_roles
    where user_id = (select id from public.users where username = current_user)
    and role = 'admin'
  )
);

-- Migrate existing user roles to new table
insert into public.user_roles (user_id, role)
select id, role::app_role
from public.users
on conflict (user_id, role) do nothing;

-- Remove role column from users table (keep for backward compatibility for now)
-- alter table public.users drop column role;