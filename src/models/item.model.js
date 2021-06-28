module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        itemname: {
            type: Sequelize.STRING
        },
        barcode: {
            type: Sequelize.STRING
        },
        importPrice: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.STRING
        },
        weight: {
            type: Sequelize.STRING
        },
        thumbnail: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        numberWare: {
            type: Sequelize.INTEGER
        }

    });

    return Item;
};