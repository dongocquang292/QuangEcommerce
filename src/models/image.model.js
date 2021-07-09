module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("image", {
        img: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
    return Image;
};