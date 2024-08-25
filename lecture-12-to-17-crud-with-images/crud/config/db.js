const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        const con = await mongoose.connect(
            `mongodb+srv://dishavaghasiya2311:dishavaghasiya2311@cluster0.ifmvo.mongodb.net/crud-mongodb`
        )
        console.log(`mongodb connect ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        return false
    }
}
module.exports = connectDB