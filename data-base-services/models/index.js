

const express = require('express');
const bodyParser = require('body-parser')
var textBody = require("body");
var http = require("http");
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

    const text = `SELECT * FROM users WHERE email = $1`;
    const values = [
      email
    ];
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

router.get('/login', function (req, res, next) {
  res.send(req.user.rows[0]);
});


function generateToken(user) {

  var newDetails = {
    email: user.email,
    role: user.role,
  }
  var token = jwt.sign(newDetails, "KEJWTNTWE", {
    expiresIn: 60 * 60 * 24
  });
  return token;
}


function middlewareTest(req, res, next) {
  jwt.verify(req.headers.authorization, "KEJWTNTWE", function (err, user) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Please register Log in using a valid email to submit posts'
      });
    }
    if (!user) {
      return res.status(401)
    }

  });
  next()
};


app.get("/business", middlewareTest, async (req, res) => {
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


app.get("/blocks", middlewareTest, async (req, res) => {
  const findAllQuery = 'SELECT * FROM blocks';
  try {
    const { rows, rowCount } = await client.query(findAllQuery);
    return res.status(200).send({ rows, rowCount });
  } catch (error) {
    return res.status(400);
  }
})

app.get("/unittypes", middlewareTest, async (req, res) => {
  const findAllQuery = 'SELECT * FROM unit_types';
  try {
    const { rows, rowCount } = await client.query(findAllQuery);
    return res.status(200).send({ rows, rowCount });
  } catch (error) {
    return res.status(400);
  }
})

app.get("/units", middlewareTest, async (req, res) => {
  const findAllQuery = 'SELECT * FROM location';
  try {
    const { rows, rowCount } = await client.query(findAllQuery);
    return res.status(200).send({ rows, rowCount });
  } catch (error) {
    return res.status(400);
  }
})

app.get("/userdetails", middlewareTest, async (req, res) => {
  const findAllQuery = 'SELECT * FROM customer_units';
  try {
    const { rows, rowCount } = await client.query(findAllQuery);
    return res.status(200).send({ rows, rowCount });
  } catch (error) {
    return res.status(400);
  }
})


app.post('/business', middlewareTest, async (req, res) => {
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


  app.post('/location', middlewareTest, async (req, res) => {

    try {
      var businessId = await client.query("SELECT id FROM business WHERE business_name = $1", [req.body.selectBusiness]);

      const text = `INSERT INTO
          location(province, address_line1, address_line2, suburb, city, business_id)
          VALUES($1, $2, $3, $4, $5, $6)
          returning *`;
      const values = [
        req.body.province,
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
  })

app.get('/location-unit-types/:province/:suburb', middlewareTest, async (req, res) => {
  var statement = "SELECT unit_types.name as unittypename, units.name as unitname, unit_types.id  FROM unit_types inner join units on unit_types.id = units.unit_types_id inner join blocks on units.blocks_id = blocks.id inner join location on blocks.location_id = location.id where location.province = $1 and location.suburb = $2";
  let searchResults = await client.query(statement, [req.params.province, req.params.suburb]);
  res.json(searchResults.rows).status(200).end();
})

app.get('/suburb-for-province/:province', middlewareTest, async (req, res) => {
  var statement = "SELECT suburb  FROM public.location where province= $1;"
  var selectedProvince = req.params.province;
  let searchResults = await client.query(statement, [selectedProvince]);
  res.json(searchResults.rows).status(200).end();
})

app.get('/locationuser', middlewareTest, async (req, res) => {
  var data = req.query
  try {

    const statement = `SELECT location.province, units.name as unitName, location.city, location.suburb, unit_types.name, business.business_name FROM business 
      INNER JOIN location on location.business_id = business.id
      INNER JOIN blocks on blocks.location_id = location.id
      INNER JOIN units on units.blocks_id = blocks.id
      INNER JOIN unit_types on units.unit_types_id = unit_types.id
      WHERE unit_types.name = $1 AND location.suburb =$2`;
    let searchResults = await client.query(statement, [data.name, data.suburb]);

    return res.json(searchResults.rows);

  } catch (error) {
    return res.status(500);
  }
})

app.post('/locationuser', middlewareTest, async (req, res) => {
  try {
    const queryForUserId = await client.query("SELECT id FROM users WHERE email = $1", [req.body.email]);
    const queryForUnitsId = await client.query("SELECT units.id FROM units INNER JOIN unit_types on units.unit_types_id= unit_types.id INNER JOIN blocks on units.blocks_id = blocks.id INNER JOIN location on blocks.location_id = location.id  WHERE  location.province = $1 AND location.suburb = $2 AND unit_types.id = $3 AND units.name = $4", [req.body.unitDetails.province,req.body.unitDetails.suburb,+req.body.unitDetails.name, req.body.unitDetails.unitName ]);
    const text = `INSERT INTO 
    customer_units(units_id, customer_id)
    VALUES($1,$2)
    returning*;`
    const values = [
      queryForUnitsId.rows[0].id,
      queryForUserId.rows[0].id
    ];
    const { rows, rowCount } = await client.query(text, values);
    return res.status(201).send(rows[0]);
  } catch (error) {
    return res.status(400);
  }

})

app.post('/blocks', middlewareTest, async (req, res) => {

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

  app.post('/unittypes', middlewareTest, async (req, res) => {
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
      return res.status(400);
    }
  }),

  app.post('/units', middlewareTest, async (req, res) => {
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

  app.post('/userdetails', middlewareTest, async (req, res) => {
    try {
      var unitsId = await client.query("SELECT id FROM units WHERE name = $1", [req.body.name]);
      var customerId = await client.query("SELECT id FROM users WHERE name = $1", [req.body.name]);

      const text = `INSERT INTO
     customer_units( customer_units_id, units_id)
      VALUES($1,$2)
      returning *`;
      const values = [
        unitsId.rows[0].id,
        customerId.rows[0].id
      ];
      const { rows } = await client.query(text, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400);
    }
  }),

  app.post('/signup', async (req, res) => {
    var userExists = await client.query(`SELECT * FROM users WHERE email = $1`, [req.body.email]);
    if (userExists.rowCount > 0) {
      return res.status(208).send('Email already exists').end();
    } else {
      var body = req.body;
      var hash = bcrypt.hashSync(body.password.trim(), saltRounds);
      const text = `INSERT INTO
      users(name, last_name, email, password, role)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
      const values = [
        req.body.name.trim(),
        req.body.last_name.trim(),
        req.body.email.trim(),
        hash,
        'Client'
      ];
      var insertUser = await client.query(text, values);
      if (!insertUser || insertUser.rowCount <= 0) {
        res.status(201).json({ message: "Sorry but there was a problem signing the user up." }).end();
      } else {
        var token = generateToken(insertUser.rows[0])
        res.status(201).json({ user: insertUser, token: token }).end();
      }
    }

  }),


  app.post('/login', (req, res) => {
    passport.authenticate('local', async function (err, user, info) {
      var passwordsMatch = null;
      if (err) {
        return res.status(203).end();
      }
      if (user) {
        req.login(user, { session: false }, (err) => {
          if (err) {
            res.send(err);
          }
        })
        var token = generateToken(user);
        return res.status(200).json({ user, token }).end();
      } else {

        return res.status(203).json(info).end();

      }
    })(req, res);
  }),


  app.post('/signupbusinessowner', async (req, res, next) => {
    var businessExists = await client.query(`SELECT * FROM users WHERE email = $1`, [req.body.email]);
    if (businessExists.rowCount > 0) {
      return res.status(208).send('Email already exists').end();
    } else {
      var body = req.body;
      var hash = bcrypt.hashSync(body.password.trim(), saltRounds);
      const text = `INSERT INTO
      users(name, last_name, email, password, role)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
      const values = [
        req.body.name.trim(),
        req.body.last_name.trim(),
        req.body.email.trim(),
        hash,
        'Business Owner'
      ];
      var insertUser = await client.query(text, values);
      if (!insertUser || insertUser.rowCount <= 0) {
        res.status(201).json({ message: "Sorry but the was a problem signing the user up." }).end();
      } else {
        var token = generateToken(insertUser.rows[0])
        res.status(201).json({ user: insertUser, token: token }).end();
      }
    }
  })


app.post('/logginbusinessowner', async (req, res) => {

  passport.authenticate('local', async function (err, user, info) {
    var passwordsMatch = null;
    if (err) {
      return res.status(203).end();
    }
    if (user) {
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
      })
      var token = generateToken(user);
      return res.status(200).json({ user, token }).end();
    } else {
      return res.status(203).json(info).end();
    }
  })(req, res);
}),



  app.listen(port, () => console.log('server is running ' + port))


