const db = require("../models/index");
const Category = db.category;


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
        const category = await Category.findAll();
        res.status(200).send(category)
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
module.exports = {
    createCategory, getCategory, getCategoryId, updateCategory, deleteCategory, sortBanner
}