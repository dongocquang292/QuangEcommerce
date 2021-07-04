const { allow } = require("joi");

module.exports = (sequelize, Sequelize) => {
    const FlashSale = sequelize.define("flashSale", {
        flashSaleName: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.INTEGER
        },
        startTime: {
            type: Sequelize.DATE,
            allowNull: false
        },
        stopTime: {
            type: Sequelize.DATE,
            allowNull: false
        },
        discount: {
            type: Sequelize.INTEGER
        }
    });

    return FlashSale;
};