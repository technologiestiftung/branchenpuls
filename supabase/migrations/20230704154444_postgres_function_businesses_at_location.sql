create
or replace function businesses_at_location (lat float, lon float) returns table (
    opendata_id text,
    planungsraum text,
    business_age integer,
    business_type text,
    employees_range text,
    branch_top_level_description text,
    branch_description text,
    branch_nace text
) language plpgsql as $$ begin return query
SELECT
    b.opendata_id,
    l.planungsraum,
    b.business_age,
    btl.description as business_type,
    el.description as employees_range,
    brn.branch_top_level_desc as branch_top_level_description,
    brn.ihk_branch_desc as branch_description,
    brn.nace_desc as branch_nace
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