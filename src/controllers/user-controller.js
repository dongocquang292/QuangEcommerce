const db = require("../models/index");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const registerUser = async (req, res) => {
    try {
        const email = req.body.email;
        const findUser = await User.findOne({ where: { email: email } });
        if (!findUser) {
            const user = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                address: req.body.address,
                phonenumber: req.body.phonenumber,
            }
            user.password = await bcrypt.genSalt(10);
            const createUser = await User.create(user);
            res.status(200).send(createUser);
            const tokenEmail = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 });
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'hoahongden7749@gmail.com',
                    pass: 'maildetest'
                }
            });

            const mailOptions = {
                from: 'hoahongden7749@gmail.com',
                to: 'quangdn@vmodev.com',
                subject: 'Mail thong bao',
                text: `${tokenEmail}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.status(400).send("Can't send mail!")
                } else {
                    res.status(200).send('Email sent: ' + info.response);
                }
            });
        } else {
            res.send("User already exist!")
        }
    } catch (error) {
        res.status(400).send(error)
    }
};



const getUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getUserId = async (req, res) => {

    try {
        const id = req.params.id;
        const user = await User.findOne({ where: { id: id } });
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
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
        await User.update(user, { where: { id: id } });
        res.status(200).send("Update user success");

    } catch (error) {
        res.status(400).send(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.destroy({ where: { id: id } });
        res.status(200).send("Deleted!")

    } catch (error) {
        res.status(400).send(error)
    }
}

const loginUser = async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            res.status(400).send({ error: 'You need a email and password' });
            return;
        }
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).send({ message: "User not exist!" });
        } else {
            const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 });
            const validPassword = bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                res.status(200).send({
                    accessToken: token
                });
            } else {
                res.status(400).json({ error: "Invalid Password" });
            }
        }

    } catch (error) {
        res.status(400).send(error)
    }

}
const verifyTokenEmail = async (req, res) => {
    try {
        const token = req.params.token;
        const emailToken = req.body.token;
        if (!token) return res.send("Don't have token!")
        // const userToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (emailToken == token) {
            return res.status(200).send("Token verified")
        } else {
            res.send("Token wrong!")
        }
        return next();
    } catch (error) {
        res.status(400).send(error)
    }
}
module.exports = {
    registerUser, updateUser, deleteUser, getUserId, getUser, loginUser, verifyTokenEmail
}