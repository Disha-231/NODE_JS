const mongoose = require('mongoose');

const con = mongoose.connect(
    `mongodb+srv://dishavaghasiya2311:dishavaghasiya2311@cluster0.ifmvo.mongodb.net/crud-mongodb`
    );

const db = mongoose.connection;

db.on('connected',(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`yeah....DB run successfully...!`);
    
})
module.exports = db
