alter table "public"."branch" enable row level security;
alter table "public"."branch_names" enable row level security;

alter table "public"."business" enable row level security;

alter table "public"."employees" enable row level security;

alter table "public"."location" enable row level security;

alter table "public"."lookup_business" enable row level security;
alter table "public"."lookup_employees" enable row level security;


alter table "public"."state_03_2023" enable row level security;

alter table "public"."state_04_2023" enable row level security;

alter table "public"."state_05_2023" enable row level security;
alter table "public"."state_06_2023" enable row level security;

create policy "Enable read access for all users"
on "public"."branch"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."branch_names"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."business"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."employees"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."location"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."lookup_business"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."lookup_employees"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."state_03_2023"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."state_04_2023"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."state_05_2023"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."state_06_2023"
as permissive
for select
to public
using (true);



