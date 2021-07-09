module.exports = (sequelize, Sequelize) => {
    const Voucher = sequelize.define("voucher", {
        code: {
            type: Sequelize.STRING
        },
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