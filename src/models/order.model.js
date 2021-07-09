module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        totalPrice: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        codeVoucher: {
            type: Sequelize.STRING,
            allowNull: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });
    return Order;
};