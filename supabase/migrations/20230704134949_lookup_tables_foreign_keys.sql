ALTER TABLE
    employees
ALTER COLUMN
    employees_range TYPE integer USING employees_range :: integer;

ALTER TABLE
    employees
ADD
    CONSTRAINT fk_employees_lookup_employees FOREIGN KEY (employees_range) REFERENCES lookup_employees (id);

ALTER TABLE
    business
ADD
    CONSTRAINT fk_business_lookup_business FOREIGN KEY (business_type) REFERENCES lookup_business (id);