CREATE TABLE IF NOT EXISTS business(
    id serial PRIMARY KEY,
    business_name VARCHAR (100) UNIQUE,
    contact_name VARCHAR (100)NOT NULL,
    telephone_number VARCHAR(20) NOT NULL,
    contact_email VARCHAR(100) NOT NULL
); CREATE TABLE IF NOT EXISTS location(
    id serial PRIMARY KEY,
    address line 1 VARCHAR (250) NOT NULL,
    address line 2 VARCHAR (250) NOT NULL,
    street_name VARCHAR (250) NOT NULL,
    surbub VARCHAR (250) NOT NULL,
    business_id INT REFERENCES business(id)
); CREATE TABLE IF NOT EXISTS blocks(
    id serial PRIMARY KEY,
    name VARCHAR (100),
    location_id INT REFERENCES location(id)
); CREATE TABLE IF NOT EXISTS unit_types(
    id serial PRIMARY KEY,
    name VARCHAR (100) UNIQUE,
    length DECIMAL (100),
    width DECIMAL (100),
    height DECIMAL (100)
); CREATE TABLE IF NOT EXISTS units(
    id serial PRIMARY KEY,
    name VARCHAR (100) UNIQUE,
    block_id INT REFERENCES blocks(id),
    unit_type_id INT REFERENCES unit_types(id)
);


INSERT INTO business(business_name, contact_name, telephone_number, contact_email) VALUES ('Lauper', 'Cindy', '0735698213', 'prettydressers@gmail.com');
INSERT INTO location(address) VALUES ('125 Riversands');
INSERT INTO unit_types(name, width) VALUES ('garage', '3');
INSERT INTO blocks(name) VALUES ('serial');
INSERT INTO units(name) VALUES ('palaza');


SELECT * FROM blocks;
SELECT * FROM business INNER JOIN location ON business.id = location.business_id INNER JOIN block ON location.id = location_id INNER JOIN unit ON block.id = block_id WHERE business_name = 'garage';
SELECT * FROM business INNER JOIN location ON location.business_id = business.id WHERE location.address = '125 Riversands';
SELECT * FROM units INNER JOIN unit_types ON units.unit_type_id = unit_types.id WHERE unit_types.name = 'garage';
SELECT * FROM units INNER JOIN unit_types ON units.unit_type_id = unit_types.id WHERE unit_types.width > '3';


-- INNER JOIN locations
-- ON businesses.id=locations.businesses_id
-- INNER JOIN blocks
-- ON locations.id=blocks.locations_id
-- INNER JOIN units
-- ON blocks.id=units.blocks_id
-- INNER JOIN units_types
-- ON units.units_type_id=units_types.id;