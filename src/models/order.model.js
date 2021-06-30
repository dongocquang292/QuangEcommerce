module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        // userId: {
        //     type: Sequelize.INTEGER,
        //     allowNull: true,
        //     field: 'userId',
        // },
        // orderDetailId: {
        //     type: Sequelize.INTEGER,
        //     allowNull: true,
        //     field: 'orderDetailId',
        // }

    });
    // Order.associate = (models) => {
    //     Order.hasMany(models.OrderDetail);
    //     Order.belongsTo(models.User, { foreignKey: 'userId' });
    // };

    // Order.beforeBulkUpdate(order => {
    //     order.attributes.updateTime = new Date();
    //     return order;
    // });
    return Order;
};