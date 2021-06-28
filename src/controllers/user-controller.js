const db = require("../models/index");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
dotenv.config();

const registerUser = async (req, res) => {
    try {
        const email = req.body.email;
        const findUser = await User.findOne({ where: { email: email } });
        if (!findUser) {
            const user = {
                id: req.body.id,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                address: req.body.address,
                phonenumber: req.body.phonenumber,
            }
            const createUser = await User.create(user);
            res.send(createUser);

        } else {
            res.send("user da ton tai")
        }
    } catch (error) {
        res.status(400).send(error)
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getUserId = async (req, res) => {

    try {
        const id = req.params.id;
        const user = await User.findOne({ where: { id: id } });
        res.send(user)
    } catch (error) {
        res.send(error);
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phonenumber: req.body.phonenumber,
        }
        const update = await User.update(user, { where: { id: id } });
        res.send("update thanh cong");

    } catch (error) {
        res.send(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.destroy({ where: { id: id } });
        res.send("Da xoa")

    } catch (error) {
        res.send(error)
    }
}

const loginUser = async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).send({ message: "User khong ton tai" });
        }
        // const match =  bcrypt.compareSync(req.body.password, user.password);
        // console.log(match)
        // if (match) {
        //     const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 });
        //     res.status(200).send({
        //         accessToken: token
        //     });
        // } else {
        //     res.status(401).send({
        //         accessToken: null,
        //         message: "Invalid Password!"
        //     });
        // }
        const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 });
        res.status(200).send({
            accessToken: token
        });
    } catch (error) {
        res.send(error)
    }

}
module.exports = {
    registerUser, updateUser, deleteUser, getUserId, getUser, loginUser
}