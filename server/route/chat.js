const chatRout = require("express").Router();
const {authFunction} = require("../middleware/authware");
const {handleChat, handleAllChat, clrearUnredMessege} = require("../controls/function");
chatRout.post("/create-new-chat",authFunction, handleChat);
chatRout.get("/get-all-chats",authFunction, handleAllChat);
chatRout.post("/clear-unread-message", authFunction, clrearUnredMessege);
module.exports = chatRout;