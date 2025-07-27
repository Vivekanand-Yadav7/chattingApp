const mongoose = require("mongoose");
const { type } = require("os");
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        Select: false,
        minlength: 8
    },
    profilPic:{
        type:String,
        required: false
    }
});

module.exports = mongoose.model("Users", userSchema);