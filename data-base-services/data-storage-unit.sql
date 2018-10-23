CREATE TABLE IF NOT EXISTS business(
    id serial PRIMARY KEY,
    business_name VARCHAR (100) UNIQUE,
    contact_name VARCHAR (100)NOT NULL,
    telephone_number VARCHAR(20) NOT NULL,
    contact_email VARCHAR(100) NOT NULL
); 
CREATE TABLE IF NOT EXISTS location(
    id serial PRIMARY KEY,
    address_line1 VARCHAR (250) NOT NULL,
    address_line2 VARCHAR (250) NOT NULL,
    suburb VARCHAR (250) NOT NULL,
    country VARCHAR (250) NOT NULL,
    region VARCHAR (250) NOT NULL,
    store VARCHAR (250) NOT NULL,
    business_id INT REFERENCES business(id)
); 
CREATE TABLE IF NOT EXISTS blocks(
    id serial PRIMARY KEY,
    name VARCHAR (100),
    location_id INT REFERENCES location(id)
); 
CREATE TABLE IF NOT EXISTS unit_types(
    id serial PRIMARY KEY,
    name VARCHAR (100) UNIQUE,
    length DECIMAL (100),
    width DECIMAL (100),
    height DECIMAL (100)
);
 CREATE TABLE IF NOT EXISTS units(
    id serial PRIMARY KEY,
    name VARCHAR (100) UNIQUE,
    blocks_id INT REFERENCES blocks(id),
    unit_types_id INT REFERENCES unit_types(id)
);


INSERT INTO business(business_name, contact_name, telephone_number, contact_email) VALUES ('Tutu.com', 'Temba', '0726263325', 'ssdressers@gmail.com');
INSERT INTO location(address_line1) VALUES ('258 Fourways');
INSERT INTO unit_types(name, width) VALUES ('Storage', '3');
INSERT INTO blocks(name) VALUES ('Super');
INSERT INTO units(name) VALUES ('Bloem');


SELECT * FROM blocks;
SELECT * FROM business 
INNER JOIN location 
ON business.id = location.business_id
INNER JOIN blocks 
ON location.id = blocks.location_id 
INNER JOIN units 
ON blocks.id = units.blocks_id 
INNER JOIN unit_types 
ON units.unit_types_id = unit_types.id;
SELECT * FROM business INNER JOIN location ON location.business_id = business.id WHERE location.address_line1 = '258 Fourways';
SELECT * FROM units INNER JOIN unit_types ON units.unit_types_id = unit_types.id WHERE unit_types.name = 'Storage';
SELECT * FROM units INNER JOIN unit_types ON units.unit_types_id = unit_types.id WHERE unit_types.width > '3';


-- INNER JOIN locations
-- ON businesses.id=locations.businesses_id
-- INNER JOIN blocks
-- ON locations.id=blocks.locations_id
-- INNER JOIN units
-- ON blocks.id=units.blocks_id
-- INNER JOIN units_types
-- ON units.units_type_id=units_types.id;