const authRout = require("express").Router();
const {handleSignUp, handleLogIn} = require("../controls/function");
authRout.post("/signup", handleSignUp);
authRout.post("/login", handleLogIn);
module.exports = authRout;