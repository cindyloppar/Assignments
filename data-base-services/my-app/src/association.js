var business = require('./business');

business.belongsToMany(user, { through: domainAdminUser })
user.belongsToMany(business, { through: domainAdminUser })