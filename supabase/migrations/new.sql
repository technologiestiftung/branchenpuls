DROP FUNCTION IF EXISTS businesses_at_location (float, float);

create
or replace function businesses_at_location (lat float, lon float) returns table (
    opendata_id text,
    created_on DATE,
    bezirk text,
    planungsraum text,
    prognoseraum text,
    business_age integer,
    business_type int,
    business_type_desc text,
    employees_range int,
    employees_desc text,
    branch_top_level_id int,
    branch_top_level_desc text,
    ihk_branch_id int,
    ihk_branch_desc text,
    nace_id int,
    nace_desc text
) language plpgsql as $$ begin return query
SELECT
    b.opendata_id,
    b.created_on,
    l.bezirk,
    l.planungsraum,
    l.prognoseraum,
    b.business_age,
    b.business_type,
    btl.description as business_type_desc,
    e.employees_range,
    el.description as employees_desc,
    brn.branch_top_level_id,
    brn.branch_top_level_desc,
    brn.ihk_branch_id,
    brn.ihk_branch_desc,
    brn.nace_id,
    brn.nace_desc
FROM
    location l,
    business b,
    lookup_business btl,
    lookup_employees el,
    employees e,
    branch br,
    branch_names brn
WHERE
    l.latitude = $1
    AND l.longitude = $2
    AND l.opendata_id = b.opendata_id
    AND b.business_type = btl.id
    AND e.opendata_id = b.opendata_id
    AND e.employees_range = el.id
    AND br.opendata_id = b.opendata_id
    AND brn.ihk_branch_id = br.ihk_branch_id;

end;

$$;