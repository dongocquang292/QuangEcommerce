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

db.orderDetail = require('./order_detail.model')(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.category = require('./category.model')(sequelize, Sequelize);
db.item = require('./item.model')(sequelize, Sequelize);
db.order = require('./order.model')(sequelize, Sequelize);
db.flashSale = require('./flashSale.model')(sequelize, Sequelize);
db.voucher = require('./voucher.model')(sequelize, Sequelize);
db.image = require('./image.model')(sequelize, Sequelize);

db.item.hasMany(db.image, { foreignKey: 'itemId' });
db.image.belongsTo(db.item);

db.order.hasMany(db.orderDetail, { foreignKey: 'orderId' });
db.orderDetail.belongsTo(db.order);

db.order.hasOne(db.voucher, { foreignKey: 'orderId' });
db.voucher.belongsTo(db.order);

db.user.hasMany(db.order, { foreignKey: 'userId' });
db.order.belongsTo(db.user);

db.orderDetail.hasOne(db.item, { foreignKey: 'orderDetailId' });
db.item.belongsTo(db.orderDetail);

db.category.hasMany(db.item, { foreignKey: 'categoryId' });
db.item.belongsTo(db.category);

db.flashSale.hasMany(db.item, { foreignKey: 'flashSaleId' });
db.item.belongsTo(db.flashSale);

module.exports = db;