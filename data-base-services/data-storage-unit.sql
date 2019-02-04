CREATE TABLE IF NOT EXISTS business(
    id serial PRIMARY KEY,
    business_name VARCHAR (100) NOT NULL UNIQUE,
    contact_name VARCHAR (100)NOT NULL,
    telephone_number VARCHAR(20) NOT NULL,
    contact_email VARCHAR(100) NOT NULL
); 
CREATE TABLE IF NOT EXISTS location(
    id serial PRIMARY KEY,
    province VARCHAR (250) NOT NULL,
    address_line1 VARCHAR (250) NOT NULL,
    address_line2 VARCHAR (250) NOT NULL,
    suburb VARCHAR (250) NOT NULL,
    city VARCHAR (250) NOT NULL,
    business_id INT REFERENCES business(id)
); 
CREATE TABLE IF NOT EXISTS blocks(
    id serial PRIMARY KEY,
    name VARCHAR (100),
    location_id INT REFERENCES location(id)
); 
CREATE TABLE IF NOT EXISTS unit_types(
    id serial PRIMARY KEY,
    name VARCHAR (100),
    length DECIMAL (100) UNIQUE,
    width DECIMAL (100) UNIQUE,
    height DECIMAL (100) UNIQUE
);
 CREATE TABLE IF NOT EXISTS units(
    id serial PRIMARY KEY,
    name VARCHAR (100) UNIQUE,
    blocks_id INT REFERENCES blocks(id),
    unit_types_id INT REFERENCES unit_types(id)
);
CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    last_name VARCHAR (100) NOT NULL ,
    email VARCHAR (100) NOT NULL UNIQUE,
    role VARCHAR (100) NOT NULL,
    password VARCHAR (100)NOT NULL 
);
CREATE TABLE IF NOT EXISTS customer_units(
    id serial PRIMARY KEY,
    customer_id INT REFERENCES users(id),
    units_id INT REFERENCES units(id) UNIQUE
);

INSERT INTO business(business_name, contact_name, telephone_number, contact_email) VALUES ('Tutu.com', 'Temba', '0726263325', 'ssdressers@gmail.com');
INSERT INTO location(address_line1) VALUES ('258 Fourways');
INSERT INTO unit_types(name, width) VALUES ('Storage', '3');
INSERT INTO blocks(name) VALUES ('Block P');
INSERT INTO units(name) VALUES ('unit 29');


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


SELECT location.province, unit_types.name, business.business_name FROM business 
INNER JOIN location on location.business_id = business.id
INNER JOIN blocks on blocks.location_id = location.id
INNER JOIN units on units.blocks_id = blocks.id
INNER JOIN unit_types on units.unit_types_id = unit_types.id
WHERE location.province = 'Gauteng' AND unit_types.name = 'Wearhouse' 
-- AND units.id not in (SELECT customer_units.units_id FROM units.id)
;
