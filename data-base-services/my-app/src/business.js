const Sequelize = require('sequelize');
//move this to a function in it's own file
//move these to environment variable
const DB_NAME = process.env.DATABASE_NAME
const DB_USER = process.env.DATABASE_USER
const DB_PASSWORD = process.env.DATABASE_PASSWORD
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'postgres'
});


var business = sequelize.define('business', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  business_name: Sequelize.STRING,
  contact_name: Sequelize.STRING,
  telephone_number: Sequelize.STRING,
  contact_email: Sequelize.STRING,
  created_at: Sequelize.DATE
}, {
    underscored: true,
    timestamps: true,
    updatedAt: false,
    createdAt: "created_at"
  })

module.exports = business