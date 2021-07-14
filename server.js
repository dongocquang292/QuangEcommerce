const express = require("express");
const app = express();
const userRoute = require("./src/routes/user.route");
const categoryRoute = require('./src/routes/category.route');
const itemRoute = require("./src/routes/item.route");
const orderRoute = require("./src/routes/order.route");
const orderDetailRoute = require('./src/routes/order_detail.route');
const flashSaleRoute = require('./src/routes/flashSale.route');
const voucherRoute = require('./src/routes/voucher.route');
const imageRoute = require('./src/routes/image.route')
const swagger = require('swagger-ui-express')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");

db.sequelize.sync();

app.use('/swagger', swagger.serve, swagger.setup(require('./EcommerceAPI.postman_collection.json-Swagger20.json')))
app.use('/user', userRoute)
app.use('/category', categoryRoute);
app.use('/item', itemRoute);
app.use('/order', orderRoute);
app.use('/orderDetail', orderDetailRoute);
app.use('/flashSale', flashSaleRoute);
app.use('/voucher', voucherRoute);
app.use('/image', imageRoute);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;