CREATE TABLE IF NOT EXISTS business(
    id serial PRIMARY KEY,
    business_name VARCHAR (100),
    contact_name VARCHAR (100),
    contact_number VARCHAR(100),
    contact_email VARCHAR(100)
); CREATE TABLE IF NOT EXISTS location(
    id serial PRIMARY KEY,
    address VARCHAR (100),
    business_id INT REFERENCES business(id)
); CREATE TABLE IF NOT EXISTS blocks(
    id serial PRIMARY KEY,
    block_name VARCHAR (100),
    location_id INT REFERENCES location(id)
); CREATE TABLE IF NOT EXISTS units(
    id serial PRIMARY KEY,
    unit_name VARCHAR (100),
    block_id INT REFERENCES blocks(id),
    unit_type_id INT REFERENCES unit_types(id)
); CREATE TABLE IF NOT EXISTS unit_types(
    id serial PRIMARY KEY,
    unit_name VARCHAR (100),
    unit_length VARCHAR (100),
    unit_width VARCHAR (100),
    unit_height VARCHAR (100)
);

INSERT INTO business(business_name, contact_name, contact_number, contact_email) VALUES ('Lauper', 'Cindy', '0735698213', 'prettydressers@gmail.com');
INSERT INTO location(address) VALUES ('125 Tshepo Section');
INSERT INTO unit_types(unit_name, unit_width) VALUES ('garage', '3 meters');
INSERT INTO blocks(block_name) VALUES ('serial');

SELECT * FROM business;
SELECT * FROM blocks;
SELECT * FROM location;
