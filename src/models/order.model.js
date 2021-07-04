module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        trackingNumber: {
            type: Sequelize.INTEGER,
            unique: true,
            field: 'tracking_number'
        },
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
    return Order;
};