const checkRole = (req, res, next) => {

    try {
        const user = req.user;
        const role = user.role;
        if (role == 0) {
            return res.status(400).send("Not Admin")
        }
        return next()
    } catch (error) {
        res.status(400).send("Khong phai admin")
    }
}
module.exports = { checkRole }