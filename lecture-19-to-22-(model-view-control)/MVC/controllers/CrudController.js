
const CrudeModule = require('../modules/CrudModel')

const ViewUser = async (req, res) => {
    try {
        const users = await CrudeModule.find({})

        return res.render('view', {
            users

        });

    } catch (error) {
        console.log(error);
        return false;

    }

}

const AddUser = (req, res) => {
    return res.render('add');
}


const insertRecord = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        await CrudeModule.create({
            name: name,
            email: email,
            password: password

        })
        console.log("User Add");
        return res.redirect('/crud');

    } catch (error) {

        console.log(error);
        return false;

    }
}
const deleteRecord = async (req, res) => {
    try {
        const deid = req.query.deletId
        // console.log(deid);
        await CrudeModule.findByIdAndDelete(deid);
        // console.log("User Delete");
        return res.redirect('/crud');

    } catch (error) {
        console.log(error);
        return false;
    }
}

const editRecord = async (req, res) => {
    try {
        let id = req.query.updateId
        let user = await CrudeModule.findById(id)
        return res.render('edit', {
            user
        })
    } catch (err) {
        console.log(err)
        return false
    }
}
const updateRecord = async (req, res) => {
    try {
        const { name, email, password, editid } = req.body
        await CrudeModule.findByIdAndUpdate(editid, {
            name: name,
            email: email,
            password: password
        })
        console.log("User Update");
        return res.redirect('/crud')
    } catch (errr) {
        console.log(errr);
        return false;
    }
}



module.exports = {
    ViewUser,
    AddUser,
    insertRecord,
    deleteRecord,
    editRecord,
    updateRecord
}