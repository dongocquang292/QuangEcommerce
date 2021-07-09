// const { allow } = require("joi");

module.exports = (sequelize, Sequelize) => {
    const FlashSale = sequelize.define("flashSale", {
        flashSaleName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false
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
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    return FlashSale;
};