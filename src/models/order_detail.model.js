module.exports = (sequelize, Sequelize) => {
    const OrderDetail = sequelize.define("orderDetail", {
        // userId: {
        //     type: Sequelize.INTEGER,
        //     allowNull: true,
        //     field: 'userId',
        // },
        // orderId: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     field: 'orderId',
        // },
        // itemId: {
        //     type: Sequelize.INTEGER,
        //     allowNull: true,
        //     field: 'itemId',
        // },
        pricePay: {
            type: Sequelize.INTEGER
        },
        quantity: {
            type: Sequelize.INTEGER

        },


    });
    // OrderDetail.associate = function (models) {
    //     OrderDetail.belongsTo(models.Order);
    //     OrderDetail.belongsTo(models.Item);
    // };
    // OrderDetail.beforeBulkUpdate(orderDetail => {
    //     OrderDetail.attributes.updateTime = new Date();
    //     return OrderDetail;
    // });
    return OrderDetail;
};