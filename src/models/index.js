const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.category = require('./category.model')(sequelize, Sequelize);
db.item = require('./item.model')(sequelize, Sequelize);
db.order = require('./order.model')(sequelize, Sequelize);
db.orderDetail = require('./order_detail.model')(sequelize, Sequelize);
db.flashSale = require('./flashSale.model')(sequelize, Sequelize);
module.exports = db;