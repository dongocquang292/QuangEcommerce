module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        phonenumber: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        }
    });
    // User.associate = function (models) {
    //     User.hasMany(models.Order);
    // };
    return User;
};