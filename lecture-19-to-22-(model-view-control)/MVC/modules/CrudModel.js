const mongoose = require("mongoose")

const crudeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    }
})
const user = mongoose.model("mvc-crud", crudeSchema);
module.exports = user