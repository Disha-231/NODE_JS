const mongoose = require('mongoose');
const connectDb = async()=>{
    const con = await mongoose.connect( `mongodb+srv://dishavaghasiya2311:dishavaghasiya2311@cluster0.ifmvo.mongodb.net/Crud-MVC`)
    console.log(con.connection.host);
}
module.exports = connectDb;



















