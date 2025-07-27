const mongoose = require("mongoose");
//mongoose.connect(process.env.MONGO_URI);
mongoose.connect('mongodb+srv://Vivekbro:54321@cluster0.8x42vxw.mongodb.net/chatApp');
const db = mongoose.connection;

db.on('connected', ()=>{
    console.log("database connected");
})

db.on('err', ()=>{
    console.log("error in connecting datbase");
})

module.exports = db;
