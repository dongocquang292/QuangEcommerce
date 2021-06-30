module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        categoryName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING
        }
    });

    return Category;
};