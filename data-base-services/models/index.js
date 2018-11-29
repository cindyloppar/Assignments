

const express = require('express');
const bodyParser = require('body-parser')
const pg = require('pg');
const cors = require('cors');
const app = express();
const path = require('path');
const port = 3001;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const passportJWT = require("passport-jwt");
const jwt = require('jsonwebtoken');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const connectionString = process.env.DATABASE_URL || 'postgres://cindy:loppar123@localhost:5432/storage_unit';
app.use(bodyParser.json())
app.use(cors());

const client = new pg.Client(connectionString);
client.connect();


var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    const text = `SELECT * FROM users WHERE email = $1`;
    const values = [
      email
    ];
    client.query(text, values).then(async user => {
      if (user.rowCount <= 0) {
        return done(null, false, { message: 'Incorrect email or password.' });
      } else {
        var passwordsMatch = await bcrypt.compare(password, user.rows[0].password);
        if (passwordsMatch) {
          return done(null, user.rows[0], { message: 'Logged in successfully.' });
        } else {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
      }
    })
  }
));


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'KE_JWT_NTWE'
},
  function (jwtPayload, cb) {

    //find the user in db if needed
    const text = `SELECT * FROM users WHERE email = $1`;
    const values = [
      email
    ];
    // return UserModel.findOneById(jwtPayload.id)
    client.query(text, values).then(user => {
      return cb(null, user, jwtPayload.id);
    })
      .catch(err => {
        return cb(err);
      });
  }
));


router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* GET user profile. */
router.get('/login', function (req, res, next) {
  res.send(req.user.rows[0]);
});


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

app.get("/units", async (req, res) => {
  const findAllQuery = 'SELECT * FROM location';
  try {
    const { rows, rowCount } = await client.query(findAllQuery);
    return res.status(200).send({ rows, rowCount });
  } catch (error) {
    return res.status(400);
  }
})


// app.get("/locationuser", async (req, res) => {
//   const findAllQuery = 'SELECT * FROM location';
//   try {
//     const { rows, rowCount } = await client.query(findAllQuery);
//     return res.status(200).send({ rows, rowCount });
//   } catch (error) {
//     return res.status(400);
//   }
// })


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
          location(address_line1, address_line2, suburb, city, business_id)
          VALUES($1, $2, $3, $4, $5)
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
      console.log('error :', error);
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
    try {
      var userExists = await client.query(`SELECT * FROM users WHERE email = $1`, [req.body.email]);
      console.log('userExists');
      if (userExists.rowCount > 0) {
        return res.send('Email already exists').status(200).end();
      } else {
        var hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const text = `INSERT INTO
        users(name, last_name, email, password, role)
        VALUES($1, $2, $3, $4, $5)
        returning *`;
        const values = [
          req.body.name,
          req.body.last_name,
          req.body.email,
          hashedPassword,
          'Client'
        ];

        const { rows, rowCount } = await client.query(text, values);
        return res.status(201).send(rows[0]);
      }

    } catch (error) {
      console.log('error :', error);
      return res.status(400);
    }

  }),


  app.post('/login', (req, res) => {
    passport.authenticate('local', async function (err, user, info) {
      var passwordsMatch = null;
      if (err) {
        return res.status(401).end();
      }
      if (user) {
        req.login(user, { session: false }, (err) => {
          if (err) {
            res.send(err);
          }
        })

        const token = jwt.sign(user, 'your_jwt_secret');
        return res.status(200).json({ user, token }).end();
      } else {
        return res.status(401).json(info).end();
      }
    })(req, res);
  }),





  app.post('/signupbusinessowner', async (req, res) => {
    try {
      var businessExists = await client.query(`SELECT * FROM users WHERE email = $1`, [req.body.email]);
      console.log('businessExists');
      if (businessExists.rowCount > 0) {
        return res.send('Email already exists').status(200).end();
      } else {
        var hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const text = `INSERT INTO
        users(name, last_name, email, password, role)
        VALUES($1, $2, $3, $4, $5)
        returning *`;
        const values = [
          req.body.name,
          req.body.last_name,
          req.body.email,
          hashedPassword,
          'Business Owner'
        ];

        const { rows, rowCount } = await client.query(text, values);
        return res.status(201).send(rows[0]);
      }

    } catch (error) {
      console.log('error :', error);
      return res.status(400);
    }

  }),

  app.post('/logginbusinessowner', async (req, res) => {
    try {
      const text = `SELECT * FROM users WHERE email = $1`;
      const values = [
        req.body.email
      ];
      const { rows, rowCount } = await client.query(text, values);
      if (rowCount > 0 && req.body.password) {
        var passwordsMatch = await bcrypt.compare(req.body.password, rows[0].password);
      } else {
        return res.status(302).send('Please check your password and email').end();
      }

      if (!passwordsMatch) {
        return res.status(302).send('Please check your password and email ').end()
      } else {
        return res.status(201).end();
      }

    } catch (error) {
      console.log('error :', error);
      return res.status(400);
    }
  }),

  app.listen(port, () => console.log('server is running ' + port))


