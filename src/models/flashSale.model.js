module.exports = (sequelize, Sequelize) => {
    const FlashSale = sequelize.define("flashSale", {
        flashSaleName: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.INTEGER
        },
        time: {
            type: Sequelize.DATE
        },
        discount: {
            type: Sequelize.INTEGER
        },
    });

    return FlashSale;
};