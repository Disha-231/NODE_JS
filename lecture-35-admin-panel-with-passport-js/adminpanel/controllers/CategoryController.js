const CategoryModel = require('../models/CategoryModel');

const categoryPage = (req, res) => {
    return res.render('category/view_category')
}
const addCategory = (req, res) => {
    return res.render('category/add_category')
}
const insertCategory = async (req, res) => {
    try {
        const category = req.body.category;
        await CategoryModel.create({
            category: category
        })
        req.flash('success', "Category Successfully add");
        return res.redirect('/category/add');
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = {
    categoryPage, addCategory, insertCategory
}