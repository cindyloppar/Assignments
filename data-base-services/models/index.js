

const express = require('express');
const bodyParser = require('body-parser')
const pg = require('pg');
const cors = require('cors');
const app = express();
const path = require('path');
const port = 3001;
const bcrypt = require('bcrypt');
const saltRounds = 10;




const connectionString = process.env.DATABASE_URL || 'postgres://cindy:loppar123@localhost:5432/storage_unit';
app.use(bodyParser.json())
app.use(cors());

const client = new pg.Client(connectionString);
client.connect();

app.get("/business", async (req, res) => {
  const findAllQuery = 'SELECT * FROM business';
  try {
    const { rows, rowCount } = await client.query(findAllQuery);
    return res.status(200).send({ rows, rowCount });
  } catch (error) {
    return res.status(400);
  }
})


app.get("/location", async (req, res) => {
  const findAllQuery = 'SELECT * FROM location';
  try {
    const { rows, rowCount } = await client.query(findAllQuery);
    return res.status(200).send({ rows, rowCount });
  } catch (error) {
    return res.status(400);
  }
})

app.get("/blocks", async (req, res) => {
  const findAllQuery = 'SELECT * FROM blocks';
  try {
    const { rows, rowCount } = await client.query(findAllQuery);
    return res.status(200).send({ rows, rowCount });
  } catch (error) {
    return res.status(400);
  }
})

app.get("/unittypes", async (req, res) => {
  const findAllQuery = 'SELECT * FROM unit_types';
  try {
    const { rows, rowCount } = await client.query(findAllQuery);
    return res.status(200).send({ rows, rowCount });
  } catch (error) {
    return res.status(400);
  }
})

app.post('/business', async (req, res) => {
  const text = `INSERT INTO
  business(business_name, contact_name, telephone_number, contact_email)
      VALUES($1, $2, $3, $4)
      returning *`;
  const values = [
    req.body.businessName,
    req.body.contactName,
    req.body.telephoneNumber,
    req.body.contactEmail,
  ];
  try {
    const { rows, rowCount } = await client.query(text, values);
    return res.status(201).send(rows[0]);
  } catch (error) {
    return res.status(400);
  }
}),


  app.post('/location', async (req, res) => {

    try {
      var businessId = await client.query("SELECT id FROM business WHERE business_name = $1", [req.body.selectBusiness]);

      const text = `INSERT INTO
          location(address_line1, address_line2, suburb, country ,region, store, business_id)
          VALUES($1, $2, $3, $4, $5, $6, $7)
          returning *`;
      const values = [
        req.body.address_line1,
        req.body.address_line2,
        req.body.suburb,
        req.body.city,
        businessId.rows[0].id,

      ];
      const { rows, rowCount } = await client.query(text, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400);
    }
  }),


  app.post('/blocks', async (req, res) => {

    try {
      var locationId = await client.query("SELECT id FROM location WHERE address_line1 = $1", [req.body.selectLocation]);

      const text = `INSERT INTO
      blocks(name,location_id)
      VALUES($1,$2)
      returning *`;
      const values = [
        req.body.name,
        locationId.rows[0].id
      ];
      const { rows, rowCount } = await client.query(text, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400);
    }
  }),

  app.post('/unittypes', async (req, res) => {
    const text = `INSERT INTO
      unit_types(name, length, width, height)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      req.body.name,
      req.body.length,
      req.body.width,
      req.body.height,
    ];
    try {
      const { rows, rowCount } = await client.query(text, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      console.log('error :', error);
      return res.status(400);
    }
  }),

  app.post('/units', async (req, res) => {
    try {
      var unitsId = await client.query("SELECT id FROM blocks WHERE name = $1", [req.body.selectBlock]);
      var unitTypesId = await client.query("SELECT id FROM unit_types WHERE name = $1", [req.body.selectUnitType]);

      const text = `INSERT INTO
     units(name, blocks_id, unit_types_id)
      VALUES($1,$2,$3)
      returning *`;
      const values = [
        req.body.name,
        unitsId.rows[0].id,
        unitTypesId.rows[0].id
      ];
      const { rows } = await client.query(text, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400);
    }
  }),



  app.post('/signup', async (req, res) => {
    var hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const text = `INSERT INTO
    sign_up(name, last_name, email, password)
    VALUES($1, $2, $3,$4)
    returning *`;
    const values = [
      req.body.name,
      req.body.last_name,
      req.body.email,
      hashedPassword
    ];
    try {
      const { rows, rowCount } = await client.query(text, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      console.log('error :', error);
      return res.status(400);
    }
  }),


  app.post('/login', async (req, res) => {
    try {
      // var unitsId = await client.query("SELECT id FROM blocks WHERE name = $1", [req.body.selectBlock]);
      
      const text = `SELECT * FROM sign_up WHERE email = $1`;
      const values = [
        req.body.email
        // req.body.password
      ];
      const { rows, rowCount } = await client.query(text, values);
      if (rowCount > 0 && req.body.password) {
        var passwordsMatch = await bcrypt.compare(req.body.password, rows[0].password);
      } else {
        return res.status(202).send('Please check your password and email').end();
      }

      if (!passwordsMatch) {
        return res.status(202).send('Please check your password and email ').end()
      } else {
        return res.status(201).end();
      }
      
    } catch (error) {
      console.log('error :', error);
      return res.status(400);
    }
  }),

  app.listen(port, () => console.log('server is running ' + port))


