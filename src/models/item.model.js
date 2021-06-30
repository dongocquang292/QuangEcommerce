module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        itemname: {
            type: Sequelize.STRING
        },
        barcode: {
            type: Sequelize.STRING
        },
        importPrice: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.INTEGER
        },
        weight: {
            type: Sequelize.INTEGER
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