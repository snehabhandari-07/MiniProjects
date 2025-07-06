const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type: String,
        required: [true, "Please add username"]
    },
    email : {
        type: String,
        required: [true, "Please add email address"],
        unique: [true, "Email already registered"]
    }, 
    password : {
        type: String,
        required: [true, "Please add user password"]
    }
},{
    timestamps : true
})

module.exports = new mongoose.model("User", userSchema);