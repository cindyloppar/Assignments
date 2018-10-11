const Sequelize = require('sequelize');
const DB_NAME = process.env.DATABASE_NAME
const DB_USER = process.env.DATABASE_USER
const DB_PASSWORD = process.env.DATABASE_PASSWORD
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'postgres'
});

var user = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    business_name: Sequelize.STRING,
    contact_name: Sequelize.STRING,
    telephone_number: Sequelize.STRING,
    contact_email: Sequelize.STRING,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
}, {
        underscored: true,
        timestamps: true,
        updatedAt: false,
        createdAt: "created_at"
    })

module.exports = user