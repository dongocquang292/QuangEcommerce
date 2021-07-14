const db = require("../models/index");
const Category = db.category;
const { Op } = require("sequelize");

const createCategory = async (req, res) => {
    try {
        const categoryName = req.body.categoryName;
        const findCategory = await Category.findOne({ where: { categoryName: categoryName } });
        if (!findCategory) {
            const category = {
                categoryName: req.body.categoryName,
                location: req.body.location,
                status: req.body.status
            }
            const createCate = await Category.create(category);
            res.status(200).send(createCate)
        } else {
            res.status(400).send("Category already exist")
        }

    } catch (error) {
        return res.send(error)
    }

}

const getCategory = async (req, res) => {
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
        const search = req.body.search;
        const category = await Category.findAndCountAll({
            limit: size,
            offset: page * size,
            where: { categoryName: { [Op.like]: `%${search}%` } }, order: [
                ['categoryName', 'ASC'],
            ]
        });
        res.status(200).send({
            content: category.rows,
            totalPages: Math.ceil(category.count / size)
        })
    } catch (error) {
        res.status(400).send(error)
    }
}


const getCategoryId = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findOne({ where: { id: id } });
        res.status(200).send(category)
    } catch (error) {
        res.send(error);
    }
};

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = {
            categoryName: req.body.categoryName,
            location: req.body.location,
            status: req.body.status
        }
        await Category.update(category, { where: { id: id } });
        res.status(200).send("Update success");

    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        await Category.destroy({ where: { id: id } });
        res.status(200).send("Deleted")

    } catch (error) {
        res.status(400).send(error)
    }
}

const sortBanner = async (req, res) => {
    try {
        const data = await Category.findAll();
        const byLocation = (a, b) => a.location - b.location;
        data.sort(byLocation);
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

const getCategoryActive = async (req, res) => {
    try {
        const response = await Category.findAll({ where: { status: 1 } })

        res.status(200).json({
            status: "success",
            error_msg: "",
            data: {
                message: 'Category active',
                response
            }
        });
    } catch (error) {
        console.log(err);
        res.status(500).json({
            status: "error",
            error: err,
            data: {
                message: "Error"
            }
        });
    }
}
module.exports = {
    createCategory, getCategory, getCategoryId, updateCategory, deleteCategory, sortBanner, getCategoryActive,
}