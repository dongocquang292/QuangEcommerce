module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        categoryName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        location: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING
        }
    });
    // Category.associate = (models) => {
    //     Category.hasMany(models.Item);

    // };
    return Category;
};