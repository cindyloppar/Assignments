

const express = require('express');
const bodyParser = require('body-parser')
const pg = require('pg');
const cors = require('cors');
const app = express();
const path = require('path')
const port = 3001;

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
    return res.status(400).send(error);
  }
})
 
  app.post('/business', async(req, res) => {
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
      const { rows } = await client.query(text, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }),


  app.post('/location', async(req, res) => {
    const text = `INSERT INTO
      location(address_line1, address_line2, suburb, country ,region, store)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      req.body.address_line1,
      req.body.address_line2,
      req.body.suburb,
      req.body.country,
      req.body.region,
      req.body.store,
    ];

    try {
      const { rows } = await client.query(text, values);
      console.log('rows :', rows);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }),


  // app.post('/blocks', async(req, res) => {
  //   const text = `INSERT INTO
  //     blocks(name)
  //     VALUES($1)
  //     returning *`;
  //   const values = [
  //     // uuidv4(),
  //     req.body.name,
  //   ];

  //   try {
  //     const { rows } = await client.query(text, values);
  //     console.log('rows :', rows);
  //     return res.status(201).send(rows[0]);
  //   } catch (error) {
  //     return res.status(400).send(error);
  //   }
  // }),

  // app.post('/unittypes', async(req, res) => {
  //   const text = `INSERT INTO
  //     unittypes(name, length, width, height)
  //     VALUES($1, $2, $3, $4)
  //     returning *`;
  //   const values = [
  //     // uuidv4(),
  //     req.body.name,
  //     req.body.length,
  //     req.body.width,
  //     req.body.height,
  //   ];

  //   try {
  //     const { rows } = await client.query(text, values);
  //     console.log('rows :', rows);
  //     return res.status(201).send(rows[0]);
  //   } catch (error) {
  //     return res.status(400).send(error);
  //   }
  // }),

  // app.post('/units', async(req, res) => {
  //   const text = `INSERT INTO
  //     unittypes(name)
  //     VALUES($1)
  //     returning *`;
  //   const values = [
  //     // uuidv4(),
  //     req.body.name,
  //   ];

  //   try {
  //     const { rows } = await client.query(text, values);
  //     console.log('rows :', rows);
  //     return res.status(201).send(rows[0]);
  //   } catch (error) {
  //     return res.status(400).send(error);
  //   }
  // }),

app.listen(port, () => console.log('server is running ' + port))


