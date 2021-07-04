module.exports = (sequelize, Sequelize) => {
    const OrderDetail = sequelize.define("orderDetail", {

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
        price: {
            type: Sequelize.INTEGER
        },
        quantity: {
            type: Sequelize.INTEGER

        },


    });
    // OrderDetail.associate = function (models) {
    //     OrderDetail.belongsTo(models.Order, { foreignKey: 'orderId' });
    //     OrderDetail.belongsTo(models.Item, { foreignKey: 'itemId' });
    // };

    return OrderDetail;
};