require('dotenv').config()

const  config = {
  "development":{
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "protocol": "postgres"
}
}

console.log('config', config);

module.exports = config