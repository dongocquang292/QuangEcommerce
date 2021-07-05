module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {

        userId: {
            type: Sequelize.INTEGER,
            allowNull: true

        },
        itemId: {
            type: Sequelize.INTEGER,
            allowNull: true

        },
        orderDetailId: {
            type: Sequelize.INTEGER,
            allowNull: true

        },


    });
    return Order;
};