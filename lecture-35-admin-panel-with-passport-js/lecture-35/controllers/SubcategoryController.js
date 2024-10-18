const subcategoryPage = (req, res) => {
    return res.render('subcategory/view_subcategory')
}
const addSubcategoryPage = (req,res) => {
    return res.render('subcategory/add_subcategory')
}
module.exports = {
    subcategoryPage,addSubcategoryPage
}