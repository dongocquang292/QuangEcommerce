const jwt = require('jsonwebtoken');
const { user } = require('../models');
require('dotenv').config()

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["token"];
        if (!token) return res.send("Don't have token")

        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        return next();
    } catch (error) {
        res.send("Error verify")
    }
}

module.exports = { verifyToken }