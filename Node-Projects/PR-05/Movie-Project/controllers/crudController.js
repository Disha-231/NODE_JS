const Usermodels = require('../models/Usermodels')
const viewPage = async(req,res)=>{
    try{
        const users = await Usermodels.find({})
        return res.render("table",{
            users
        })
     } catch(err){
            console.log(err);
            return false
                 }
}
 const addPage = (req,res)=>{
    return res.render("add")
 }
 const addRecord = async(req,res)=>{
    try{
        const {name,email,password} = req.body
        await Usermodels.create({name:name,email:email,password:password})
        console.log("record Add ..!");
        return res.redirect("/crud")
    }catch(err){
        console.log(err)
        return false

    }
 }
 module.exports = {
    viewPage,
    addPage,
    addRecord
}
