const userRoute = require("express").Router();
const {handleGetUser, handleGetAllUsers} = require("../controls/function");
const {authFunction} = require("../middleware/authware");
userRoute.get("/get-login-user",authFunction, handleGetUser);
userRoute.get("/get-all-users",authFunction, handleGetAllUsers);
module.exports = userRoute;