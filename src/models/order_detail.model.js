module.exports = (sequelize, Sequelize) => {
    const OrderDetail = sequelize.define("orderDetail", {
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        itemName: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return OrderDetail;
};