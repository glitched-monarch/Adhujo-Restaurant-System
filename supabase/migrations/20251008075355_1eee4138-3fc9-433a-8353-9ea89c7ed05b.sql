-- Enable RLS on all existing tables
alter table public.users enable row level security;
alter table public.access_logs enable row level security;
alter table public.ingredients enable row level security;
alter table public.menu_ingredients enable row level security;
alter table public.menu_items enable row level security;
alter table public.reports_expenses enable row level security;
alter table public.sale_items enable row level security;
alter table public.sales enable row level security;

-- Create policies for users table
create policy "Users can view all users"
on public.users
for select
to public
using (true);

create policy "Only admins can insert users"
on public.users
for insert
to public
with check (
  exists (
    select 1 from public.user_roles
    where user_id = (select id from public.users where username = current_user)
    and role = 'admin'
  )
);

create policy "Only admins can delete users"
on public.users
for delete
to public
using (
  exists (
    select 1 from public.user_roles
    where user_id = (select id from public.users where username = current_user)
    and role = 'admin'
  )
);

-- Create policies for other tables (allow all authenticated operations for now)
create policy "Allow all operations on access_logs"
on public.access_logs
for all
to public
using (true)
with check (true);

create policy "Allow all operations on ingredients"
on public.ingredients
for all
to public
using (true)
with check (true);

create policy "Allow all operations on menu_ingredients"
on public.menu_ingredients
for all
to public
using (true)
with check (true);

create policy "Allow all operations on menu_items"
on public.menu_items
for all
to public
using (true)
with check (true);

create policy "Allow all operations on reports_expenses"
on public.reports_expenses
for all
to public
using (true)
with check (true);

create policy "Allow all operations on sale_items"
on public.sale_items
for all
to public
using (true)
with check (true);

create policy "Allow all operations on sales"
on public.sales
for all
to public
using (true)
with check (true);