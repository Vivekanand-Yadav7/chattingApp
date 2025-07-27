const messageRoute = require("express").Router();
const {authFunction} = require("../middleware/authware");
const {handleMessage, handleAllMessage} = require("../controls/function");
messageRoute.post("/new-message", authFunction, handleMessage);
messageRoute.get("/get-all-message/:chatId", handleAllMessage);

module.exports = messageRoute;