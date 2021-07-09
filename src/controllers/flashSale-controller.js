const db = require("../models/index");
const FlashSale = db.flashSale;
const Item = db.item;
const User = db.user;
const cron = require('node-cron');
const nodemailer = require('nodemailer');

const createFlashSale = async (req, res) => {
    try {
        const flashSaleName = req.body.flashSaleName;
        const findFlashSale = await FlashSale.findOne({ where: { flashSaleName: flashSaleName } });
        if (!findFlashSale) {
            const fls = {
                flashSaleName: req.body.flashSaleName,
                amount: req.body.amount,
                startTime: req.body.startTime,
                stopTime: req.body.stopTime,
                discount: req.body.discount,
            }

            const createFS = await FlashSale.create(fls);


            // nhập id các items được flashSale
            const idItems = req.body.idItems;
            //const getTimeNow = timeNow.getFullYear() + '-' + (timeNow.getMonth() + 1) + '-' + timeNow.getDate() + ' ' + timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds();
            if (Date.parse(fls.startTime) <= Date.now() && Date.parse(fls.stopTime) >= Date.now()) {
                idItems.forEach(async (element) => {
                    const id = element;
                    const getItems = await Item.findOne({ attributes: ['price'] }, { where: { id: id } });
                    const priceDiscount = getItems.price - ((getItems.price * createFS.discount) / 100);
                    await Item.update({ price: priceDiscount }, { where: { id: id } })
                })
            } else {
                res.send('Khong trong tgian')
            }
            res.status(200).send(createFS)
        } else {
            res.send("flash sale already exist")
        }

    } catch (error) {

        return res.status(400).send(error)
    }

}

const getFlashSale = async (req, res) => {
    try {
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);

        let page = 0;
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber;
        }
        let size = 2;

        if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
            size = sizeAsNumber;
        }
        const flashSale = await FlashSale.findAndCountAll({
            limit: size,
            offset: page * size
        });
        res.status(200).send({
            content: flashSale.rows,
            totalPages: Math.ceil(flashSale.count / size)
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

const getFlashSaleId = async (req, res) => {
    try {
        const id = req.params.id;
        const flashSale = await FlashSale.findOne({ where: { id: id } });
        res.status(200).send(flashSale)
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateFlashSale = async (req, res) => {
    try {
        const id = req.params.id;
        const flashSale = {
            flashSaleName: req.body.flashSaleName,
            amount: req.body.amount,
            startTime: req.body.starttime,
            stopTime: req.body.stopTime,
            discount: req.body.discount,
        }
        const update = await FlashSale.update(flashSale, { where: { id: id } });
        res.status(200).send("update success");

    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteFlashSale = async (req, res) => {
    try {
        const id = req.params.id;
        await FlashSale.destroy({ where: { id: id } });
        res.status(200).send("Deleted")

    } catch (error) {
        res.status(400).send(error)
    }
}

const notification = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hoahongden7749@gmail.com',
                pass: 'maildetest'
            }
        });
        const getAllEmail = await User.findAll({ attributes: ['email'] });
        cron.schedule('1 * * * * * ', function () {
            getAllEmail.map(item => {
                const mailOptions = {
                    from: 'hoahongden7749@gmail.com',
                    to: "quangdn@vmodev.com",
                    subject: 'Mail thong bao',
                    text: `15p nua co flash sale`
                };
                console.log(mailOptions);
                transporter.sendMail(mailOptions, function (error, info) {

                    if (error) {
                        res.status(400).send("Can't send mail!")
                    } else {
                        res.status(200).send('Email sent: ' + info.response);
                    }
                });
            });

        });
    } catch (error) {

    }
}
module.exports = {
    createFlashSale, getFlashSale, getFlashSaleId, updateFlashSale, deleteFlashSale, notification
}