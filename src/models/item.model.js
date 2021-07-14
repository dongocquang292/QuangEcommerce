module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        itemName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        barcode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        importPrice: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        weight: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        thumbnail: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        numberWare: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

    });
    return Item;
};