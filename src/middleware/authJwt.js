const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["token"];
        if (!token) return res.send("ko co token")

        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        return next();
    } catch (error) {
        res.send("Loi xac thuc")
    }
}

// const endcodedToke = async(email) => {
//     return jwt.sign({

//     });
// }
module.exports = { verifyToken: verifyToken }