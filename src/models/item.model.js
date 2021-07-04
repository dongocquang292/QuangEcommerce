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
        },
        priceDiscount: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

    });
    // Item.associate = (models) => {
    //     Item.hasMany(models.OrderDetail);
    //     Item.belongsTo(models.Category, { foreignKey: 'categoryId' });
    // };
    return Item;
};