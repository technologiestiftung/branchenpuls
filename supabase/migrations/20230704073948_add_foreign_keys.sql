ALTER TABLE
    location
ADD
    CONSTRAINT fk_location_business FOREIGN KEY (opendata_id) REFERENCES business (opendata_id);

ALTER TABLE
    employees
ADD
    CONSTRAINT fk_employees_business FOREIGN KEY (opendata_id) REFERENCES business (opendata_id);

ALTER TABLE
    branch
ADD
    CONSTRAINT fk_branch_business FOREIGN KEY (opendata_id) REFERENCES business (opendata_id);