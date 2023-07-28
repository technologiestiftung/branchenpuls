CREATE OR REPLACE FUNCTION get_state_tablesss()
RETURNS TABLE(tablename NAME)  -- Use the correct data type: NAME
AS $$
BEGIN
    RETURN QUERY
    SELECT t.tablename
    FROM pg_catalog.pg_tables t
    WHERE t.schemaname = 'public'
      AND t.tablename LIKE 'state\_%'
    ORDER BY t.tablename;
END;
$$ LANGUAGE plpgsql;