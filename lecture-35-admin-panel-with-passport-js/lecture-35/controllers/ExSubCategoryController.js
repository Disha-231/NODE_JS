const exsubcategoryPage = (req, res) => {
    return res.render('exsubcategory/ex_view_exsubcategory')
}
const addExSubcategoryPage = (req,res) => {
    return res.render('exsubcategory/ex_add_exsubcategory')
}
module.exports = {
    exsubcategoryPage,addExSubcategoryPage
}