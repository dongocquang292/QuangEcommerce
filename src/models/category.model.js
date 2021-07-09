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
            type: Sequelize.INTEGER,
            defaultValue: 1,
        }
    });
    return Category;
};