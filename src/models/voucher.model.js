module.exports = (sequelize, Sequelize) => {
    const Voucher = sequelize.define("voucher", {
        quantity: {
            type: Sequelize.INTEGER
        },
        discount: {
            type: Sequelize.INTEGER
        },
        startTime: {
            type: Sequelize.DATE
        },
        stopTime: {
            type: Sequelize.DATE
        },
    });

    return Voucher;
};